/**
 * Tests for main SDK exports
 * Verifies that all exports are properly available from the main index
 */

import { describe, it, expect } from 'vitest';
import * as LockLLMSDK from '../src/index';

describe('SDK Exports', () => {
  describe('Main Client', () => {
    it('should export LockLLM client', () => {
      expect(LockLLMSDK.LockLLM).toBeDefined();
      expect(typeof LockLLMSDK.LockLLM).toBe('function');
    });
  });

  describe('Error Classes', () => {
    it('should export LockLLMError', () => {
      expect(LockLLMSDK.LockLLMError).toBeDefined();
      expect(typeof LockLLMSDK.LockLLMError).toBe('function');
    });

    it('should export AuthenticationError', () => {
      expect(LockLLMSDK.AuthenticationError).toBeDefined();
      expect(typeof LockLLMSDK.AuthenticationError).toBe('function');
    });

    it('should export RateLimitError', () => {
      expect(LockLLMSDK.RateLimitError).toBeDefined();
      expect(typeof LockLLMSDK.RateLimitError).toBe('function');
    });

    it('should export PromptInjectionError', () => {
      expect(LockLLMSDK.PromptInjectionError).toBeDefined();
      expect(typeof LockLLMSDK.PromptInjectionError).toBe('function');
    });

    it('should export UpstreamError', () => {
      expect(LockLLMSDK.UpstreamError).toBeDefined();
      expect(typeof LockLLMSDK.UpstreamError).toBe('function');
    });

    it('should export ConfigurationError', () => {
      expect(LockLLMSDK.ConfigurationError).toBeDefined();
      expect(typeof LockLLMSDK.ConfigurationError).toBe('function');
    });

    it('should export NetworkError', () => {
      expect(LockLLMSDK.NetworkError).toBeDefined();
      expect(typeof LockLLMSDK.NetworkError).toBe('function');
    });
  });

  describe('Utility Functions', () => {
    it('should export getProxyURL', () => {
      expect(LockLLMSDK.getProxyURL).toBeDefined();
      expect(typeof LockLLMSDK.getProxyURL).toBe('function');
    });

    it('should export getAllProxyURLs', () => {
      expect(LockLLMSDK.getAllProxyURLs).toBeDefined();
      expect(typeof LockLLMSDK.getAllProxyURLs).toBe('function');
    });
  });

  describe('Wrapper Functions', () => {
    it('should export createOpenAI', () => {
      expect(LockLLMSDK.createOpenAI).toBeDefined();
      expect(typeof LockLLMSDK.createOpenAI).toBe('function');
    });

    it('should export createAnthropic', () => {
      expect(LockLLMSDK.createAnthropic).toBeDefined();
      expect(typeof LockLLMSDK.createAnthropic).toBe('function');
    });

    it('should export createClient', () => {
      expect(LockLLMSDK.createClient).toBeDefined();
      expect(typeof LockLLMSDK.createClient).toBe('function');
    });

    it('should export createOpenAICompatible', () => {
      expect(LockLLMSDK.createOpenAICompatible).toBeDefined();
      expect(typeof LockLLMSDK.createOpenAICompatible).toBe('function');
    });

    const providerFunctions = [
      'createGroq',
      'createDeepSeek',
      'createPerplexity',
      'createMistral',
      'createOpenRouter',
      'createTogether',
      'createXAI',
      'createFireworks',
      'createAnyscale',
      'createHuggingFace',
      'createGemini',
      'createCohere',
      'createAzure',
      'createBedrock',
      'createVertexAI',
    ];

    providerFunctions.forEach((funcName) => {
      it(`should export ${funcName}`, () => {
        expect(LockLLMSDK[funcName]).toBeDefined();
        expect(typeof LockLLMSDK[funcName]).toBe('function');
      });
    });
  });

  describe('Integration Test - Using Exports', () => {
    it('should be able to create LockLLM client', () => {
      const client = new LockLLMSDK.LockLLM({
        apiKey: 'test_api_key',
      });

      expect(client).toBeDefined();
      expect(client.scan).toBeDefined();
    });

    it('should be able to use getProxyURL', () => {
      const url = LockLLMSDK.getProxyURL('openai');
      expect(url).toBe('https://api.lockllm.com/v1/proxy/openai');
    });

    it('should be able to use getAllProxyURLs', () => {
      const urls = LockLLMSDK.getAllProxyURLs();
      expect(urls).toBeDefined();
      expect(typeof urls).toBe('object');
      expect(urls.openai).toBeDefined();
    });

    it('should be able to throw custom errors', () => {
      const error = new LockLLMSDK.AuthenticationError(
        'Test error',
        401,
        'auth_error',
        'req_123'
      );

      expect(error).toBeInstanceOf(LockLLMSDK.AuthenticationError);
      expect(error).toBeInstanceOf(LockLLMSDK.LockLLMError);
      expect(error.message).toBe('Test error');
    });
  });

  describe('Complete Export List', () => {
    it('should have all expected exports', () => {
      const expectedExports = [
        // Client
        'LockLLM',
        // Errors
        'LockLLMError',
        'AuthenticationError',
        'RateLimitError',
        'PromptInjectionError',
        'UpstreamError',
        'ConfigurationError',
        'NetworkError',
        // Utils
        'getProxyURL',
        'getAllProxyURLs',
        // Wrappers
        'createOpenAI',
        'createAnthropic',
        'createClient',
        'createOpenAICompatible',
        'createGroq',
        'createDeepSeek',
        'createPerplexity',
        'createMistral',
        'createOpenRouter',
        'createTogether',
        'createXAI',
        'createFireworks',
        'createAnyscale',
        'createHuggingFace',
        'createGemini',
        'createCohere',
        'createAzure',
        'createBedrock',
        'createVertexAI',
      ];

      expectedExports.forEach((exportName) => {
        expect(LockLLMSDK[exportName]).toBeDefined();
      });
    });
  });
});
