/**
 * Additional tests for utils.ts edge cases to reach 100% coverage
 * Covers lines 293-294 (AbortError retry logic)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../src/utils';
import { RateLimitError } from '../src/errors';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('HttpClient - Edge Cases for Full Coverage', () => {
  let client;

  beforeEach(() => {
    client = new HttpClient(
      'https://api.lockllm.com',
      'test_api_key',
      30000,
      3
    );
    mockFetch.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('shouldRetry - AbortError and RateLimitError', () => {
    it('should retry on AbortError (lines 287-289)', async () => {
      // Create AbortError
      const abortError = new Error('Operation was aborted');
      abortError.name = 'AbortError';

      const successResponse = {
        ok: true,
        status: 200,
        headers: { get: () => 'req_12345' },
        json: async () => ({ result: 'success' }),
      };

      mockFetch
        .mockRejectedValueOnce(abortError)
        .mockResolvedValueOnce(successResponse);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Fast-forward time for retry
      await vi.advanceTimersByTimeAsync(1000);

      const result = await promise;

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ result: 'success' });
    });

    it('should retry on RateLimitError (lines 292-294)', async () => {
      const rateLimitError = new RateLimitError(
        'Rate limit exceeded',
        429,
        1000,
        'req_12345'
      );

      const successResponse = {
        ok: true,
        status: 200,
        headers: { get: () => 'req_12346' },
        json: async () => ({ result: 'success after rate limit' }),
      };

      // First call throws RateLimitError, second succeeds
      mockFetch
        .mockRejectedValueOnce(rateLimitError)
        .mockResolvedValueOnce(successResponse);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Fast-forward time for retry delay
      await vi.advanceTimersByTimeAsync(1000);

      const result = await promise;

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ result: 'success after rate limit' });
    });

    it('should not retry on other error types', async () => {
      const genericError = new Error('Generic error');
      genericError.name = 'GenericError';

      mockFetch.mockRejectedValueOnce(genericError);

      await expect(client.post('/v1/scan', { input: 'test' })).rejects.toThrow(
        'Generic error'
      );

      // Should only try once
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should exhaust retries on repeated AbortErrors', async () => {
      const abortError = new Error('Operation was aborted');
      abortError.name = 'AbortError';

      // Always return AbortError
      mockFetch.mockRejectedValue(abortError);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Catch to prevent unhandled rejection
      promise.catch(() => {});

      // Advance timers to trigger all retries
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Operation was aborted');

      // Initial + 3 retries = 4 calls
      expect(mockFetch).toHaveBeenCalledTimes(4);
    });

    it('should exhaust retries on repeated RateLimitErrors', async () => {
      const rateLimitError = new RateLimitError(
        'Rate limit exceeded',
        429,
        1000,
        'req_12345'
      );

      // Always return RateLimitError
      mockFetch.mockRejectedValue(rateLimitError);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Catch to prevent unhandled rejection
      promise.catch(() => {});

      // Advance timers to trigger all retries
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow(RateLimitError);

      // Initial + 3 retries = 4 calls
      expect(mockFetch).toHaveBeenCalledTimes(4);
    });
  });

  describe('Mixed retry scenarios', () => {
    it('should retry on mixed retryable errors', async () => {
      const abortError = new Error('AbortError');
      abortError.name = 'AbortError';

      const rateLimitError = new RateLimitError(
        'Rate limit',
        429,
        500,
        'req_123'
      );

      const successResponse = {
        ok: true,
        status: 200,
        headers: { get: () => 'req_success' },
        json: async () => ({ success: true }),
      };

      mockFetch
        .mockRejectedValueOnce(abortError)
        .mockRejectedValueOnce(rateLimitError)
        .mockResolvedValueOnce(successResponse);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Advance timers for retries
      await vi.runAllTimersAsync();

      const result = await promise;

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(result.data).toEqual({ success: true });
    });
  });

  describe('Rate limit error without retry-after header', () => {
    it('should throw RateLimitError after retries when no retry-after (line 197)', async () => {
      const rateLimitResponse = {
        ok: false,
        status: 429,
        headers: {
          get: (name) => {
            // No retry-after header, so should throw immediately
            if (name === 'x-request-id') return 'req_12345';
            return null;
          },
        },
        json: async () => ({
          error: {
            message: 'Custom rate limit message',
            type: 'rate_limit_error',
          },
        }),
      };

      mockFetch.mockResolvedValue(rateLimitResponse);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Catch to prevent unhandled rejection
      promise.catch(() => {});

      // Advance all timers
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Custom rate limit message');
    });

    it('should use default message when error.message is missing (line 197)', async () => {
      const rateLimitResponse = {
        ok: false,
        status: 429,
        headers: {
          get: (name) => {
            if (name === 'x-request-id') return 'req_12345';
            return null;
          },
        },
        // Return error without message field
        json: async () => ({
          error: {
            type: 'rate_limit_error',
            // No message field
          },
        }),
      };

      mockFetch.mockResolvedValue(rateLimitResponse);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Catch to prevent unhandled rejection
      promise.catch(() => {});

      // Advance all timers
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Rate limit exceeded');
    });

    it('should use default message when errorData has no error field', async () => {
      const rateLimitResponse = {
        ok: false,
        status: 429,
        headers: {
          get: (name) => {
            if (name === 'x-request-id') return 'req_12345';
            return null;
          },
        },
        // Return empty object
        json: async () => ({}),
      };

      mockFetch.mockResolvedValue(rateLimitResponse);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Catch to prevent unhandled rejection
      promise.catch(() => {});

      // Advance all timers
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Rate limit exceeded');
    });
  });

  describe('Network error with no message', () => {
    it('should throw NetworkError with default message (line 231)', async () => {
      // Create error with no message
      const noMessageError = new Error();
      noMessageError.message = '';

      mockFetch.mockRejectedValue(noMessageError);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Catch to prevent unhandled rejection
      promise.catch(() => {});

      // Advance all timers
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Network request failed');
    });

    it('should throw NetworkError with fallback message when lastError is undefined', async () => {
      // This is an edge case where lastError might not have a message
      const emptyError = {};

      mockFetch.mockRejectedValue(emptyError);

      const promise = client.post('/v1/scan', { input: 'test' });

      // Catch to prevent unhandled rejection
      promise.catch(() => {});

      // Advance all timers
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Network request failed');
    });
  });
});
