import React from 'react';
import { 
  MessageSquareText, Image, Mic, Volume2, Binary, Eye, Video, Music, 
  Languages, FileText, Code, Search, ShieldAlert, Server, Layers,
  Filter, Key, ShieldCheck, Cpu, Star, RotateCcw
} from 'lucide-react';
import { CategoryKey, AuthType, SortOption } from '../types';
import { CATEGORIES } from '../data/apiData';

interface SidebarFilterProps {
  selectedCategory: CategoryKey | 'all';
  setSelectedCategory: (category: CategoryKey | 'all') => void;
  selectedAuth: AuthType | 'all' | 'local';
  setSelectedAuth: (auth: AuthType | 'all' | 'local') => void;
  popularOnly: boolean;
  setPopularOnly: (popular: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  onReset: () => void;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedAuth,
  setSelectedAuth,
  popularOnly,
  setPopularOnly,
  sortBy,
  setSortBy,
  categoryCounts,
  totalCount,
  onReset
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareText': return <MessageSquareText className="w-4 h-4" />;
      case 'Image': return <Image className="w-4 h-4" />;
      case 'Mic': return <Mic className="w-4 h-4" />;
      case 'Volume2': return <Volume2 className="w-4 h-4" />;
      case 'Binary': return <Binary className="w-4 h-4" />;
      case 'Eye': return <Eye className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Music': return <Music className="w-4 h-4" />;
      case 'Languages': return <Languages className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'Code': return <Code className="w-4 h-4" />;
      case 'Search': return <Search className="w-4 h-4" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedAuth !== 'all' || popularOnly;

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filter Directory</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sort Option */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="featured">Featured / Popular First</option>
          <option value="name-asc">Name (A - Z)</option>
          <option value="name-desc">Name (Z - A)</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* Authentication Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Authentication Mode
        </label>
        <div className="grid grid-cols-1 gap-1">
          <button
            onClick={() => setSelectedAuth('all')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
              selectedAuth === 'all'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              <span>All Auth Types</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedAuth('apiKey')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
              selectedAuth === 'apiKey'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>API Key (`apiKey`)</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedAuth('None')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
              selectedAuth === 'None'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Key / Zero Auth</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedAuth('local')}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
              selectedAuth === 'local'
                ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Local / Offline</span>
            </div>
          </button>
        </div>
      </div>

      {/* Featured / Popular Toggle */}
      <div>
        <button
          onClick={() => setPopularOnly(!popularOnly)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition border ${
            popularOnly
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Star className={`w-3.5 h-3.5 ${popularOnly ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>Featured APIs Only</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-500">Popular</span>
        </button>
      </div>

      {/* Category Navigation */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Categories
        </label>
        
        <div className="space-y-1">
          {/* All Categories */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-300" />
              <span>All Categories</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              selectedCategory === 'all' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {totalCount}
            </span>
          </button>

          {/* Category List */}
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.key] || 0;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isSelected
                    ? 'bg-indigo-600/90 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isSelected ? 'text-white' : 'text-slate-400'}>
                    {getCategoryIcon(cat.iconName)}
                  </span>
                  <span className="truncate">{cat.label}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] shrink-0 ${
                  isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800/80 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
