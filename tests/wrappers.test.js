/**
 * Tests for SDK wrappers (OpenAI and Anthropic)
 * Note: These tests verify that wrappers can be instantiated.
 * They do not test actual API calls since that requires valid API keys.
 */

import { describe, it, expect } from 'vitest';
import { createOpenAI } from '../src/wrappers/openai-wrapper';
import { createAnthropic } from '../src/wrappers/anthropic-wrapper';

describe('OpenAI Wrapper', () => {
  it('should create OpenAI client with LockLLM proxy', () => {
    const client = createOpenAI({
      apiKey: 'test_api_key',
    });

    expect(client).toBeDefined();
    expect(client.chat).toBeDefined();
  });

  it('should accept custom base URL', () => {
    const customURL = 'https://custom.lockllm.com/v1/proxy/openai';

    const client = createOpenAI({
      apiKey: 'test_api_key',
      baseURL: customURL,
    });

    expect(client).toBeDefined();
  });

  it('should pass through additional options', () => {
    const client = createOpenAI({
      apiKey: 'test_api_key',
      timeout: 30000,
      maxRetries: 5,
    });

    expect(client).toBeDefined();
  });
});

describe('Anthropic Wrapper', () => {
  it('should create Anthropic client with LockLLM proxy', () => {
    const client = createAnthropic({
      apiKey: 'test_api_key',
    });

    expect(client).toBeDefined();
    expect(client.messages).toBeDefined();
  });

  it('should accept custom base URL', () => {
    const customURL = 'https://custom.lockllm.com/v1/proxy/anthropic';

    const client = createAnthropic({
      apiKey: 'test_api_key',
      baseURL: customURL,
    });

    expect(client).toBeDefined();
  });

  it('should pass through additional options', () => {
    const client = createAnthropic({
      apiKey: 'test_api_key',
      timeout: 30000,
      maxRetries: 5,
    });

    expect(client).toBeDefined();
  });
});

describe('Wrapper Configuration', () => {
  it('should handle OpenAI wrapper', () => {
    const client = createOpenAI({ apiKey: 'test_api_key' });
    expect(client).toBeDefined();
  });

  it('should handle Anthropic wrapper', () => {
    const client = createAnthropic({ apiKey: 'test_api_key' });
    expect(client).toBeDefined();
  });
});
