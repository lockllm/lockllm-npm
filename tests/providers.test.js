/**
 * Tests for provider types and constants
 */

import { describe, it, expect } from 'vitest';
import { PROVIDER_BASE_URLS } from '../src/types/providers';

describe('Provider Types', () => {
  describe('PROVIDER_BASE_URLS', () => {
    it('should be defined', () => {
      expect(PROVIDER_BASE_URLS).toBeDefined();
      expect(typeof PROVIDER_BASE_URLS).toBe('object');
    });

    it('should contain OpenAI provider', () => {
      expect(PROVIDER_BASE_URLS.openai).toBe('https://api.openai.com');
    });

    it('should contain Anthropic provider', () => {
      expect(PROVIDER_BASE_URLS.anthropic).toBe('https://api.anthropic.com');
    });

    it('should contain Gemini provider', () => {
      expect(PROVIDER_BASE_URLS.gemini).toBe('https://generativelanguage.googleapis.com');
    });

    it('should contain Cohere provider', () => {
      expect(PROVIDER_BASE_URLS.cohere).toBe('https://api.cohere.com');
    });

    it('should contain OpenRouter provider', () => {
      expect(PROVIDER_BASE_URLS.openrouter).toBe('https://openrouter.ai');
    });

    it('should contain Perplexity provider', () => {
      expect(PROVIDER_BASE_URLS.perplexity).toBe('https://api.perplexity.ai');
    });

    it('should contain Mistral provider', () => {
      expect(PROVIDER_BASE_URLS.mistral).toBe('https://api.mistral.ai');
    });

    it('should contain Groq provider', () => {
      expect(PROVIDER_BASE_URLS.groq).toBe('https://api.groq.com');
    });

    it('should contain DeepSeek provider', () => {
      expect(PROVIDER_BASE_URLS.deepseek).toBe('https://api.deepseek.com');
    });

    it('should contain Together provider', () => {
      expect(PROVIDER_BASE_URLS.together).toBe('https://api.together.xyz');
    });

    it('should contain xAI provider', () => {
      expect(PROVIDER_BASE_URLS.xai).toBe('https://api.x.ai');
    });

    it('should contain Fireworks provider', () => {
      expect(PROVIDER_BASE_URLS.fireworks).toBe('https://api.fireworks.ai');
    });

    it('should contain Anyscale provider', () => {
      expect(PROVIDER_BASE_URLS.anyscale).toBe('https://api.endpoints.anyscale.com');
    });

    it('should contain Hugging Face provider', () => {
      expect(PROVIDER_BASE_URLS.huggingface).toBe('https://router.huggingface.co');
    });

    it('should contain Azure provider', () => {
      expect(PROVIDER_BASE_URLS.azure).toBe('');
    });

    it('should contain Bedrock provider', () => {
      expect(PROVIDER_BASE_URLS.bedrock).toBe('');
    });

    it('should contain Vertex AI provider', () => {
      expect(PROVIDER_BASE_URLS['vertex-ai']).toBe('');
    });
  });

  describe('Provider List Completeness', () => {
    it('should have 17 providers defined', () => {
      const providerCount = Object.keys(PROVIDER_BASE_URLS).length;
      expect(providerCount).toBe(17);
    });

    it('should have all expected provider names', () => {
      const expectedProviders = [
        'openai',
        'anthropic',
        'gemini',
        'cohere',
        'openrouter',
        'perplexity',
        'mistral',
        'groq',
        'deepseek',
        'together',
        'xai',
        'fireworks',
        'anyscale',
        'huggingface',
        'azure',
        'bedrock',
        'vertex-ai',
      ];

      expectedProviders.forEach((provider) => {
        expect(PROVIDER_BASE_URLS).toHaveProperty(provider);
      });
    });

    it('should have valid URLs for non-custom-endpoint providers', () => {
      const customEndpointProviders = ['azure', 'bedrock', 'vertex-ai'];

      Object.entries(PROVIDER_BASE_URLS).forEach(([provider, url]) => {
        if (customEndpointProviders.includes(provider)) {
          expect(url).toBe('');
        } else {
          expect(url).toMatch(/^https:\/\//);
          expect(url.length).toBeGreaterThan(8);
        }
      });
    });
  });

  describe('Provider URL Format', () => {
    it('should have URLs without trailing slashes', () => {
      Object.entries(PROVIDER_BASE_URLS).forEach(([provider, url]) => {
        if (url !== '') {
          expect(url.endsWith('/')).toBe(false);
        }
      });
    });

    it('should have valid HTTPS URLs', () => {
      const urlsToCheck = Object.entries(PROVIDER_BASE_URLS)
        .filter(([_, url]) => url !== '')
        .map(([_, url]) => url);

      urlsToCheck.forEach((url) => {
        expect(() => new URL(url)).not.toThrow();
        expect(url.startsWith('https://')).toBe(true);
      });
    });
  });

  describe('Specific Provider Base URLs', () => {
    const providerTests = [
      { name: 'openai', expectedDomain: 'api.openai.com' },
      { name: 'anthropic', expectedDomain: 'api.anthropic.com' },
      { name: 'gemini', expectedDomain: 'generativelanguage.googleapis.com' },
      { name: 'cohere', expectedDomain: 'api.cohere.com' },
      { name: 'mistral', expectedDomain: 'api.mistral.ai' },
      { name: 'groq', expectedDomain: 'api.groq.com' },
      { name: 'deepseek', expectedDomain: 'api.deepseek.com' },
    ];

    providerTests.forEach(({ name, expectedDomain }) => {
      it(`should have correct domain for ${name}`, () => {
        const url = new URL(PROVIDER_BASE_URLS[name]);
        expect(url.hostname).toBe(expectedDomain);
      });
    });
  });

  describe('Custom Endpoint Providers', () => {
    it('should identify custom endpoint providers', () => {
      const customProviders = ['azure', 'bedrock', 'vertex-ai'];

      customProviders.forEach((provider) => {
        expect(PROVIDER_BASE_URLS[provider]).toBe('');
      });
    });

    it('should have empty strings for custom endpoint providers', () => {
      expect(PROVIDER_BASE_URLS.azure).toBe('');
      expect(PROVIDER_BASE_URLS.bedrock).toBe('');
      expect(PROVIDER_BASE_URLS['vertex-ai']).toBe('');
    });
  });
});
