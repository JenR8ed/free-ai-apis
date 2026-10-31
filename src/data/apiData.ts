import { ApiItem, CategoryInfo, CategoryKey } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { key: 'llm', label: 'LLM / Text Generation', iconName: 'MessageSquareText', description: 'Large Language Models, chat completions, reasoning engines', count: 17 },
  { key: 'image', label: 'Image Generation', iconName: 'Image', description: 'Text-to-image synthesis, inpainting, and image editing', count: 9 },
  { key: 'speech-to-text', label: 'Speech-to-Text', iconName: 'Mic', description: 'Audio transcription, speech recognition, and captioning', count: 7 },
  { key: 'text-to-speech', label: 'Text-to-Speech', iconName: 'Volume2', description: 'Voice synthesis, realistic audio generation, voice cloning', count: 6 },
  { key: 'embeddings', label: 'Embeddings', iconName: 'Binary', description: 'Vector embeddings for semantic search, RAG, and clustering', count: 7 },
  { key: 'vision', label: 'Vision / Recognition', iconName: 'Eye', description: 'OCR, object detection, multimodal understanding', count: 6 },
  { key: 'video', label: 'Video Generation', iconName: 'Video', description: 'Text-to-video, image-to-video generation engines', count: 3 },
  { key: 'music', label: 'Music & Audio', iconName: 'Music', description: 'AI music composition, sound effects, audio track generation', count: 4 },
  { key: 'translation', label: 'Translation', iconName: 'Languages', description: 'Multilingual neural translation APIs', count: 5 },
  { key: 'summarization', label: 'Summarization & Extraction', iconName: 'FileText', description: 'Document parsing, web scraping, and content extraction', count: 5 },
  { key: 'code', label: 'Code Generation', iconName: 'Code', description: 'Code completion, inline assistance, code translation', count: 6 },
  { key: 'search', label: 'Search & RAG', iconName: 'Search', description: 'Web search APIs tailored for AI agents and RAG pipelines', count: 5 },
  { key: 'moderation', label: 'Moderation & Safety', iconName: 'ShieldAlert', description: 'Toxicity, safety, and content moderation checks', count: 4 },
  { key: 'hosting', label: 'Model Hosting & Inference', iconName: 'Server', description: 'Serverless deployment, GPU notebooks, and model hosting', count: 5 },
  { key: 'aggregators', label: 'Multi-Modal Aggregators', iconName: 'Layers', description: 'Unified API gateways routing across 100+ AI providers', count: 4 },
];

export const ALL_APIS: ApiItem[] = [
  // --- LLM / Text Generation ---
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Access Gemini 2.5 Pro and Flash with industry-leading 2M context window.',
    freeTier: '1,500 req/day, 2M context window',
    auth: 'apiKey',
    website: 'https://aistudio.google.com',
    docs: 'https://ai.google.dev/docs',
    tags: ['Gemini', '2M Context', 'Multimodal', 'Google'],
    popular: true,
    playgroundSupported: true,
    playgroundType: 'mock',
    sampleCode: {
      curl: `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"contents": [{"parts":[{"text": "Explain quantum computing in one sentence."}]}]}'`,
      javascript: `import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Explain quantum computing in one sentence.',
});
console.log(response.text);`,
      python: `from google import genai
client = genai.Client()
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain quantum computing in one sentence.",
)
print(response.text)`
    }
  },
  {
    id: 'groq',
    name: 'Groq',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Ultra-fast LPU inference hosting Llama 3.3 70B, Mixtral, and Gemma models.',
    freeTier: '1,000 req/day, 6,000 tokens/min',
    auth: 'apiKey',
    website: 'https://groq.com',
    docs: 'https://console.groq.com/docs',
    tags: ['Ultra-Fast', 'LPU', 'Llama 3.3', 'Mixtral'],
    popular: true,
    playgroundSupported: true,
    playgroundType: 'mock',
    sampleCode: {
      curl: `curl https://api.groq.com/openai/v1/chat/completions \\
  -H "Authorization: Bearer $GROQ_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "llama-3.3-70b-versatile", "messages": [{"role": "user", "content": "Hello Groq!"}]}'`,
      javascript: `import OpenAI from 'openai';
const groq = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1' });
const completion = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [{ role: 'user', content: 'Hello Groq!' }],
});
console.log(completion.choices[0].message.content);`,
      python: `from openai import OpenAI
client = OpenAI(api_key=os.environ.get("GROQ_API_KEY"), base_url="https://api.groq.com/openai/v1")
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "Hello Groq!"}]
)
print(response.choices[0].message.content)`
    }
  },
  {
    id: 'cerebras',
    name: 'Cerebras',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'World record inference speed using Wafer-Scale Engine hardware.',
    freeTier: 'Free tier included on signup',
    auth: 'apiKey',
    website: 'https://cerebras.ai',
    docs: 'https://docs.cerebras.ai',
    tags: ['Wafer-Scale', 'High-Speed', 'Llama 3.1', 'OpenAI Compatible'],
    popular: true,
    sampleCode: {
      curl: `curl https://api.cerebras.ai/v1/chat/completions \\
  -H "Authorization: Bearer $CEREBRAS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "llama3.1-70b", "messages": [{"role": "user", "content": "Speed test!"}]}'`
    }
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Unified API routing to 100+ models, including multiple $0 free models.',
    freeTier: 'Multiple top-tier models 100% free',
    auth: 'apiKey',
    website: 'https://openrouter.ai',
    docs: 'https://openrouter.ai/docs',
    tags: ['Unified Gateway', '100+ Models', 'Free Tier', 'Fallbacks'],
    popular: true,
    sampleCode: {
      curl: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "google/gemini-2.0-flash-lite-001:free", "messages": [{"role": "user", "content": "Hi!"}]}'`
    }
  },
  {
    id: 'huggingface-llm',
    name: 'Hugging Face',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Serverless Inference API hosting 500,000+ open-source models.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['Open Source', 'Inference API', 'Hub', 'Community'],
    popular: true
  },
  {
    id: 'mistral-ai',
    name: 'Mistral AI',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'High-performance European AI models including Mistral Large & Codestral.',
    freeTier: 'Daily free token quota on la Plateforme',
    auth: 'apiKey',
    website: 'https://mistral.ai',
    docs: 'https://docs.mistral.ai',
    tags: ['Mistral', 'Codestral', 'Mixtral', 'MoE']
  },
  {
    id: 'cohere',
    name: 'Cohere',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Enterprise-grade Command R and R+ models with built-in search grounding.',
    freeTier: 'Trial API key with rate limits for development',
    auth: 'apiKey',
    website: 'https://cohere.com',
    docs: 'https://docs.cohere.com',
    tags: ['Command R', 'Enterprise', 'Grounding', 'Tool Use']
  },
  {
    id: 'together-ai',
    name: 'Together AI',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Fast cloud hosting for 100+ open-source text and image generation models.',
    freeTier: '$5 free trial credit',
    auth: 'apiKey',
    website: 'https://together.ai',
    docs: 'https://docs.together.ai',
    tags: ['Open-Source', '$5 Credit', 'Sub-second', 'Fine-Tuning']
  },
  {
    id: 'fireworks-ai',
    name: 'Fireworks AI',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Lightning-fast compound AI platform with function calling support.',
    freeTier: '$1 free credit on signup',
    auth: 'apiKey',
    website: 'https://fireworks.ai',
    docs: 'https://docs.fireworks.ai',
    tags: ['Function Calling', 'Compound AI', 'Low Latency']
  },
  {
    id: 'deepinfra',
    name: 'DeepInfra',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Serverless infrastructure for running LLMs, embeddings, and whisper models.',
    freeTier: 'Free starter credits upon account creation',
    auth: 'apiKey',
    website: 'https://deepinfra.com',
    docs: 'https://deepinfra.com/docs',
    tags: ['Serverless', 'Embeddings', 'OpenAI Compatible']
  },
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Run Llama 3, DeepSeek-R1, Mistral, and Gemma locally on your own machine.',
    freeTier: 'Unlimited (100% local execution)',
    auth: 'None',
    website: 'https://ollama.com',
    docs: 'https://github.com/ollama/ollama/blob/main/docs/api.md',
    tags: ['Local', 'Private', 'Offline', 'Open Source'],
    isLocal: true,
    sampleCode: {
      curl: `curl http://localhost:11434/api/generate -d '{"model": "llama3.2", "prompt": "Why is the sky blue?"}'`,
      javascript: `fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({ model: 'llama3.2', prompt: 'Why is the sky blue?', stream: false })
}).then(res => res.json()).then(console.log);`
    }
  },
  {
    id: 'lm-studio',
    name: 'LM Studio',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Desktop GUI and local server to run any GGUF model offline.',
    freeTier: 'Unlimited (100% local execution)',
    auth: 'None',
    website: 'https://lmstudio.ai',
    docs: 'https://lmstudio.ai/docs',
    tags: ['Local', 'GGUF', 'Desktop GUI', 'Offline'],
    isLocal: true
  },
  {
    id: 'puter',
    name: 'Puter',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Free AI API directly accessible from client-side browser apps without signup.',
    freeTier: '100% free, no signup or credit card',
    auth: 'None',
    website: 'https://puter.com',
    docs: 'https://developer.puter.com/tutorials/free-llm-api/',
    tags: ['No Auth', 'In-Browser', 'Free', 'Zero Config'],
    popular: true,
    playgroundSupported: true,
    playgroundType: 'free_llm',
    sampleCode: {
      javascript: `// Include puter.js script tag in your HTML: <script src="https://js.puter.com/v2/"></script>
const response = await puter.ai.chat("Explain photosyntheis in simple terms.");
console.log(response);`
    }
  },
  {
    id: 'aiml-api',
    name: 'AIML API',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Unified multi-provider API serving 200+ AI models for text, vision, and audio.',
    freeTier: 'Free trial credits upon registration',
    auth: 'apiKey',
    website: 'https://aimlapi.com',
    docs: 'https://docs.aimlapi.com',
    tags: ['Unified API', '200+ Models', 'Multimodal']
  },
  {
    id: 'sambanova',
    name: 'SambaNova',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Enterprise AI chip platform providing high-speed inference for Llama 3 405B.',
    freeTier: 'Free developer tier',
    auth: 'apiKey',
    website: 'https://sambanova.ai',
    docs: 'https://docs.sambanova.ai',
    tags: ['Llama 405B', 'Enterprise Chip', 'High Speed']
  },
  {
    id: 'novita-ai',
    name: 'Novita AI',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Serverless cloud hosting for LLMs, SDXL image generation, and face swap APIs.',
    freeTier: '$0.50 free trial credit',
    auth: 'apiKey',
    website: 'https://novita.ai',
    docs: 'https://novita.ai/docs',
    tags: ['LLM', 'Image Gen', 'Face Swap']
  },
  {
    id: 'hyperbolic',
    name: 'Hyperbolic',
    category: 'llm',
    categoryLabel: 'LLM / Text Generation',
    description: 'Decentralized open-source model inference platform.',
    freeTier: 'Free credits available',
    auth: 'apiKey',
    website: 'https://hyperbolic.xyz',
    docs: 'https://docs.hyperbolic.xyz',
    tags: ['Decentralized', 'Open Source', 'GPU Compute']
  },

  // --- Image Generation ---
  {
    id: 'pollinations',
    name: 'Pollinations AI',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: '100% free, unlimited text-to-image API requiring zero authentication or keys.',
    freeTier: 'Unlimited, no authentication required',
    auth: 'None',
    website: 'https://pollinations.ai',
    docs: 'https://github.com/pollinations/pollinations',
    tags: ['Zero Auth', 'Unlimited', 'Flux', 'URL Based'],
    popular: true,
    playgroundSupported: true,
    playgroundType: 'pollinations',
    sampleCode: {
      curl: `curl "https://image.pollinations.ai/prompt/a%20cyberpunk%20cat%20in%20tokyo?width=1024&height=1024&seed=42" --output cat.jpg`,
      javascript: `const imageUrl = 'https://image.pollinations.ai/prompt/' + encodeURIComponent('futuristic neon city') + '?width=1024&height=1024&model=flux';
document.getElementById('myImg').src = imageUrl;`,
      python: `import requests
prompt = "a serene mountain landscape sunset watercolor"
url = f"https://image.pollinations.ai/prompt/{prompt}?width=1024&height=1024&nologo=true"
response = requests.get(url)
with open("landscape.jpg", "wb") as f:
    f.write(response.content)`
    }
  },
  {
    id: 'stability-ai',
    name: 'Stability AI',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'Creators of Stable Diffusion 3.5, Ultra, and Stable Video Diffusion.',
    freeTier: '25 free credits/month',
    auth: 'apiKey',
    website: 'https://stability.ai',
    docs: 'https://platform.stability.ai/docs',
    tags: ['Stable Diffusion', 'SD3.5', 'Inpainting'],
    popular: true
  },
  {
    id: 'replicate-img',
    name: 'Replicate',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'Cloud API for Flux, SDXL, ControlNet, and custom community models.',
    freeTier: '$5 free trial credit (no credit card required)',
    auth: 'apiKey',
    website: 'https://replicate.com',
    docs: 'https://replicate.com/docs',
    tags: ['FLUX.1', 'SDXL', 'ControlNet', 'Community Models'],
    popular: true
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo AI',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'Image generation platform with real-time canvas, custom model training, and editing.',
    freeTier: '150 free tokens refilled daily',
    auth: 'apiKey',
    website: 'https://leonardo.ai',
    docs: 'https://docs.leonardo.ai',
    tags: ['Daily Tokens', 'Realtime Canvas', 'Custom Models']
  },
  {
    id: 'huggingface-img',
    name: 'Hugging Face (Image)',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'Run FLUX, SDXL, and Playground v2 models via free Inference API.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['FLUX', 'Open Source', 'Free Inference']
  },
  {
    id: 'craiyon',
    name: 'Craiyon',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'Free AI image generator (formerly DALL-E mini).',
    freeTier: 'Free with watermark',
    auth: 'None',
    website: 'https://craiyon.com',
    docs: 'https://docs.craiyon.com',
    tags: ['DALL-E Mini', 'Free', 'Watermarked']
  },
  {
    id: 'clipdrop',
    name: 'Clipdrop',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'Image editing APIs: background removal, image upscaling, cleanup, and relighting.',
    freeTier: '100 API calls/day',
    auth: 'apiKey',
    website: 'https://clipdrop.co',
    docs: 'https://clipdrop.co/apis/docs',
    tags: ['Background Removal', 'Upscaling', 'Cleanup']
  },
  {
    id: 'flux-replicate',
    name: 'Flux Schnell (Replicate)',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'Black Forest Labs state-of-the-art fast image generation model.',
    freeTier: 'Included in Replicate free tier',
    auth: 'apiKey',
    website: 'https://replicate.com/black-forest-labs/flux-schnell',
    docs: 'https://replicate.com/docs',
    tags: ['FLUX Schnell', 'Black Forest Labs', 'High Quality']
  },
  {
    id: 'together-img',
    name: 'Together AI (Image)',
    category: 'image',
    categoryLabel: 'Image Generation',
    description: 'High-speed FLUX.1 and Stable Diffusion inference endpoints.',
    freeTier: 'Included in $5 free credit',
    auth: 'apiKey',
    website: 'https://together.ai',
    docs: 'https://docs.together.ai',
    tags: ['FLUX', 'Fast SDXL', 'Cloud API']
  },

  // --- Speech-to-Text ---
  {
    id: 'deepgram',
    name: 'Deepgram',
    category: 'speech-to-text',
    categoryLabel: 'Speech-to-Text',
    description: 'Real-time and batch speech recognition with Nova-3 transcription engine.',
    freeTier: '$200 free credit (lasts ~45,000 minutes)',
    auth: 'apiKey',
    website: 'https://deepgram.com',
    docs: 'https://developers.deepgram.com',
    tags: ['Nova-3', '$200 Credit', 'Realtime', 'Diarization'],
    popular: true
  },
  {
    id: 'assemblyai',
    name: 'AssemblyAI',
    category: 'speech-to-text',
    categoryLabel: 'Speech-to-Text',
    description: 'Speech recognition + LeMurs audio intelligence (summarization, sentiment).',
    freeTier: '~330 hours free transcription',
    auth: 'apiKey',
    website: 'https://assemblyai.com',
    docs: 'https://www.assemblyai.com/docs',
    tags: ['330 Hours Free', 'Audio Intelligence', 'Speaker Diarization'],
    popular: true
  },
  {
    id: 'google-cloud-speech',
    name: 'Google Cloud Speech-to-Text',
    category: 'speech-to-text',
    categoryLabel: 'Speech-to-Text',
    description: 'Google enterprise speech recognition supporting 125+ languages.',
    freeTier: '60 minutes free every month',
    auth: 'apiKey',
    website: 'https://cloud.google.com/speech-to-text',
    docs: 'https://cloud.google.com/speech-to-text/docs',
    tags: ['125+ Languages', 'Google Cloud', 'Enterprise']
  },
  {
    id: 'whisper-hf',
    name: 'Whisper (via Hugging Face)',
    category: 'speech-to-text',
    categoryLabel: 'Speech-to-Text',
    description: 'Run OpenAI Whisper-large-v3 model hosted on Hugging Face Inference API.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://platform.openai.com',
    docs: 'https://platform.openai.com/docs/guides/speech-to-text',
    tags: ['Whisper v3', 'Hugging Face', 'Multilingual']
  },
  {
    id: 'whisper-local',
    name: 'Whisper (Local)',
    category: 'speech-to-text',
    categoryLabel: 'Speech-to-Text',
    description: 'OpenAI official open-source automatic speech recognition neural network.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://github.com/openai/whisper',
    docs: 'https://github.com/openai/whisper',
    tags: ['Local', 'Python', 'Whisper', 'Offline'],
    isLocal: true
  },
  {
    id: 'vosk',
    name: 'Vosk',
    category: 'speech-to-text',
    categoryLabel: 'Speech-to-Text',
    description: 'Offline open-source speech recognition toolkit supporting 20+ languages.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://alphacephei.com/vosk/',
    docs: 'https://alphacephei.com/vosk/server',
    tags: ['Offline', 'Lightweight', '20+ Languages', 'Mobile Ready'],
    isLocal: true
  },
  {
    id: 'speechbrain',
    name: 'SpeechBrain',
    category: 'speech-to-text',
    categoryLabel: 'Speech-to-Text',
    description: 'All-in-one PyTorch conversational AI toolkit.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://speechbrain.github.io',
    docs: 'https://speechbrain.github.io',
    tags: ['PyTorch', 'Research', 'Speech Enhancement'],
    isLocal: true
  },

  // --- Text-to-Speech ---
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'text-to-speech',
    categoryLabel: 'Text-to-Speech',
    description: 'Ultra-realistic AI voice generator, speech synthesis, and voice cloning.',
    freeTier: '10,000 characters/month free forever',
    auth: 'apiKey',
    website: 'https://elevenlabs.io',
    docs: 'https://elevenlabs.io/docs',
    tags: ['Realistic Voice', '10K Chars/Mo', 'Voice Cloning', 'Multilingual'],
    popular: true
  },
  {
    id: 'google-cloud-tts',
    name: 'Google Cloud Text-to-Speech',
    category: 'text-to-speech',
    categoryLabel: 'Text-to-Speech',
    description: 'Synthesize natural-sounding speech with 380+ voices across 50+ languages.',
    freeTier: '4,000,000 characters/month free',
    auth: 'apiKey',
    website: 'https://cloud.google.com/text-to-speech',
    docs: 'https://cloud.google.com/text-to-speech/docs',
    tags: ['4M Chars Free', 'Neural2', 'WaveNet', '380+ Voices'],
    popular: true
  },
  {
    id: 'amazon-polly',
    name: 'Amazon Polly',
    category: 'text-to-speech',
    categoryLabel: 'Text-to-Speech',
    description: 'AWS text-to-speech service with lifelike neural voices.',
    freeTier: '5,000,000 characters/month (for first 12 months)',
    auth: 'apiKey',
    website: 'https://aws.amazon.com/polly/',
    docs: 'https://docs.aws.amazon.com/polly/',
    tags: ['AWS', 'Neural Voices', '5M Chars']
  },
  {
    id: 'coqui-tts',
    name: 'Coqui TTS (Local)',
    category: 'text-to-speech',
    categoryLabel: 'Text-to-Speech',
    description: 'Deep learning toolkit for Text-to-Speech research and application.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://github.com/coqui-ai/TTS',
    docs: 'https://tts.readthedocs.io',
    tags: ['Local', 'Voice Cloning', 'Open Source'],
    isLocal: true
  },
  {
    id: 'piper-tts',
    name: 'Piper (Local)',
    category: 'text-to-speech',
    categoryLabel: 'Text-to-Speech',
    description: 'A fast, local neural text to speech system optimized for Raspberry Pi and desktop.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://github.com/rhasspy/piper',
    docs: 'https://github.com/rhasspy/piper',
    tags: ['Local', 'Fast', 'Raspberry Pi', 'C++'],
    isLocal: true
  },
  {
    id: 'bark-tts',
    name: 'Bark (Local)',
    category: 'text-to-speech',
    categoryLabel: 'Text-to-Speech',
    description: 'Transformer-based audio generation model by Suno with music and speech effects.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://github.com/suno-ai/bark',
    docs: 'https://github.com/suno-ai/bark',
    tags: ['Suno', 'Transformer', 'Music + Speech', 'Local'],
    isLocal: true
  },

  // --- Embeddings ---
  {
    id: 'google-embeddings',
    name: 'Google AI Studio Embeddings',
    category: 'embeddings',
    categoryLabel: 'Embeddings',
    description: 'Gemini text-embedding-004 model with 768 dimensions and high performance.',
    freeTier: 'Included in Google AI Studio free tier',
    auth: 'apiKey',
    website: 'https://aistudio.google.com',
    docs: 'https://ai.google.dev/docs/embeddings_guide',
    tags: ['text-embedding-004', '768 Dimensions', 'Google'],
    popular: true
  },
  {
    id: 'voyage-ai',
    name: 'Voyage AI',
    category: 'embeddings',
    categoryLabel: 'Embeddings',
    description: 'State-of-the-art domain-specific embeddings (voyage-3, voyage-code-2).',
    freeTier: '50,000,000 tokens free',
    auth: 'apiKey',
    website: 'https://voyageai.com',
    docs: 'https://docs.voyageai.com',
    tags: ['50M Free Tokens', 'SOTA Embeddings', 'RAG Specialist'],
    popular: true
  },
  {
    id: 'cohere-embed',
    name: 'Cohere Embed v3',
    category: 'embeddings',
    categoryLabel: 'Embeddings',
    description: 'Multilingual and code embeddings with compression-aware search metrics.',
    freeTier: 'Rate-limited trial key',
    auth: 'apiKey',
    website: 'https://cohere.com',
    docs: 'https://docs.cohere.com/reference/embed',
    tags: ['Multilingual', 'Code Embeddings', 'Compression']
  },
  {
    id: 'huggingface-embed',
    name: 'Hugging Face Embeddings',
    category: 'embeddings',
    categoryLabel: 'Embeddings',
    description: 'Access BGE, E5, and sentence-transformers via free inference endpoint.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['BGE', 'E5', 'Sentence-Transformers']
  },
  {
    id: 'jina-ai',
    name: 'Jina AI Embeddings',
    category: 'embeddings',
    categoryLabel: 'Embeddings',
    description: '8192-token long-context embedding models for documents and cross-modal search.',
    freeTier: '1,000,000 tokens free',
    auth: 'apiKey',
    website: 'https://jina.ai',
    docs: 'https://jina.ai/embeddings/',
    tags: ['8192 Token Context', '1M Free Tokens', 'RAG']
  },
  {
    id: 'nomic-ai',
    name: 'Nomic Embed',
    category: 'embeddings',
    categoryLabel: 'Embeddings',
    description: 'Fully open-source, fully auditable text embeddings (nomic-embed-text-v1.5).',
    freeTier: 'Free API tier',
    auth: 'apiKey',
    website: 'https://nomic.ai',
    docs: 'https://docs.nomic.ai',
    tags: ['Open Source', 'Reproducible', 'Long Context']
  },
  {
    id: 'ollama-embeddings',
    name: 'Ollama Embeddings',
    category: 'embeddings',
    categoryLabel: 'Embeddings',
    description: 'Generate vector embeddings locally using nomic-embed-text, mxbai, or bge-large.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://ollama.com',
    docs: 'https://github.com/ollama/ollama/blob/main/docs/api.md',
    tags: ['Local Vector Embeddings', 'Nomic', 'BGE'],
    isLocal: true
  },

  // --- Vision / Recognition ---
  {
    id: 'google-vision-cloud',
    name: 'Google Cloud Vision API',
    category: 'vision',
    categoryLabel: 'Vision / Recognition',
    description: 'OCR, label detection, face detection, explicit content detection, and landmark recognition.',
    freeTier: '1,000 units/month free',
    auth: 'apiKey',
    website: 'https://cloud.google.com/vision',
    docs: 'https://cloud.google.com/vision/docs',
    tags: ['OCR', 'Object Detection', '1,000 Free Units'],
    popular: true
  },
  {
    id: 'google-gemini-vision',
    name: 'Google AI Studio (Gemini Vision)',
    category: 'vision',
    categoryLabel: 'Vision / Recognition',
    description: 'Multimodal vision capabilities inside Gemini 2.5 Pro and Flash.',
    freeTier: 'Included in free tier (1,500 req/day)',
    auth: 'apiKey',
    website: 'https://aistudio.google.com',
    docs: 'https://ai.google.dev/docs',
    tags: ['Gemini Vision', 'Multimodal', 'Diagram Analysis'],
    popular: true
  },
  {
    id: 'clarifai',
    name: 'Clarifai',
    category: 'vision',
    categoryLabel: 'Vision / Recognition',
    description: 'Computer vision platform for image and video classification.',
    freeTier: '1,000 operations/month',
    auth: 'apiKey',
    website: 'https://clarifai.com',
    docs: 'https://docs.clarifai.com',
    tags: ['Video Analysis', 'Visual Search', 'Detection']
  },
  {
    id: 'roboflow',
    name: 'Roboflow',
    category: 'vision',
    categoryLabel: 'Vision / Recognition',
    description: 'Train, deploy, and query custom YOLO and vision model APIs.',
    freeTier: '1,000 inferences/month',
    auth: 'apiKey',
    website: 'https://roboflow.com',
    docs: 'https://docs.roboflow.com',
    tags: ['Custom Computer Vision', 'YOLO', 'Bounding Boxes']
  },
  {
    id: 'hf-vision',
    name: 'Hugging Face Vision Transformers',
    category: 'vision',
    categoryLabel: 'Vision / Recognition',
    description: 'Access ViT, LayoutLM, and BLIP2 vision-language models.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['ViT', 'BLIP-2', 'LayoutLM']
  },
  {
    id: 'surya-ocr',
    name: 'Surya (Local)',
    category: 'vision',
    categoryLabel: 'Vision / Recognition',
    description: 'Multilingual OCR, layout analysis, and reading order detection.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://github.com/VikParuchuri/surya',
    docs: 'https://github.com/VikParuchuri/surya',
    tags: ['OCR', 'Layout Detection', 'Python Local'],
    isLocal: true
  },

  // --- Video Generation ---
  {
    id: 'kling-ai',
    name: 'Kling AI',
    category: 'video',
    categoryLabel: 'Video Generation',
    description: 'High-definition text-to-video and image-to-video generator.',
    freeTier: 'Free daily credits on login',
    auth: 'apiKey',
    website: 'https://klingai.com',
    docs: 'https://docs.klingai.com',
    tags: ['HD Video', 'Text-to-Video', 'Motion Brush'],
    popular: true
  },
  {
    id: 'replicate-video',
    name: 'Replicate (Video Models)',
    category: 'video',
    categoryLabel: 'Video Generation',
    description: 'Run Wan 2.1, CogVideoX, and AnimateDiff model pipelines.',
    freeTier: '$5 free trial credits',
    auth: 'apiKey',
    website: 'https://replicate.com',
    docs: 'https://replicate.com/docs',
    tags: ['Wan 2.1', 'CogVideoX', 'AnimateDiff']
  },
  {
    id: 'hf-video',
    name: 'Hugging Face Video',
    category: 'video',
    categoryLabel: 'Video Generation',
    description: 'Open source video generation models accessible via inference API.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['Video Generation', 'Open Source']
  },

  // --- Music / Audio ---
  {
    id: 'suno',
    name: 'Suno AI',
    category: 'music',
    categoryLabel: 'Music & Audio',
    description: 'Generate full songs with lyrics, vocals, and instrumentation from text prompts.',
    freeTier: '5 full songs (50 credits) every day',
    auth: 'OAuth',
    website: 'https://suno.com',
    docs: 'https://suno.com',
    tags: ['Full Song Gen', '5 Songs/Day', 'Lyrics + Music'],
    popular: true
  },
  {
    id: 'udio',
    name: 'Udio',
    category: 'music',
    categoryLabel: 'Music & Audio',
    description: 'High-fidelity musical track composition with stem separation.',
    freeTier: 'Limited free monthly generation credits',
    auth: 'OAuth',
    website: 'https://udio.com',
    docs: 'https://udio.com',
    tags: ['High Fidelity Music', 'Custom Stems']
  },
  {
    id: 'replicate-music',
    name: 'Replicate MusicGen',
    category: 'music',
    categoryLabel: 'Music & Audio',
    description: 'Meta MusicGen and AudioGen models for background music and SFX generation.',
    freeTier: '$5 free trial credit',
    auth: 'apiKey',
    website: 'https://replicate.com',
    docs: 'https://replicate.com/docs',
    tags: ['MusicGen', 'AudioGen', 'Sound Effects']
  },
  {
    id: 'audiocraft-local',
    name: 'AudioCraft (Local)',
    category: 'music',
    categoryLabel: 'Music & Audio',
    description: 'Meta open-source PyTorch library for audio and music generation.',
    freeTier: 'Unlimited (100% local)',
    auth: 'None',
    website: 'https://github.com/facebookresearch/audiocraft',
    docs: 'https://github.com/facebookresearch/audiocraft',
    tags: ['Meta AI', 'MusicGen', 'Local PyTorch'],
    isLocal: true
  },

  // --- Translation ---
  {
    id: 'deepl',
    name: 'DeepL API',
    category: 'translation',
    categoryLabel: 'Translation',
    description: 'World leading neural translation accuracy for 30+ languages.',
    freeTier: '500,000 characters/month free',
    auth: 'apiKey',
    website: 'https://deepl.com',
    docs: 'https://www.deepl.com/docs-api',
    tags: ['Highest Accuracy', '500K Chars/Mo', 'Glossary Support'],
    popular: true
  },
  {
    id: 'google-translate-cloud',
    name: 'Google Cloud Translation',
    category: 'translation',
    categoryLabel: 'Translation',
    description: 'Translate across 100+ languages dynamically.',
    freeTier: '500,000 characters/month free',
    auth: 'apiKey',
    website: 'https://cloud.google.com/translate',
    docs: 'https://cloud.google.com/translate/docs',
    tags: ['100+ Languages', 'Google Cloud', '500K Chars']
  },
  {
    id: 'libretranslate',
    name: 'LibreTranslate',
    category: 'translation',
    categoryLabel: 'Translation',
    description: 'Open-source self-hostable translation API powered by Argos Translate.',
    freeTier: 'Free public mirror (rate limited)',
    auth: 'None',
    website: 'https://libretranslate.com',
    docs: 'https://github.com/LibreTranslate/LibreTranslate',
    tags: ['Open Source', 'Self-Hostable', 'Privacy'],
    playgroundSupported: true,
    playgroundType: 'translate',
    sampleCode: {
      curl: `curl -X POST "https://libretranslate.com/translate" \\
  -H "Content-Type: application/json" \\
  -d '{"q": "Hello world", "source": "en", "target": "es"}'`
    }
  },
  {
    id: 'mymemory',
    name: 'MyMemory Translation API',
    category: 'translation',
    categoryLabel: 'Translation',
    description: 'World\'s largest translation memory API combining human and machine translations.',
    freeTier: '5,000 words/day free without key',
    auth: 'None',
    website: 'https://mymemory.translated.net',
    docs: 'https://mymemory.translated.net/doc/',
    tags: ['5,000 Words/Day', 'Translation Memory', 'No Key Required']
  },
  {
    id: 'lingva',
    name: 'Lingva Translate',
    category: 'translation',
    categoryLabel: 'Translation',
    description: 'Privacy-respecting Google Translate API proxy with no tracking.',
    freeTier: 'Unlimited, no tracking, no key needed',
    auth: 'None',
    website: 'https://lingva.ml',
    docs: 'https://github.com/thedaviddelta/lingva-translate',
    tags: ['Zero Tracking', 'No Auth', 'Google Proxy']
  },

  // --- Summarization & Extraction ---
  {
    id: 'google-summarize',
    name: 'Google AI Studio (Summarize)',
    category: 'summarization',
    categoryLabel: 'Summarization & Extraction',
    description: 'Summarize massive books or 1,000+ page PDFs in seconds using Gemini 2M context.',
    freeTier: 'Included in free tier',
    auth: 'apiKey',
    website: 'https://aistudio.google.com',
    docs: 'https://ai.google.dev/docs',
    tags: ['2M Context', 'PDF Parsing', 'Book Summarization'],
    popular: true
  },
  {
    id: 'hf-summarize',
    name: 'Hugging Face Summarization',
    category: 'summarization',
    categoryLabel: 'Summarization & Extraction',
    description: 'BART, Pegasus, and DeBERTa summarization models.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['BART', 'Pegasus', 'Open Source']
  },
  {
    id: 'firecrawl',
    name: 'Firecrawl',
    category: 'summarization',
    categoryLabel: 'Summarization & Extraction',
    description: 'Turn entire websites into clean Markdown for LLM prompts and RAG vector search.',
    freeTier: '500 free credits on sign up',
    auth: 'apiKey',
    website: 'https://firecrawl.dev',
    docs: 'https://docs.firecrawl.dev',
    tags: ['Web Scraping', 'Markdown Output', 'LLM Ready'],
    popular: true
  },
  {
    id: 'diffbot',
    name: 'Diffbot',
    category: 'summarization',
    categoryLabel: 'Summarization & Extraction',
    description: 'AI computer vision web scraper that turns web pages into clean structured JSON.',
    freeTier: '10,000 page extractions free trial',
    auth: 'apiKey',
    website: 'https://diffbot.com',
    docs: 'https://docs.diffbot.com',
    tags: ['Structured Data', 'Knowledge Graph', 'Web Crawling']
  },
  {
    id: 'unstructured-io',
    name: 'Unstructured.io',
    category: 'summarization',
    categoryLabel: 'Summarization & Extraction',
    description: 'Parse raw PDFs, DOCX, PPTX, HTML, and tables into clean LLM chunks.',
    freeTier: 'Free API tier (1,000 pages/month)',
    auth: 'apiKey',
    website: 'https://unstructured.io',
    docs: 'https://docs.unstructured.io',
    tags: ['Document Chunking', 'PDF Extraction', 'RAG Pipeline']
  },

  // --- Code Generation ---
  {
    id: 'gemini-code',
    name: 'Google AI Studio (Code)',
    category: 'code',
    categoryLabel: 'Code Generation',
    description: 'Code execution, debugging, refactoring, and generation with Gemini 2.5 Flash.',
    freeTier: 'Included in free tier (1,500 req/day)',
    auth: 'apiKey',
    website: 'https://aistudio.google.com',
    docs: 'https://ai.google.dev/docs',
    tags: ['Gemini Code', 'Multi-file Reasoning', 'Free'],
    popular: true
  },
  {
    id: 'groq-code',
    name: 'Groq (Code)',
    category: 'code',
    categoryLabel: 'Code Generation',
    description: 'Sub-second coding assistance powered by Qwen 2.5 Coder 32B and Llama 3.3.',
    freeTier: '1,000 requests/day',
    auth: 'apiKey',
    website: 'https://console.groq.com',
    docs: 'https://console.groq.com/docs',
    tags: ['Qwen Coder', 'Fast Completions', 'Free'],
    popular: true
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    category: 'code',
    categoryLabel: 'Code Generation',
    description: 'DeepSeek V3 and R1 reasoning code models with unmatched coding benchmarks.',
    freeTier: 'Extremely cheap pricing / initial free credits',
    auth: 'apiKey',
    website: 'https://platform.deepseek.com',
    docs: 'https://platform.deepseek.com/docs',
    tags: ['DeepSeek V3', 'DeepSeek R1', 'SOTA Code'],
    popular: true
  },
  {
    id: 'codeium',
    name: 'Codeium',
    category: 'code',
    categoryLabel: 'Code Generation',
    description: 'Free AI code completion and chat extension for VS Code, JetBrains, and web.',
    freeTier: 'Free for individuals forever',
    auth: 'apiKey',
    website: 'https://codeium.com',
    docs: 'https://codeium.com/docs',
    tags: ['Free IDE Extension', 'Autocompletion', 'Multi-Language']
  },
  {
    id: 'hf-starcoder',
    name: 'StarCoder / CodeLlama (Hugging Face)',
    category: 'code',
    categoryLabel: 'Code Generation',
    description: 'StarCoder2 and CodeLlama hosted on Hugging Face free serverless API.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['StarCoder2', 'CodeLlama', 'Open Source']
  },
  {
    id: 'tabby-local',
    name: 'Tabby (Local)',
    category: 'code',
    categoryLabel: 'Code Generation',
    description: 'Self-hosted AI coding assistant alternative to GitHub Copilot.',
    freeTier: 'Unlimited (100% self-hosted)',
    auth: 'None',
    website: 'https://github.com/TabbyML/tabby',
    docs: 'https://tabby.tabbyml.com',
    tags: ['Copilot Alternative', 'Self-Hosted', 'Rust'],
    isLocal: true
  },

  // --- Search & RAG ---
  {
    id: 'tavily',
    name: 'Tavily Search API',
    category: 'search',
    categoryLabel: 'Search & RAG',
    description: 'Search engine designed specifically for AI agents and RAG web retrieval.',
    freeTier: '1,000 search queries/month free',
    auth: 'apiKey',
    website: 'https://tavily.com',
    docs: 'https://docs.tavily.com',
    tags: ['AI Search', 'Agent RAG', '1,000 Queries/Mo'],
    popular: true
  },
  {
    id: 'exa-ai',
    name: 'Exa (Metaphor)',
    category: 'search',
    categoryLabel: 'Search & RAG',
    description: 'Neural embedding search engine that finds pages by semantic meaning.',
    freeTier: '1,000 searches/month free',
    auth: 'apiKey',
    website: 'https://exa.ai',
    docs: 'https://docs.exa.ai',
    tags: ['Neural Search', 'Semantic Search', 'RAG'],
    popular: true
  },
  {
    id: 'brave-search',
    name: 'Brave Search API',
    category: 'search',
    categoryLabel: 'Search & RAG',
    description: 'Independent, privacy-first web index search API for developers.',
    freeTier: '2,000 queries/month free',
    auth: 'apiKey',
    website: 'https://brave.com/search/api/',
    docs: 'https://api.search.brave.com/app/documentation/',
    tags: ['Privacy Search', 'Independent Index', '2,000 Free Queries']
  },
  {
    id: 'serpapi',
    name: 'SerpApi',
    category: 'search',
    categoryLabel: 'Search & RAG',
    description: 'Real-time search engine result scraper for Google, Bing, DuckDuckGo, and Yahoo.',
    freeTier: '100 searches/month free',
    auth: 'apiKey',
    website: 'https://serpapi.com',
    docs: 'https://serpapi.com/docs',
    tags: ['Google Scraping', 'SERP', 'JSON Data']
  },
  {
    id: 'searxng-local',
    name: 'SearXNG (Local)',
    category: 'search',
    categoryLabel: 'Search & RAG',
    description: 'Free internet metasearch engine which aggregates results from 70+ search services.',
    freeTier: 'Unlimited (100% self-hosted)',
    auth: 'None',
    website: 'https://github.com/searxng/searxng',
    docs: 'https://docs.searxng.org',
    tags: ['Self-Hosted Search', 'Metasearch', 'Privacy'],
    isLocal: true
  },

  // --- Moderation & Safety ---
  {
    id: 'openai-moderation',
    name: 'OpenAI Moderation API',
    category: 'moderation',
    categoryLabel: 'Moderation & Safety',
    description: 'Check content against OpenAI usage policies (hate, self-harm, sexual, violence).',
    freeTier: '100% Free and unlimited for all developers',
    auth: 'apiKey',
    website: 'https://platform.openai.com',
    docs: 'https://platform.openai.com/docs/guides/moderation',
    tags: ['100% Free', 'Toxicity Check', 'Safety Guardrail'],
    popular: true
  },
  {
    id: 'perspective-api',
    name: 'Perspective API (Jigsaw / Google)',
    category: 'moderation',
    categoryLabel: 'Moderation & Safety',
    description: 'Machine learning API to identify toxic comments, insult, profanity, and threat.',
    freeTier: 'Free (rate-limited to 1 QPS)',
    auth: 'apiKey',
    website: 'https://perspectiveapi.com',
    docs: 'https://developers.perspectiveapi.com',
    tags: ['Google Jigsaw', 'Toxicity Score', 'Comment Moderation']
  },
  {
    id: 'hf-moderation',
    name: 'Hugging Face Guard Models',
    category: 'moderation',
    categoryLabel: 'Moderation & Safety',
    description: 'Llama-Guard, Toxic-BERT, and sentiment analysis models via inference endpoint.',
    freeTier: 'Free Serverless Inference API',
    auth: 'apiKey',
    website: 'https://huggingface.co',
    docs: 'https://huggingface.co/docs/api-inference',
    tags: ['Llama Guard', 'Toxic-BERT', 'Open Source']
  },
  {
    id: 'llm-guard-local',
    name: 'LLM Guard (Protect AI)',
    category: 'moderation',
    categoryLabel: 'Moderation & Safety',
    description: 'Toolkit to sanitize inputs, detect prompt injections, and redact sensitive PII.',
    freeTier: 'Unlimited (100% open source)',
    auth: 'None',
    website: 'https://github.com/protectai/llm-guard',
    docs: 'https://llm-guard.com',
    tags: ['Prompt Injection Defense', 'PII Redaction', 'Python Local'],
    isLocal: true
  },

  // --- Model Hosting & Inference ---
  {
    id: 'hf-spaces',
    name: 'Hugging Face Spaces',
    category: 'hosting',
    categoryLabel: 'Model Hosting & Inference',
    description: 'Host, share, and deploy Gradio, Streamlit, or Docker AI applications.',
    freeTier: 'Free CPU basic instances forever',
    auth: 'None',
    website: 'https://huggingface.co/spaces',
    docs: 'https://huggingface.co/docs/hub/spaces',
    tags: ['Free Hosting', 'Gradio', 'Streamlit', 'Docker'],
    popular: true
  },
  {
    id: 'replicate-hosting',
    name: 'Replicate Model Hosting',
    category: 'hosting',
    categoryLabel: 'Model Hosting & Inference',
    description: 'Deploy custom Cog/Docker containers on serverless GPU clusters with auto-scale.',
    freeTier: '$5 free trial credit',
    auth: 'apiKey',
    website: 'https://replicate.com',
    docs: 'https://replicate.com/docs',
    tags: ['Serverless GPU', 'Custom Models', 'Auto-scaling']
  },
  {
    id: 'google-colab',
    name: 'Google Colab',
    category: 'hosting',
    categoryLabel: 'Model Hosting & Inference',
    description: 'Free cloud Jupyter notebook environment with T4 GPU acceleration.',
    freeTier: 'Free NVIDIA T4 GPU access',
    auth: 'OAuth',
    website: 'https://colab.research.google.com',
    docs: 'https://colab.research.google.com',
    tags: ['Free GPU', 'Jupyter Notebook', 'Google Cloud'],
    popular: true
  },
  {
    id: 'kaggle-notebooks',
    name: 'Kaggle Notebooks',
    category: 'hosting',
    categoryLabel: 'Model Hosting & Inference',
    description: 'Free cloud data science environment with P100 or T4 GPU access.',
    freeTier: '30 hours/week of free GPU compute',
    auth: 'OAuth',
    website: 'https://kaggle.com',
    docs: 'https://www.kaggle.com/docs',
    tags: ['30h GPU/Week', 'NVIDIA P100', 'Data Science']
  },
  {
    id: 'lightning-ai',
    name: 'Lightning AI Studios',
    category: 'hosting',
    categoryLabel: 'Model Hosting & Inference',
    description: 'Cloud dev environment for training, finetuning, and deploying AI models.',
    freeTier: '22 free GPU credits every month',
    auth: 'OAuth',
    website: 'https://lightning.ai',
    docs: 'https://lightning.ai/docs',
    tags: ['22 Free GPU Credits', 'PyTorch Lightning', 'Cloud Studio']
  },

  // --- Multi-Modal Aggregators ---
  {
    id: 'openrouter-agg',
    name: 'OpenRouter Unified Gateway',
    category: 'aggregators',
    categoryLabel: 'Multi-Modal Aggregators',
    description: 'One OpenAI-compatible endpoint to access 100+ models from OpenAI, Anthropic, Google, and Meta.',
    freeTier: 'Dozens of 100% free models included',
    auth: 'apiKey',
    website: 'https://openrouter.ai',
    docs: 'https://openrouter.ai/docs',
    tags: ['Unified Endpoint', 'OpenAI Compatible', '100+ Models'],
    popular: true
  },
  {
    id: 'aiml-api-agg',
    name: 'AIML API Gateway',
    category: 'aggregators',
    categoryLabel: 'Multi-Modal Aggregators',
    description: 'Single API key access to over 200 models spanning text, voice, vision, and video.',
    freeTier: 'Free tier trial credits',
    auth: 'apiKey',
    website: 'https://aimlapi.com',
    docs: 'https://docs.aimlapi.com',
    tags: ['200+ Models', 'Text + Vision + Voice', 'Unified Billing']
  },
  {
    id: 'litellm-proxy',
    name: 'LiteLLM Proxy',
    category: 'aggregators',
    categoryLabel: 'Multi-Modal Aggregators',
    description: 'Open-source proxy server translating 100+ LLM APIs into standardized OpenAI format.',
    freeTier: 'Unlimited (100% open source & self-hosted)',
    auth: 'None',
    website: 'https://docs.litellm.ai',
    docs: 'https://docs.litellm.ai',
    tags: ['Open Source Proxy', 'Load Balancing', 'Cost Tracking'],
    isLocal: true
  },
  {
    id: 'puter-agg',
    name: 'Puter AI Gateway',
    category: 'aggregators',
    categoryLabel: 'Multi-Modal Aggregators',
    description: 'Zero-setup browser AI SDK connecting directly to LLM generation without server keys.',
    freeTier: '100% Free, no credit card or account needed',
    auth: 'None',
    website: 'https://puter.com',
    docs: 'https://developer.puter.com',
    tags: ['In-Browser SDK', 'Zero Auth', 'Free']
  }
];
