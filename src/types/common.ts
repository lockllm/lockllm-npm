/**
 * Common types used throughout the SDK
 */

export interface LockLLMConfig {
  /** Your LockLLM API key */
  apiKey: string;
  /** Base URL for LockLLM API (default: https://api.lockllm.com) */
  baseURL?: string;
  /** Request timeout in milliseconds (default: 60000) */
  timeout?: number;
  /** Maximum number of retries for rate-limited requests (default: 3) */
  maxRetries?: number;
}

export interface RequestOptions {
  /** Custom headers to include in the request */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Abort signal for cancelling requests */
  signal?: AbortSignal;
}

export interface ErrorResponse {
  error: {
    message: string;
    type: string;
    code?: string;
    [key: string]: any;
  };
}

export type Provider =
  | 'openai'
  | 'anthropic'
  | 'gemini'
  | 'cohere'
  | 'openrouter'
  | 'perplexity'
  | 'mistral'
  | 'groq'
  | 'deepseek'
  | 'together'
  | 'xai'
  | 'fireworks'
  | 'anyscale'
  | 'huggingface'
  | 'azure'
  | 'bedrock'
  | 'vertex-ai';
