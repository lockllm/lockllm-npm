/**
 * Tests for SDK constructor error paths
 * These tests directly test the exported constructor functions with mocked require
 */

import { describe, it, expect } from 'vitest';
import { getOpenAIConstructor } from '../src/wrappers/openai-wrapper';
import { getAnthropicConstructor } from '../src/wrappers/anthropic-wrapper';
import { getGenericOpenAIConstructor, getCohereConstructor } from '../src/wrappers/generic-wrapper';

describe('Wrapper Constructor Error Handling', () => {
  describe('getOpenAIConstructor', () => {
    it('should throw error when OpenAI SDK is not found', () => {
      const mockRequire = (moduleName) => {
        throw new Error(`Cannot find module '${moduleName}'`);
      };

      expect(() => {
        getOpenAIConstructor(mockRequire);
      }).toThrow('OpenAI SDK not found. Please install it with: npm install openai');
    });

    it('should return constructor when OpenAI SDK is found', () => {
      const mockOpenAI = class MockOpenAI {};
      const mockRequire = () => ({ default: mockOpenAI });

      const result = getOpenAIConstructor(mockRequire);
      expect(result).toBe(mockOpenAI);
    });

    it('should handle OpenAI export pattern', () => {
      const mockOpenAI = class MockOpenAI {};
      const mockRequire = () => ({ OpenAI: mockOpenAI });

      const result = getOpenAIConstructor(mockRequire);
      expect(result).toBe(mockOpenAI);
    });

    it('should handle direct module export', () => {
      const mockOpenAI = class MockOpenAI {};
      const mockRequire = () => mockOpenAI;

      const result = getOpenAIConstructor(mockRequire);
      expect(result).toBe(mockOpenAI);
    });
  });

  describe('getAnthropicConstructor', () => {
    it('should throw error when Anthropic SDK is not found', () => {
      const mockRequire = (moduleName) => {
        throw new Error(`Cannot find module '${moduleName}'`);
      };

      expect(() => {
        getAnthropicConstructor(mockRequire);
      }).toThrow('Anthropic SDK not found. Please install it with: npm install @anthropic-ai/sdk');
    });

    it('should return constructor when Anthropic SDK is found', () => {
      const mockAnthropic = class MockAnthropic {};
      const mockRequire = () => ({ default: mockAnthropic });

      const result = getAnthropicConstructor(mockRequire);
      expect(result).toBe(mockAnthropic);
    });

    it('should handle Anthropic export pattern', () => {
      const mockAnthropic = class MockAnthropic {};
      const mockRequire = () => ({ Anthropic: mockAnthropic });

      const result = getAnthropicConstructor(mockRequire);
      expect(result).toBe(mockAnthropic);
    });

    it('should handle direct module export', () => {
      const mockAnthropic = class MockAnthropic {};
      const mockRequire = () => mockAnthropic;

      const result = getAnthropicConstructor(mockRequire);
      expect(result).toBe(mockAnthropic);
    });
  });

  describe('getGenericOpenAIConstructor', () => {
    it('should throw error when OpenAI SDK is not found', () => {
      const mockRequire = (moduleName) => {
        throw new Error(`Cannot find module '${moduleName}'`);
      };

      expect(() => {
        getGenericOpenAIConstructor(mockRequire);
      }).toThrow('OpenAI SDK not found. Please install it with: npm install openai');
    });

    it('should return constructor when OpenAI SDK is found', () => {
      const mockOpenAI = class MockOpenAI {};
      const mockRequire = () => ({ default: mockOpenAI });

      const result = getGenericOpenAIConstructor(mockRequire);
      expect(result).toBe(mockOpenAI);
    });
  });

  describe('getCohereConstructor', () => {
    it('should throw error when Cohere SDK is not found', () => {
      const mockRequire = (moduleName) => {
        throw new Error(`Cannot find module '${moduleName}'`);
      };

      expect(() => {
        getCohereConstructor(mockRequire);
      }).toThrow('Cohere SDK not found. Please install it with: npm install cohere-ai');
    });

    it('should return CohereClient when found', () => {
      const mockCohereClient = class MockCohereClient {};
      const mockRequire = () => ({ CohereClient: mockCohereClient });

      const result = getCohereConstructor(mockRequire);
      expect(result).toBe(mockCohereClient);
    });

    it('should handle direct module export', () => {
      const mockCohere = class MockCohere {};
      const mockRequire = () => mockCohere;

      const result = getCohereConstructor(mockRequire);
      expect(result).toBe(mockCohere);
    });
  });

  describe('Error message validation', () => {
    it('should have consistent error message format across all wrappers', () => {
      const mockRequire = () => { throw new Error('Module not found'); };

      const errors = [];

      try {
        getOpenAIConstructor(mockRequire);
      } catch (e) {
        errors.push(e.message);
      }

      try {
        getAnthropicConstructor(mockRequire);
      } catch (e) {
        errors.push(e.message);
      }

      try {
        getGenericOpenAIConstructor(mockRequire);
      } catch (e) {
        errors.push(e.message);
      }

      try {
        getCohereConstructor(mockRequire);
      } catch (e) {
        errors.push(e.message);
      }

      // All errors should follow the same pattern
      errors.forEach(error => {
        expect(error).toMatch(/SDK not found\. Please install it with: npm install/);
      });

      // Should have collected all 4 errors
      expect(errors.length).toBe(4);
    });
  });

  describe('Integration with createCohere', () => {
    it('should successfully create Cohere client when constructor is provided', async () => {
      // Import createClient
      const { createClient } = await import('../src/wrappers/generic-wrapper');

      // Create a mock Cohere constructor
      class MockCohereClient {
        constructor(config) {
          this.config = config;
          this.apiKey = config.apiKey;
          this.baseURL = config.baseURL;
        }
      }

      // Test that createClient works correctly (which is what createCohere uses)
      const client = createClient('cohere', MockCohereClient, {
        apiKey: 'test_key',
      });

      expect(client).toBeInstanceOf(MockCohereClient);
      expect(client.apiKey).toBe('test_key');
      expect(client.baseURL).toBe('https://api.lockllm.com/v1/proxy/cohere');
    });
  });
});
