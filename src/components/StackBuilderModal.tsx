import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Zap, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { ALL_APIS } from '../data/apiData';
import { ApiItem, CategoryKey } from '../types';

interface StackBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StackBuilderModal: React.FC<StackBuilderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Selected API for each key slot
  const [selectedStack, setSelectedStack] = useState<Record<string, string>>({
    llm: 'google-ai-studio',
    embeddings: 'voyage-ai',
    'speech-to-text': 'deepgram',
    'text-to-speech': 'elevenlabs',
    image: 'pollinations',
    search: 'tavily'
  });

  const [copiedCode, setCopiedCode] = useState(false);

  const slots: { key: CategoryKey; label: string; icon: string; description: string }[] = [
    { key: 'llm', label: '1. Reasoning Engine (LLM)', icon: '🧠', description: 'Chat, agent logic, structured output' },
    { key: 'embeddings', label: '2. Vector Embeddings (RAG)', icon: '📐', description: 'Semantic search & document indexing' },
    { key: 'speech-to-text', label: '3. Voice Transcription (STT)', icon: '🎙️', description: 'Audio to text transcriptions' },
    { key: 'text-to-speech', label: '4. Voice Synthesis (TTS)', icon: '🔊', description: 'Text to natural speech synthesis' },
    { key: 'image', label: '5. Visual Generator', icon: '🎨', description: 'Text-to-image or UI graphics' },
    { key: 'search', label: '6. Agent Web Search', icon: '🔍', description: 'Live web retrieval for grounding' }
  ];

  const handleSelect = (category: CategoryKey, apiId: string) => {
    setSelectedStack(prev => ({ ...prev, [category]: apiId }));
  };

  const getApiById = (id: string): ApiItem | undefined => {
    return ALL_APIS.find(a => a.id === id);
  };

  // Generate combined stack starter code
  const generateStackCode = () => {
    const llmApi = getApiById(selectedStack.llm);
    const embApi = getApiById(selectedStack.embeddings);
    const sttApi = getApiById(selectedStack.stt || selectedStack['speech-to-text']);
    const imgApi = getApiById(selectedStack.image);

    return `// ==========================================
// YOUR $0 PRODUCTION AI TECH STACK STARTER
// ==========================================
// 1. LLM Reasoning: ${llmApi?.name || 'Not selected'} (${llmApi?.freeTier || ''})
// 2. Embeddings: ${embApi?.name || 'Not selected'} (${embApi?.freeTier || ''})
// 3. Speech-to-Text: ${sttApi?.name || 'Not selected'} (${sttApi?.freeTier || ''})
// 4. Image Generation: ${imgApi?.name || 'Not selected'} (${imgApi?.freeTier || ''})
// ==========================================

import { GoogleGenAI } from "@google/genai";

// Environment Variables
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const DEEPGRAM_KEY = process.env.DEEPGRAM_API_KEY;

export async function runZeroDollarPipeline(prompt: string) {
  // 1. Generate Text Response with ${llmApi?.name}
  const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
  const textResult = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  // 2. Generate Image with Pollinations AI (Zero Auth)
  const imageUrl = \`https://image.pollinations.ai/prompt/\${encodeURIComponent(prompt)}?width=1024&height=1024\`;

  return {
    answer: textResult.text,
    visualArtifact: imageUrl,
    monthlyCost: "$0.00 USD"
  };
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateStackCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">$0 AI Tech Stack Architect</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Total Monthly Cost: $0.00
                </span>
              </div>
              <p className="text-xs text-slate-400">Select free tier providers to compose your complete full-stack AI pipeline</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Stack Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map(slot => {
              const apis = ALL_APIS.filter(a => a.category === slot.key);
              const currentSelectedId = selectedStack[slot.key];
              const selectedApi = getApiById(currentSelectedId);

              return (
                <div key={slot.key} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <span>{slot.icon}</span>
                        <span>{slot.label}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3">{slot.description}</p>

                    <select
                      value={currentSelectedId || ''}
                      onChange={(e) => handleSelect(slot.key, e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                      {apis.map(api => (
                        <option key={api.id} value={api.id}>
                          {api.name} ({api.auth === 'None' ? 'Zero Auth' : api.auth})
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedApi && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs">
                      <span className="font-bold text-emerald-400">Free Quota: </span>
                      <span className="text-emerald-200">{selectedApi.freeTier}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Generated Code Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Generated Stack Boilerplate Code</span>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied Boilerplate!' : 'Copy Stack Code'}</span>
              </button>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-indigo-200 overflow-x-auto">
              <pre className="whitespace-pre leading-relaxed">{generateStackCode()}</pre>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Free Forever for Prototyping</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Close Architect
          </button>
        </div>

      </div>
    </div>
  );
};
