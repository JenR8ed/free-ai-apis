import React from 'react';
import { 
  Zap, 
  Search, 
  Layers, 
  Play, 
  GitFork, 
  Star, 
  PlusCircle, 
  Heart,
  Scale
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  onOpenStackBuilder: () => void;
  onOpenCompare: () => void;
  onOpenPlayground: () => void;
  onOpenSubmit: () => void;
  totalApisCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  favoritesCount,
  showFavoritesOnly,
  setShowFavoritesOnly,
  onOpenStackBuilder,
  onOpenCompare,
  onOpenPlayground,
  onOpenSubmit,
  totalApisCount
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xl">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">Free AI APIs</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  {totalApisCount}+ Listed
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">No Credit Card Required • Build AI Apps for $0</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search APIs, features, models (e.g. Gemini, Groq, Whisper)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* $0 Stack Builder */}
            <button
              onClick={onOpenStackBuilder}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 transition shadow-sm"
              title="Build your $0 Tech Stack"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">$0 Stack Builder</span>
            </button>

            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-violet-300 border border-violet-500/30 transition shadow-sm"
              title="Compare APIs Side-by-Side"
            >
              <Scale className="w-3.5 h-3.5 text-violet-400" />
              <span className="hidden md:inline">Compare</span>
            </button>

            {/* Live Playground */}
            <button
              onClick={onOpenPlayground}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110 transition shadow-md shadow-emerald-500/20"
              title="Test Free APIs in Browser"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Playground</span>
            </button>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                showFavoritesOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-rose-400 fill-rose-400' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              {favoritesCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Submit API */}
            <button
              onClick={onOpenSubmit}
              className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition"
              title="Submit a Free API"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
