/**
 * SDK Wrappers - Drop-in replacements for official SDKs
 *
 * @example
 * ```typescript
 * import { createOpenAI, createAnthropic, createGroq } from '@lockllm/sdk/wrappers';
 *
 * const openai = createOpenAI({
 *   apiKey: process.env.LOCKLLM_API_KEY
 * });
 *
 * const anthropic = createAnthropic({
 *   apiKey: process.env.LOCKLLM_API_KEY
 * });
 *
 * const groq = createGroq({
 *   apiKey: process.env.LOCKLLM_API_KEY
 * });
 * ```
 */

// Provider-specific wrappers
export { createOpenAI } from './openai-wrapper';
export type { CreateOpenAIConfig } from './openai-wrapper';

export { createAnthropic } from './anthropic-wrapper';
export type { CreateAnthropicConfig } from './anthropic-wrapper';

// Generic wrapper and utilities
export {
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
} from './generic-wrapper';
export type { GenericClientConfig } from './generic-wrapper';
