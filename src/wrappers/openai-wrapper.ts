/**
 * OpenAI SDK wrapper - Drop-in replacement
 *
 * This wrapper allows you to use the official OpenAI SDK with LockLLM protection
 * by simply changing how you initialize the client.
 *
 * @example
 * ```typescript
 * // Replace this:
 * // import OpenAI from 'openai';
 * // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 *
 * // With this:
 * import { createOpenAI } from '@lockllm/sdk/wrappers';
 * const openai = createOpenAI({
 *   apiKey: process.env.LOCKLLM_API_KEY
 * });
 *
 * // Everything else stays the same!
 * const response = await openai.chat.completions.create({
 *   model: "gpt-4",
 *   messages: [{ role: "user", content: "Hello!" }]
 * });
 * ```
 */

export interface CreateOpenAIConfig {
  /**
   * Your LockLLM API key
   * Get it from: https://www.lockllm.com/dashboard
   */
  apiKey: string;

  /**
   * Base URL for LockLLM proxy (default: https://api.lockllm.com/v1/proxy/openai)
   * Override this only if you're using a custom LockLLM endpoint
   */
  baseURL?: string;

  /**
   * Other OpenAI client options
   */
  [key: string]: any;
}

/**
 * Create an OpenAI client that routes through LockLLM proxy
 *
 * All requests are automatically scanned for prompt injection before being
 * forwarded to OpenAI. Your OpenAI API key should be configured in the
 * LockLLM dashboard at https://www.lockllm.com/dashboard
 *
 * @param config - Configuration options
 * @returns OpenAI client instance
 *
 * @example
 * ```typescript
 * const openai = createOpenAI({
 *   apiKey: process.env.LOCKLLM_API_KEY
 * });
 *
 * const response = await openai.chat.completions.create({
 *   model: "gpt-4",
 *   messages: [{ role: "user", content: "Hello!" }]
 * });
 * ```
 */
/**
 * Lazy-load OpenAI SDK constructor
 * @internal - exposed for testing purposes
 */
export function getOpenAIConstructor(requireFn = require): any {
  try {
    const openaiModule = requireFn('openai');
    return openaiModule.default || openaiModule.OpenAI || openaiModule;
  } catch (error) {
    throw new Error(
      'OpenAI SDK not found. Please install it with: npm install openai'
    );
  }
}

export function createOpenAI(config: CreateOpenAIConfig): any {
  // Get OpenAI SDK constructor
  const OpenAIConstructor = getOpenAIConstructor();

  const { apiKey, baseURL, ...otherOptions} = config;

  // Create OpenAI client with LockLLM proxy
  return new OpenAIConstructor({
    apiKey,
    baseURL: baseURL || 'https://api.lockllm.com/v1/proxy/openai',
    ...otherOptions,
  });
}
