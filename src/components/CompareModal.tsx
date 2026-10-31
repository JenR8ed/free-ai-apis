import React from 'react';
import { X, Scale, ExternalLink, BookOpen, Key, ShieldCheck, Cpu, Zap, Trash2 } from 'lucide-react';
import { ApiItem } from '../types';

interface CompareModalProps {
  comparedApis: ApiItem[];
  onRemoveCompare: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
  onOpenDetail: (api: ApiItem) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  comparedApis,
  onRemoveCompare,
  onClearAll,
  onClose,
  onOpenDetail
}) => {
  if (comparedApis.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">No APIs Selected for Comparison</h2>
          <p className="text-xs text-slate-400">
            Click the "+" icon on any API card to compare specs, free tier quotas, and authentication requirements side-by-side.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Side-by-Side API Comparison</h2>
              <p className="text-xs text-slate-400">Comparing {comparedApis.length} free AI APIs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Comparison</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="p-6 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[700px]">
            {comparedApis.map((api) => (
              <div 
                key={api.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 relative group"
              >
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveCompare(api.id)}
                  className="absolute top-3 right-3 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition"
                  title="Remove from compare"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                      {api.categoryLabel}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{api.name}</h3>
                  </div>

                  {/* Free Tier */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Free Tier Allowance
                    </span>
                    <p className="text-xs font-semibold text-emerald-100">{api.freeTier}</p>
                  </div>

                  {/* Auth */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Authentication
                    </span>
                    <p className="text-xs font-semibold text-slate-200">
                      {api.isLocal ? 'Local Execution' : api.auth === 'None' ? 'Zero Auth / No Key' : api.auth}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {api.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {api.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-400 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <button
                  onClick={() => onOpenDetail(api)}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                >
                  View Full Specs & Code
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
