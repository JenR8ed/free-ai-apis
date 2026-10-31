import React, { useState, useEffect, useMemo } from 'react';
import { ALL_APIS } from './data/apiData';
import { ApiItem, CategoryKey, AuthType, SortOption } from './types';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { SidebarFilter } from './components/SidebarFilter';
import { ApiCard } from './components/ApiCard';
import { ApiDetailModal } from './components/ApiDetailModal';
import { PlaygroundModal } from './components/PlaygroundModal';
import { StackBuilderModal } from './components/StackBuilderModal';
import { CompareModal } from './components/CompareModal';
import { SubmitApiModal } from './components/SubmitApiModal';
import { Sparkles, Heart, Search, Scale, Layers } from 'lucide-react';

export function App() {
  // Directory state
  const [apiList, setApiList] = useState<ApiItem[]>(ALL_APIS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [selectedAuth, setSelectedAuth] = useState<AuthType | 'all' | 'local'>('all');
  const [popularOnly, setPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Favorites state persisted in LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('free_ai_apis_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('free_ai_apis_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Compared APIs
  const [comparedApiIds, setComparedApiIds] = useState<string[]>([]);

  // Modals state
  const [selectedDetailApi, setSelectedDetailApi] = useState<ApiItem | null>(null);
  const [playgroundApi, setPlaygroundApi] = useState<ApiItem | null>(null);
  const [isStackBuilderOpen, setIsStackBuilderOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Toggle comparison
  const handleToggleCompare = (api: ApiItem) => {
    setComparedApiIds(prev => 
      prev.includes(api.id) ? prev.filter(id => id !== api.id) : [...prev, api.id]
    );
  };

  // Quick reset filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedAuth('all');
    setPopularOnly(false);
    setSearchQuery('');
    setShowFavoritesOnly(false);
  };

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apiList.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [apiList]);

  // Filter & Sort Logic
  const filteredApis = useMemo(() => {
    return apiList.filter(api => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = api.name.toLowerCase().includes(q);
        const matchesDesc = api.description.toLowerCase().includes(q);
        const matchesFreeTier = api.freeTier.toLowerCase().includes(q);
        const matchesCat = api.categoryLabel.toLowerCase().includes(q);
        const matchesTags = api.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesFreeTier && !matchesCat && !matchesTags) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && api.category !== selectedCategory) {
        return false;
      }

      // Auth
      if (selectedAuth === 'local') {
        if (!api.isLocal) return false;
      } else if (selectedAuth !== 'all') {
        if (api.auth !== selectedAuth) return false;
      }

      // Popular
      if (popularOnly && !api.popular) {
        return false;
      }

      // Saved Favorites
      if (showFavoritesOnly && !favorites.includes(api.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'category') return a.categoryLabel.localeCompare(b.categoryLabel);
      // 'featured': popular first, then alphabetically
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [apiList, searchQuery, selectedCategory, selectedAuth, popularOnly, showFavoritesOnly, favorites, sortBy]);

  // Compared Api Objects
  const comparedApiObjects = useMemo(() => {
    return apiList.filter(a => comparedApiIds.includes(a.id));
  }, [apiList, comparedApiIds]);

  const handleAddNewApi = (newApi: ApiItem) => {
    setApiList(prev => [newApi, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header Navigation */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        onOpenStackBuilder={() => setIsStackBuilderOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenPlayground={() => setPlaygroundApi(apiList.find(a => a.playgroundSupported) || apiList[0])}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        totalApisCount={apiList.length}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Banner with Quick Filters & Feature CTAs */}
        <StatsBanner
          onQuickFilter={(auth) => setSelectedAuth(auth)}
          selectedAuthFilter={selectedAuth}
          onOpenStackBuilder={() => setIsStackBuilderOpen(true)}
          onOpenPlayground={() => setPlaygroundApi(apiList.find(a => a.playgroundSupported) || apiList[0])}
        />

        {/* Directory Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Filter Control Panel */}
          <SidebarFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedAuth={selectedAuth}
            setSelectedAuth={setSelectedAuth}
            popularOnly={popularOnly}
            setPopularOnly={setPopularOnly}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categoryCounts={categoryCounts}
            totalCount={apiList.length}
            onReset={handleResetFilters}
          />

          {/* Main API Card List Viewport */}
          <div className="flex-1 w-full space-y-4">
            
            {/* Results Count & Filter Status Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">
                  Showing {filteredApis.length} {filteredApis.length === 1 ? 'API' : 'APIs'}
                </span>
                {showFavoritesOnly && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
                    Saved Favorites
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                    Category Filtered
                  </span>
                )}
              </div>

              {comparedApiIds.length > 0 && (
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold transition shadow-sm"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare ({comparedApiIds.length})</span>
                </button>
              )}
            </div>

            {/* Empty State when no APIs match */}
            {filteredApis.length === 0 ? (
              <div className="py-16 text-center space-y-4 rounded-2xl bg-slate-900/50 border border-slate-800 p-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">No Free AI APIs Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  No services match your active query or filters. Try adjusting your search term or clearing active filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* API Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                {filteredApis.map(api => (
                  <ApiCard
                    key={api.id}
                    api={api}
                    isFavorite={favorites.includes(api.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDetail={(item) => setSelectedDetailApi(item)}
                    onOpenPlayground={(item) => setPlaygroundApi(item)}
                    isCompared={comparedApiIds.includes(api.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Free AI APIs</span>
            <span>• CC0 1.0 Universal Public Domain License</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSubmitOpen(true)}
              className="hover:text-indigo-400 transition"
            >
              Submit an API
            </button>
            <button 
              onClick={() => setIsStackBuilderOpen(true)}
              className="hover:text-indigo-400 transition"
            >
              $0 Tech Stack
            </button>
            <a 
              href="https://aistudio.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              Google AI Studio
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiDetailModal
        api={selectedDetailApi}
        onClose={() => setSelectedDetailApi(null)}
        onOpenPlayground={(api) => setPlaygroundApi(api)}
      />

      <PlaygroundModal
        api={playgroundApi}
        onClose={() => setPlaygroundApi(null)}
      />

      <StackBuilderModal
        isOpen={isStackBuilderOpen}
        onClose={() => setIsStackBuilderOpen(false)}
      />

      <CompareModal
        comparedApis={comparedApiObjects}
        onRemoveCompare={(id) => setComparedApiIds(prev => prev.filter(i => i !== id))}
        onClearAll={() => setComparedApiIds([])}
        onClose={() => setIsCompareOpen(false)}
        onOpenDetail={(api) => {
          setIsCompareOpen(false);
          setSelectedDetailApi(api);
        }}
      />

      <SubmitApiModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmitSuccess={handleAddNewApi}
      />

    </div>
  );
}

export default App;
