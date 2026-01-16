/**
 * Tests for generic wrapper functions
 * These tests verify all provider factory functions and generic client creation
 */

import { describe, it, expect, vi } from 'vitest';
import {
  createClient,
  createOpenAICompatible,
  createGroq,
  createDeepSeek,
  createPerplexity,
  createMistral,
  createOpenRouter,
  createTogether,
  createXAI,
  createFireworks,
  createAnyscale,
  createHuggingFace,
  createGemini,
  createCohere,
  createAzure,
  createBedrock,
  createVertexAI,
} from '../src/wrappers/generic-wrapper';

// Mock OpenAI SDK
vi.mock('openai', () => {
  class MockOpenAI {
    constructor(config) {
      // Spread config properties directly onto the instance
      Object.assign(this, config);
      this.chat = { completions: {} };
    }
  }
  return { default: MockOpenAI, OpenAI: MockOpenAI };
});

// Mock Cohere SDK
vi.mock('cohere-ai', () => {
  class MockCohereClient {
    constructor(config) {
      Object.assign(this, config);
    }
  }
  return { CohereClient: MockCohereClient };
}, { virtual: true });

describe('Generic Wrapper', () => {
  describe('createClient', () => {
    it('should create client with custom constructor', () => {
      class CustomClient {
        constructor(config) {
          this.apiKey = config.apiKey;
          this.baseURL = config.baseURL;
          this.customOption = config.customOption;
        }
      }

      const client = createClient('openai', CustomClient, {
        apiKey: 'test_key',
        customOption: 'value',
      });

      expect(client).toBeInstanceOf(CustomClient);
      expect(client.apiKey).toBe('test_key');
      expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/openai');
      expect(client.customOption).toBe('value');
    });

    it('should use custom baseURL when provided', () => {
      class CustomClient {
        constructor(config) {
          this.baseURL = config.baseURL;
        }
      }

      const client = createClient('openai', CustomClient, {
        apiKey: 'test_key',
        baseURL: 'https://custom.example.com',
      });

      expect(client.baseURL).toBe('https://custom.example.com');
    });

    it('should pass through additional options', () => {
      class CustomClient {
        constructor(config) {
          this.timeout = config.timeout;
          this.maxRetries = config.maxRetries;
        }
      }

      const client = createClient('anthropic', CustomClient, {
        apiKey: 'test_key',
        timeout: 60000,
        maxRetries: 5,
      });

      expect(client.timeout).toBe(60000);
      expect(client.maxRetries).toBe(5);
    });
  });

  describe('createOpenAICompatible', () => {
    it('should create OpenAI-compatible client', () => {
      const client = createOpenAICompatible('groq', {
        apiKey: 'test_key',
      });

      expect(client).toBeDefined();
      expect(client.apiKey).toBe('test_key');
      expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/groq');
    });

    it('should handle custom baseURL', () => {
      const client = createOpenAICompatible('mistral', {
        apiKey: 'test_key',
        baseURL: 'https://custom.mistral.com',
      });

      expect(client.baseURL).toBe('https://custom.mistral.com');
    });

    it('should pass through options', () => {
      const client = createOpenAICompatible('deepseek', {
        apiKey: 'test_key',
        timeout: 30000,
      });

      expect(client.timeout).toBe(30000);
    });
  });

  describe('Provider Factory Functions', () => {
    describe('createGroq', () => {
      it('should create Groq client', () => {
        const client = createGroq({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.apiKey).toBe('test_key');
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/groq');
      });
    });

    describe('createDeepSeek', () => {
      it('should create DeepSeek client', () => {
        const client = createDeepSeek({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/deepseek');
      });
    });

    describe('createPerplexity', () => {
      it('should create Perplexity client', () => {
        const client = createPerplexity({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/perplexity');
      });
    });

    describe('createMistral', () => {
      it('should create Mistral client', () => {
        const client = createMistral({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/mistral');
      });
    });

    describe('createOpenRouter', () => {
      it('should create OpenRouter client', () => {
        const client = createOpenRouter({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/openrouter');
      });
    });

    describe('createTogether', () => {
      it('should create Together AI client', () => {
        const client = createTogether({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/together');
      });
    });

    describe('createXAI', () => {
      it('should create xAI (Grok) client', () => {
        const client = createXAI({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/xai');
      });
    });

    describe('createFireworks', () => {
      it('should create Fireworks AI client', () => {
        const client = createFireworks({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/fireworks');
      });
    });

    describe('createAnyscale', () => {
      it('should create Anyscale client', () => {
        const client = createAnyscale({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/anyscale');
      });
    });

    describe('createHuggingFace', () => {
      it('should create Hugging Face client', () => {
        const client = createHuggingFace({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/huggingface');
      });
    });

    describe('createGemini', () => {
      it('should create Gemini client', () => {
        const client = createGemini({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/gemini');
      });
    });

    describe('createCohere', () => {
      it('should create Cohere client', () => {
        const client = createCohere({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        // Cohere SDK stores config in _options
        expect(client._options).toBeDefined();
        expect(client._options.apiKey).toBe('test_key');
        expect(client._options.baseURL).toBe('https://api.lockllm.com/v1/proxy/cohere');
      });
    });

    describe('createAzure', () => {
      it('should create Azure OpenAI client', () => {
        const client = createAzure({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/azure');
      });
    });

    describe('createBedrock', () => {
      it('should create AWS Bedrock client', () => {
        const client = createBedrock({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/bedrock');
      });
    });

    describe('createVertexAI', () => {
      it('should create Google Vertex AI client', () => {
        const client = createVertexAI({ apiKey: 'test_key' });
        expect(client).toBeDefined();
        expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/vertex-ai');
      });
    });
  });

  describe('All Providers with Custom Options', () => {
    const providers = [
      { name: 'Groq', func: createGroq },
      { name: 'DeepSeek', func: createDeepSeek },
      { name: 'Perplexity', func: createPerplexity },
      { name: 'Mistral', func: createMistral },
      { name: 'OpenRouter', func: createOpenRouter },
      { name: 'Together', func: createTogether },
      { name: 'xAI', func: createXAI },
      { name: 'Fireworks', func: createFireworks },
      { name: 'Anyscale', func: createAnyscale },
      { name: 'HuggingFace', func: createHuggingFace },
      { name: 'Gemini', func: createGemini },
      { name: 'Azure', func: createAzure },
      { name: 'Bedrock', func: createBedrock },
      { name: 'VertexAI', func: createVertexAI },
    ];

    providers.forEach(({ name, func }) => {
      it(`should create ${name} client with custom options`, () => {
        const client = func({
          apiKey: 'test_key',
          timeout: 45000,
          maxRetries: 3,
        });

        expect(client).toBeDefined();
        expect(client.timeout).toBe(45000);
        expect(client.maxRetries).toBe(3);
      });

      it(`should create ${name} client with custom baseURL`, () => {
        const customURL = `https://custom.${name.toLowerCase()}.com`;
        const client = func({
          apiKey: 'test_key',
          baseURL: customURL,
        });

        expect(client).toBeDefined();
        expect(client.baseURL).toBe(customURL);
      });
    });
  });
});
