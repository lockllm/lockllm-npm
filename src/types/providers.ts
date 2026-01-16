/**
 * Provider-specific types
 */

export const PROVIDER_BASE_URLS = {
  openai: 'https://api.openai.com',
  anthropic: 'https://api.anthropic.com',
  gemini: 'https://generativelanguage.googleapis.com',
  cohere: 'https://api.cohere.com',
  openrouter: 'https://openrouter.ai',
  perplexity: 'https://api.perplexity.ai',
  mistral: 'https://api.mistral.ai',
  groq: 'https://api.groq.com',
  deepseek: 'https://api.deepseek.com',
  together: 'https://api.together.xyz',
  xai: 'https://api.x.ai',
  fireworks: 'https://api.fireworks.ai',
  anyscale: 'https://api.endpoints.anyscale.com',
  huggingface: 'https://router.huggingface.co',
  azure: '', // Custom endpoint URL required
  bedrock: '', // Custom endpoint URL required
  'vertex-ai': '', // Custom endpoint URL required
} as const;

export type ProviderName = keyof typeof PROVIDER_BASE_URLS;
