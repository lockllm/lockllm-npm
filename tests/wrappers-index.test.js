/**
 * Tests for wrappers/index.ts exports
 * Verifies that wrapper exports are properly available
 */

import { describe, it, expect } from 'vitest';
import * as Wrappers from '../src/wrappers/index';

describe('Wrappers Index Exports', () => {
  describe('Provider-Specific Wrappers', () => {
    it('should export createOpenAI', () => {
      expect(Wrappers.createOpenAI).toBeDefined();
      expect(typeof Wrappers.createOpenAI).toBe('function');
    });

    it('should export createAnthropic', () => {
      expect(Wrappers.createAnthropic).toBeDefined();
      expect(typeof Wrappers.createAnthropic).toBe('function');
    });
  });

  describe('Generic Wrapper Functions', () => {
    it('should export createClient', () => {
      expect(Wrappers.createClient).toBeDefined();
      expect(typeof Wrappers.createClient).toBe('function');
    });

    it('should export createOpenAICompatible', () => {
      expect(Wrappers.createOpenAICompatible).toBeDefined();
      expect(typeof Wrappers.createOpenAICompatible).toBe('function');
    });
  });

  describe('Provider Factory Functions', () => {
    const providerFactories = [
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

    providerFactories.forEach((factory) => {
      it(`should export ${factory}`, () => {
        expect(Wrappers[factory]).toBeDefined();
        expect(typeof Wrappers[factory]).toBe('function');
      });
    });
  });

  describe('All Exports List', () => {
    it('should have all expected wrapper exports', () => {
      const expectedExports = [
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
        expect(Wrappers[exportName]).toBeDefined();
      });

      // Check that we have the expected number of exports
      const actualExports = Object.keys(Wrappers).filter(
        (key) => typeof Wrappers[key] === 'function'
      );
      expect(actualExports.length).toBeGreaterThanOrEqual(expectedExports.length);
    });
  });

  describe('Wrapper Functionality via Index', () => {
    it('should create OpenAI client through index export', () => {
      const client = Wrappers.createOpenAI({
        apiKey: 'test_key',
      });

      expect(client).toBeDefined();
    });

    it('should create Anthropic client through index export', () => {
      const client = Wrappers.createAnthropic({
        apiKey: 'test_key',
      });

      expect(client).toBeDefined();
    });

    it('should create generic client through index export', () => {
      class TestClient {
        constructor(config) {
          this.config = config;
        }
      }

      const client = Wrappers.createClient('openai', TestClient, {
        apiKey: 'test_key',
      });

      expect(client).toBeInstanceOf(TestClient);
    });
  });
});
