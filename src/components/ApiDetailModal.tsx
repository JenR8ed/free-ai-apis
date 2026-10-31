import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  BookOpen, 
  Terminal, 
  Key, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Globe,
  Cpu
} from 'lucide-react';
import { ApiItem } from '../types';

interface ApiDetailModalProps {
  api: ApiItem | null;
  onClose: () => void;
  onOpenPlayground: (api: ApiItem) => void;
}

export const ApiDetailModal: React.FC<ApiDetailModalProps> = ({
  api,
  onClose,
  onOpenPlayground
}) => {
  const [activeTab, setActiveTab] = useState<'curl' | 'javascript' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  if (!api) return null;

  // Generate fallback sample code if not present
  const getCode = (lang: 'curl' | 'javascript' | 'python') => {
    if (api.sampleCode && api.sampleCode[lang]) {
      return api.sampleCode[lang];
    }
    
    // Default dynamic snippet generator based on auth and endpoint
    if (lang === 'curl') {
      return api.auth === 'apiKey'
        ? `curl "${api.website}" \\\n  -H "Authorization: Bearer $YOUR_API_KEY" \\\n  -H "Content-Type: application/json"`
        : `curl "${api.website}"`;
    } else if (lang === 'javascript') {
      return api.auth === 'apiKey'
        ? `// Standard JavaScript Fetch with API Key\nconst response = await fetch('${api.website}', {\n  headers: {\n    'Authorization': 'Bearer ' + process.env.API_KEY,\n    'Content-Type': 'application/json'\n  }\n});\nconst data = await response.json();`
        : `// Zero Auth Client Request\nconst response = await fetch('${api.website}');\nconst data = await response.json();`;
    } else {
      return api.auth === 'apiKey'
        ? `# Python requests example\nimport os\nimport requests\n\nresponse = requests.get(\n    '${api.website}',\n    headers={'Authorization': f"Bearer {os.getenv('API_KEY')}"}\n)\nprint(response.json())`
        : `# Python requests example\nimport requests\n\nresponse = requests.get('${api.website}')\nprint(response.json())`;
    }
  };

  const handleCopy = () => {
    const code = getCode(activeTab);
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {api.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 font-medium">ID: {api.id}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
              {api.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Free Tier Info */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Free Tier Allowance</span>
              </div>
              <p className="text-emerald-100 text-sm font-semibold">{api.freeTier}</p>
            </div>

            {/* Auth Requirements */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider mb-1">
                <Key className="w-4 h-4 text-amber-400" />
                <span>Authentication Method</span>
              </div>
              <p className="text-slate-100 text-sm font-semibold flex items-center gap-2">
                {api.isLocal ? (
                  <>
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>None Required (Local Engine)</span>
                  </>
                ) : api.auth === 'None' ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Zero Auth / No Key Needed</span>
                  </>
                ) : api.auth === 'OAuth' ? (
                  <>
                    <Globe className="w-4 h-4 text-violet-400" />
                    <span>OAuth 2.0 Login</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>API Key (`apiKey`)</span>
                  </>
                )}
              </p>
            </div>

          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-200 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {api.description}
            </p>
          </div>

          {/* Code Snippets Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Integration Code Snippet</span>
              </div>

              {/* Language Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'curl' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveTab('javascript')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'javascript' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Node.js / JS
                </button>
                <button
                  onClick={() => setActiveTab('python')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Python
                </button>
              </div>
            </div>

            {/* Code Viewport */}
            <div className="relative group rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 text-xs text-slate-400">
                <span className="font-mono text-[11px]">
                  {activeTab === 'curl' ? 'terminal.sh' : activeTab === 'javascript' ? 'index.js' : 'app.py'}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 text-xs font-mono text-indigo-200 overflow-x-auto whitespace-pre leading-relaxed">
                {getCode(activeTab)}
              </pre>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {api.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <a
              href={api.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Official Website</span>
            </a>
            <a
              href={api.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>API Documentation</span>
            </a>
          </div>

          {api.playgroundSupported && (
            <button
              onClick={() => {
                onClose();
                onOpenPlayground(api);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-500/20"
            >
              <Terminal className="w-4 h-4" />
              <span>Test in Playground</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
