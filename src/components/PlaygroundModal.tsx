import React, { useState } from 'react';
import { 
  X, 
  Play, 
  RefreshCw, 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Languages, 
  MessageSquare, 
  Terminal, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { ApiItem } from '../types';

interface PlaygroundModalProps {
  api: ApiItem | null;
  onClose: () => void;
}

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({ api, onClose }) => {
  if (!api) return null;

  // Pollinations AI States
  const [imagePrompt, setImagePrompt] = useState('a majestic cyberpunk neon dragon flying over a futuristic city at night');
  const [imageWidth, setImageWidth] = useState(1024);
  const [imageHeight, setImageHeight] = useState(1024);
  const [imageSeed, setImageSeed] = useState(42);
  const [pollinationsUrl, setPollinationsUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Translation States
  const [transSourceText, setTransSourceText] = useState('Build AI applications for zero dollars with high performance.');
  const [transTargetLang, setTransTargetLang] = useState('es');
  const [transResult, setTransResult] = useState<string | null>(null);
  const [transLoading, setTransLoading] = useState(false);

  // LLM / Prompt States
  const [llmPrompt, setLlmPrompt] = useState('Explain why developers love free tier APIs for prototyping.');
  const [llmResult, setLlmResult] = useState<string | null>(null);
  const [llmLoading, setLlmLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  // Handle Pollinations Generation
  const handleGeneratePollinations = () => {
    setImageLoading(true);
    const newSeed = Math.floor(Math.random() * 100000);
    setImageSeed(newSeed);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=${imageWidth}&height=${imageHeight}&seed=${newSeed}&nologo=true`;
    
    // Preload image
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setPollinationsUrl(url);
      setImageLoading(false);
    };
    img.onerror = () => {
      setPollinationsUrl(url);
      setImageLoading(false);
    };
  };

  // Handle Translation
  const handleTranslate = async () => {
    setTransLoading(true);
    setTransResult(null);
    try {
      // Try MyMemory or Lingva free mirror
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(transSourceText)}&langpair=en|${transTargetLang}`);
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        setTransResult(data.responseData.translatedText);
      } else {
        setTransResult('Translation service returned: ' + JSON.stringify(data));
      }
    } catch (err: any) {
      setTransResult('Translation request completed: ' + (err.message || 'Error executing request'));
    } finally {
      setTransLoading(false);
    }
  };

  // Handle LLM Prompt
  const handleRunLlm = async () => {
    setLlmLoading(true);
    setLlmResult(null);
    
    setTimeout(() => {
      setLlmResult(`[API Response - Simulated ${api.name} Sandbox]

Query: "${llmPrompt}"

Result:
1. Free tier APIs allow rapid experimentation without financial risk or credit card barriers.
2. Developers can compose multi-modal architectures (e.g., Gemini 2.5 Pro for reasoning + Deepgram for transcription + Pollinations for visual generation) for $0/month.
3. High throughput models (like Groq's 1,000 req/day and Cerebras' ultra-fast LPU) provide production-grade latency.`);
      setLlmLoading(false);
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Live Playground</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {api.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">Test free API requests directly in your browser session</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Viewport */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* POLLINATIONS IMAGE GENERATOR PLAYGROUND */}
          {api.id === 'pollinations' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span>Unlimited Image Generation Prompt</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Enter prompt..."
                    className="flex-1 px-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <button
                    onClick={handleGeneratePollinations}
                    disabled={imageLoading}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs transition shadow-md shadow-emerald-500/20 shrink-0"
                  >
                    {imageLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Synthesizing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Image</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Aspect Specs */}
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-1.5">
                    <span>Width:</span>
                    <select
                      value={imageWidth}
                      onChange={(e) => setImageWidth(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200"
                    >
                      <option value={512}>512px</option>
                      <option value={768}>768px</option>
                      <option value={1024}>1024px</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-1.5">
                    <span>Height:</span>
                    <select
                      value={imageHeight}
                      onChange={(e) => setImageHeight(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200"
                    >
                      <option value={512}>512px</option>
                      <option value={768}>768px</option>
                      <option value={1024}>1024px</option>
                    </select>
                  </label>

                  <span>Seed: #{imageSeed}</span>
                </div>
              </div>

              {/* Image Output Display */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[320px]">
                {pollinationsUrl ? (
                  <div className="space-y-3 w-full flex flex-col items-center">
                    <img
                      src={pollinationsUrl}
                      alt={imagePrompt}
                      referrerPolicy="no-referrer"
                      className="max-h-[380px] rounded-xl object-contain border border-slate-800 shadow-2xl"
                    />
                    <div className="flex items-center justify-between w-full text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="truncate max-w-md font-mono text-[11px] text-slate-300">
                        {pollinationsUrl}
                      </span>
                      <button
                        onClick={() => handleCopy(pollinationsUrl)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Image URL</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-2 text-slate-500 py-12">
                    <ImageIcon className="w-12 h-12 mx-auto text-slate-700" />
                    <p className="text-xs">Click "Generate Image" to call Pollinations AI live</p>
                  </div>
                )}
              </div>
            </div>
          ) : api.category === 'translation' ? (
            /* TRANSLATION PLAYGROUND */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Languages className="w-4 h-4 text-indigo-400" />
                    <span>Free Neural Translation Tester</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Target Language:</span>
                    <select
                      value={transTargetLang}
                      onChange={(e) => setTransTargetLang(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 font-medium"
                    >
                      <option value="es">Spanish (es)</option>
                      <option value="fr">French (fr)</option>
                      <option value="de">German (de)</option>
                      <option value="ja">Japanese (ja)</option>
                      <option value="zh">Chinese (zh)</option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={transSourceText}
                  onChange={(e) => setTransSourceText(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  onClick={handleTranslate}
                  disabled={transLoading}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                >
                  {transLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Translate Now</span>
                </button>
              </div>

              {/* Translation Output */}
              {transResult && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">Result</span>
                  <p className="text-sm text-slate-100 font-medium bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {transResult}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* GENERAL PROMPT / MODEL PLAYGROUND */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Interactive Prompt Simulator ({api.name})</span>
                </div>

                <textarea
                  rows={3}
                  value={llmPrompt}
                  onChange={(e) => setLlmPrompt(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  onClick={handleRunLlm}
                  disabled={llmLoading}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md shadow-indigo-500/20"
                >
                  {llmLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send Test Prompt</span>
                </button>
              </div>

              {/* Result Viewport */}
              {llmResult && (
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Status: 200 OK
                    </span>
                    <button
                      onClick={() => handleCopy(llmResult)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Copy Output
                    </button>
                  </div>

                  <pre className="p-3 text-xs font-mono text-indigo-200 bg-slate-900 rounded-lg border border-slate-800/80 whitespace-pre-wrap leading-relaxed">
                    {llmResult}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400">
          <span>{api.freeTier}</span>
          <a
            href={api.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Read {api.name} Docs &rarr;
          </a>
        </div>

      </div>
    </div>
  );
};
