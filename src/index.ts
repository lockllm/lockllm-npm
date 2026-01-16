/**
 * LockLLM JavaScript/TypeScript SDK
 *
 * Universal AI security SDK with prompt injection detection.
 * Completely free with unlimited usage. BYOK (Bring Your Own Key).
 *
 * @packageDocumentation
 */

// Main client
export { LockLLM } from './client';

// Error classes
export {
  LockLLMError,
  AuthenticationError,
  RateLimitError,
  PromptInjectionError,
  UpstreamError,
  ConfigurationError,
  NetworkError,
} from './errors';

// Types
export type { LockLLMConfig, RequestOptions, Provider } from './types/common';
export type { ScanRequest, ScanResponse, Sensitivity } from './types/scan';
export type {
  ScanResult,
  LockLLMErrorData,
  PromptInjectionErrorData,
} from './types/errors';
export type { ProviderName } from './types/providers';

// Utilities
export { getProxyURL, getAllProxyURLs } from './utils';

// Wrappers (re-exported for convenience)
export {
  createOpenAI,
  createAnthropic,
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
} from './wrappers';
