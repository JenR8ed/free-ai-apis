import React from 'react';
import { 
  ExternalLink, 
  BookOpen, 
  Heart, 
  Key, 
  ShieldCheck, 
  Cpu, 
  Play, 
  Star, 
  Code2, 
  Check, 
  Plus, 
  Zap,
  Globe
} from 'lucide-react';
import { ApiItem } from '../types';

interface ApiCardProps {
  api: ApiItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (api: ApiItem) => void;
  onOpenPlayground: (api: ApiItem) => void;
  isCompared: boolean;
  onToggleCompare: (api: ApiItem) => void;
}

export const ApiCard: React.FC<ApiCardProps> = ({
  api,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onOpenPlayground,
  isCompared,
  onToggleCompare
}) => {

  const renderAuthBadge = () => {
    if (api.isLocal) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          <Cpu className="w-3 h-3" />
          <span>Local / Offline</span>
        </span>
      );
    }
    if (api.auth === 'None') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>No Key Needed</span>
        </span>
      );
    }
    if (api.auth === 'OAuth') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
          <Globe className="w-3 h-3" />
          <span>OAuth Auth</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
        <Key className="w-3 h-3 text-amber-400" />
        <span>`apiKey`</span>
      </span>
    );
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900 transition-all duration-200 shadow-md hover:shadow-indigo-500/5">
      
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 
                onClick={() => onOpenDetail(api)}
                className="text-base font-bold text-white hover:text-indigo-400 transition cursor-pointer flex items-center gap-1.5"
              >
                {api.name}
                {api.popular && (
                  <span title="Popular & Highly Recommended">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </span>
                )}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                {api.categoryLabel}
              </span>
              {renderAuthBadge()}
            </div>
          </div>

          {/* Favorite & Compare Quick Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onToggleCompare(api)}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isCompared
                  ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Compare side-by-side'}
            >
              {isCompared ? <Check className="w-3.5 h-3.5 text-violet-400" /> : <Plus className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => onToggleFavorite(api.id)}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-rose-400 hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Remove from saved' : 'Save to favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Free Tier Highlight Box */}
        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 mb-3 flex items-start gap-2 text-xs">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-300">Free Tier: </span>
            <span className="text-emerald-100/90">{api.freeTier}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
          {api.description}
        </p>
      </div>

      {/* Bottom Footer Section */}
      <div className="space-y-3 pt-3 border-t border-slate-800/80">
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {api.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/90 text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetail(api)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold transition"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Specs & Code</span>
            </button>

            {api.playgroundSupported && (
              <button
                onClick={() => onOpenPlayground(api)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-medium transition"
                title="Test live in browser"
              >
                <Play className="w-3 h-3 fill-current text-emerald-400" />
                <span>Test Live</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={api.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Official Documentation"
            >
              <BookOpen className="w-4 h-4" />
            </a>
            <a
              href={api.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Official Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
