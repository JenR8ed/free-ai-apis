import React from 'react';
import { Sparkles, ShieldCheck, Terminal, Cpu, Zap, ArrowRight } from 'lucide-react';
import { AuthType } from '../types';

interface StatsBannerProps {
  onQuickFilter: (authFilter: AuthType | 'all' | 'local') => void;
  selectedAuthFilter: AuthType | 'all' | 'local';
  onOpenStackBuilder: () => void;
  onOpenPlayground: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  onQuickFilter,
  selectedAuthFilter,
  onOpenStackBuilder,
  onOpenPlayground
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 p-6 sm:p-8 mb-8 shadow-xl">
      {/* Background Accent Mesh */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Headline */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Updated March 2026 • Curated Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Build Production AI Applications for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400">$0 / Month</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A comprehensive list of free AI APIs for LLMs, Image Synthesis, Speech, Vision, Search, and Code. Zero credit card barriers.
          </p>

          {/* Quick Filter Pill Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => onQuickFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedAuthFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All APIs
            </button>
            <button
              onClick={() => onQuickFilter('None')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedAuthFilter === 'None'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Auth / No Key Needed</span>
            </button>
            <button
              onClick={() => onQuickFilter('local')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedAuthFilter === 'local'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/40'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>100% Local & Offline</span>
            </button>
          </div>
        </div>

        {/* Right Feature Highlights Cards */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
          <button
            onClick={onOpenStackBuilder}
            className="flex flex-col p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition">
                <Zap className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Interactive Stack Builder</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Combine free quotas</span>
          </button>

          <button
            onClick={onOpenPlayground}
            className="flex flex-col p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition">
                <Terminal className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Live API Tester</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Run queries in browser</span>
          </button>
        </div>

      </div>
    </div>
  );
};
