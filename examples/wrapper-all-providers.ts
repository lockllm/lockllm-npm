/**
 * All Providers Example
 *
 * Demonstrates how to use LockLLM with all 17 supported providers
 */

import {
  createOpenAI,
  createAnthropic,
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
  createClient,
  createOpenAICompatible,
  getProxyURL,
} from '@lockllm/sdk';

async function main() {
  const lockllmApiKey = process.env.LOCKLLM_API_KEY;
  if (!lockllmApiKey) {
    throw new Error('LOCKLLM_API_KEY environment variable is required');
  }

  console.log('LockLLM - All Providers Example\n');

  // ============================================
  // 1. OpenAI
  // ============================================
  console.log('1. OpenAI');
  const openai = createOpenAI({
    apiKey: lockllmApiKey,
  });

  const openaiResponse = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello from OpenAI!' }],
  });
  console.log('Response:', openaiResponse.choices[0].message.content);
  console.log('✓ OpenAI works!\n');

  // ============================================
  // 2. Anthropic
  // ============================================
  console.log('2. Anthropic');
  const anthropic = createAnthropic({
    apiKey: lockllmApiKey,
  });

  const anthropicResponse = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Hello from Anthropic!' }],
  });
  console.log('Response:', anthropicResponse.content[0].text);
  console.log('✓ Anthropic works!\n');

  // ============================================
  // 3. Groq (OpenAI-compatible)
  // ============================================
  console.log('3. Groq');
  const groq = createGroq({
    apiKey: lockllmApiKey,
  });

  const groqResponse = await groq.chat.completions.create({
    model: 'llama-3.1-70b-versatile',
    messages: [{ role: 'user', content: 'Hello from Groq!' }],
  });
  console.log('Response:', groqResponse.choices[0].message.content);
  console.log('✓ Groq works!\n');

  // ============================================
  // 4. DeepSeek (OpenAI-compatible)
  // ============================================
  console.log('4. DeepSeek');
  const deepseek = createDeepSeek({
    apiKey: lockllmApiKey,
  });

  const deepseekResponse = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: 'Hello from DeepSeek!' }],
  });
  console.log('Response:', deepseekResponse.choices[0].message.content);
  console.log('✓ DeepSeek works!\n');

  // ============================================
  // 5. Perplexity (OpenAI-compatible)
  // ============================================
  console.log('5. Perplexity');
  const perplexity = createPerplexity({
    apiKey: lockllmApiKey,
  });

  const perplexityResponse = await perplexity.chat.completions.create({
    model: 'llama-3.1-sonar-small-128k-online',
    messages: [{ role: 'user', content: 'Hello from Perplexity!' }],
  });
  console.log('Response:', perplexityResponse.choices[0].message.content);
  console.log('✓ Perplexity works!\n');

  // ============================================
  // 6. Mistral AI (OpenAI-compatible)
  // ============================================
  console.log('6. Mistral AI');
  const mistral = createMistral({
    apiKey: lockllmApiKey,
  });

  const mistralResponse = await mistral.chat.completions.create({
    model: 'mistral-small-latest',
    messages: [{ role: 'user', content: 'Hello from Mistral!' }],
  });
  console.log('Response:', mistralResponse.choices[0].message.content);
  console.log('✓ Mistral AI works!\n');

  // ============================================
  // 7. OpenRouter (OpenAI-compatible)
  // ============================================
  console.log('7. OpenRouter');
  const openrouter = createOpenRouter({
    apiKey: lockllmApiKey,
  });

  const openrouterResponse = await openrouter.chat.completions.create({
    model: 'anthropic/claude-3-5-sonnet',
    messages: [{ role: 'user', content: 'Hello from OpenRouter!' }],
  });
  console.log('Response:', openrouterResponse.choices[0].message.content);
  console.log('✓ OpenRouter works!\n');

  // ============================================
  // 8. Together AI (OpenAI-compatible)
  // ============================================
  console.log('8. Together AI');
  const together = createTogether({
    apiKey: lockllmApiKey,
  });

  const togetherResponse = await together.chat.completions.create({
    model: 'meta-llama/Llama-3-70b-chat-hf',
    messages: [{ role: 'user', content: 'Hello from Together AI!' }],
  });
  console.log('Response:', togetherResponse.choices[0].message.content);
  console.log('✓ Together AI works!\n');

  // ============================================
  // 9. xAI (Grok) (OpenAI-compatible)
  // ============================================
  console.log('9. xAI (Grok)');
  const xai = createXAI({
    apiKey: lockllmApiKey,
  });

  const xaiResponse = await xai.chat.completions.create({
    model: 'grok-beta',
    messages: [{ role: 'user', content: 'Hello from xAI!' }],
  });
  console.log('Response:', xaiResponse.choices[0].message.content);
  console.log('✓ xAI works!\n');

  // ============================================
  // 10. Fireworks AI (OpenAI-compatible)
  // ============================================
  console.log('10. Fireworks AI');
  const fireworks = createFireworks({
    apiKey: lockllmApiKey,
  });

  const fireworksResponse = await fireworks.chat.completions.create({
    model: 'accounts/fireworks/models/llama-v3p1-70b-instruct',
    messages: [{ role: 'user', content: 'Hello from Fireworks!' }],
  });
  console.log('Response:', fireworksResponse.choices[0].message.content);
  console.log('✓ Fireworks AI works!\n');

  // ============================================
  // 11. Anyscale (OpenAI-compatible)
  // ============================================
  console.log('11. Anyscale');
  const anyscale = createAnyscale({
    apiKey: lockllmApiKey,
  });

  const anyscaleResponse = await anyscale.chat.completions.create({
    model: 'meta-llama/Llama-3-70b-chat-hf',
    messages: [{ role: 'user', content: 'Hello from Anyscale!' }],
  });
  console.log('Response:', anyscaleResponse.choices[0].message.content);
  console.log('✓ Anyscale works!\n');

  // ============================================
  // 12. Hugging Face (OpenAI-compatible)
  // ============================================
  console.log('12. Hugging Face');
  const huggingface = createHuggingFace({
    apiKey: lockllmApiKey,
  });

  const hfResponse = await huggingface.chat.completions.create({
    model: 'meta-llama/Llama-3-70b-chat-hf',
    messages: [{ role: 'user', content: 'Hello from Hugging Face!' }],
  });
  console.log('Response:', hfResponse.choices[0].message.content);
  console.log('✓ Hugging Face works!\n');

  // ============================================
  // 13. Google Gemini (OpenAI-compatible)
  // ============================================
  console.log('13. Google Gemini');
  const gemini = createGemini({
    apiKey: lockllmApiKey,
  });

  const geminiResponse = await gemini.chat.completions.create({
    model: 'gemini-pro',
    messages: [{ role: 'user', content: 'Hello from Gemini!' }],
  });
  console.log('Response:', geminiResponse.choices[0].message.content);
  console.log('✓ Google Gemini works!\n');

  // ============================================
  // 14. Cohere
  // ============================================
  console.log('14. Cohere');
  const cohere = createCohere({
    apiKey: lockllmApiKey,
  });

  const cohereResponse = await cohere.chat({
    model: 'command-r-plus',
    message: 'Hello from Cohere!',
  });
  console.log('Response:', cohereResponse.text);
  console.log('✓ Cohere works!\n');

  // ============================================
  // 15. Azure OpenAI
  // ============================================
  console.log('15. Azure OpenAI');
  const azure = createAzure({
    apiKey: lockllmApiKey,
  });

  const azureResponse = await azure.chat.completions.create({
    model: 'gpt-4', // Uses your Azure deployment name configured in dashboard
    messages: [{ role: 'user', content: 'Hello from Azure!' }],
  });
  console.log('Response:', azureResponse.choices[0].message.content);
  console.log('✓ Azure OpenAI works!\n');

  // ============================================
  // 16. AWS Bedrock
  // ============================================
  console.log('16. AWS Bedrock');
  const bedrock = createBedrock({
    apiKey: lockllmApiKey,
  });

  // Bedrock uses a different API format
  console.log('Proxy URL:', getProxyURL('bedrock'));
  console.log('✓ AWS Bedrock configured!\n');

  // ============================================
  // 17. Google Vertex AI
  // ============================================
  console.log('17. Google Vertex AI');
  const vertexai = createVertexAI({
    apiKey: lockllmApiKey,
  });

  console.log('Proxy URL:', getProxyURL('vertex-ai'));
  console.log('✓ Google Vertex AI configured!\n');

  // ============================================
  // Generic Approach
  // ============================================
  console.log('\n=== Generic Approach ===\n');

  // Using createClient with any SDK
  console.log('Using createClient with custom SDK...');
  const customClient = createClient('groq', require('openai').default, {
    apiKey: lockllmApiKey,
  });

  const customResponse = await customClient.chat.completions.create({
    model: 'llama-3.1-70b-versatile',
    messages: [{ role: 'user', content: 'Hello via createClient!' }],
  });
  console.log('Response:', customResponse.choices[0].message.content);
  console.log('✓ Generic createClient works!\n');

  // Using createOpenAICompatible
  console.log('Using createOpenAICompatible for any OpenAI-compatible provider...');
  const anyProvider = createOpenAICompatible('deepseek', {
    apiKey: lockllmApiKey,
  });

  const anyResponse = await anyProvider.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: 'Hello via createOpenAICompatible!' }],
  });
  console.log('Response:', anyResponse.choices[0].message.content);
  console.log('✓ createOpenAICompatible works!\n');

  // ============================================
  // Using Official SDKs Directly
  // ============================================
  console.log('\n=== Using Official SDKs Directly ===\n');

  // You can also use official SDKs directly by just changing baseURL
  const OpenAI = require('openai').default;
  const directClient = new OpenAI({
    apiKey: lockllmApiKey,
    baseURL: getProxyURL('groq'), // Use getProxyURL utility
  });

  const directResponse = await directClient.chat.completions.create({
    model: 'llama-3.1-70b-versatile',
    messages: [{ role: 'user', content: 'Hello via official SDK!' }],
  });
  console.log('Response:', directResponse.choices[0].message.content);
  console.log('✓ Official SDK with custom baseURL works!\n');

  console.log('\n✅ All providers configured successfully!');
  console.log('\nNote: Some responses may fail if you haven\'t added the provider API key to your dashboard.');
  console.log('Visit https://www.lockllm.com/dashboard to add your provider keys.\n');
}

main().catch(console.error);
