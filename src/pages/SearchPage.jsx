import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Utensils, Store, ShoppingBasket, Calendar } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { RestaurantCard } from '../components/food/RestaurantCard';
import { FoodItemCard } from '../components/food/FoodItemCard';
import { GroceryProductCard } from '../components/instamart/GroceryProductCard';
import { DiningRestaurantCard } from '../components/dineout/DiningRestaurantCard';
import { EmptyState } from '../components/common/EmptyState';
import { mockApi } from '../services/mockApi';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'restaurants' | 'dishes' | 'groceries' | 'dining'
  const [results, setResults] = useState({
    restaurants: [],
    dishes: [],
    groceries: [],
    dining: [],
  });
  const [loading, setLoading] = useState(false);

  const popularKeywords = [
    'Biryani',
    'Pizza',
    'Burger',
    'Rolls',
    'Momos',
    'Paneer',
    'Milk',
    'Cake',
    'Ice Cream',
    'Waffle',
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults({ restaurants: [], dishes: [], groceries: [], dining: [] });
      return;
    }

    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      mockApi.searchAll(query).then((data) => {
        if (!isMounted) return;
        setResults(data);
        setLoading(false);
      });
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  const handleSelectKeyword = (kw) => {
    setQuery(kw);
    setSearchParams({ q: kw });
  };

  const totalResultsCount =
    results.restaurants.length +
    results.dishes.length +
    results.groceries.length +
    results.dining.length;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchParams(e.target.value ? { q: e.target.value } : {});
              }}
              placeholder="Search for restaurants, dishes, groceries or dining venues..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-300 rounded-2xl text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 shadow-xs focus:outline-none focus:border-[#fc8019] focus:ring-4 focus:ring-orange-500/10 transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setSearchParams({});
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Popular Search Suggestions */}
          {!query && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleSelectKeyword(kw)}
                    className="px-3.5 py-1.5 bg-gray-50 hover:bg-orange-50 hover:text-[#fc8019] border border-gray-200 hover:border-orange-200 rounded-full text-xs font-semibold text-gray-700 transition-all cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tab switcher when query exists */}
        {query && (
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Results ({totalResultsCount})
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'dishes'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dishes ({results.dishes.length})
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'restaurants'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Restaurants ({results.restaurants.length})
            </button>
            <button
              onClick={() => setActiveTab('groceries')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'groceries'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Instamart Groceries ({results.groceries.length})
            </button>
            <button
              onClick={() => setActiveTab('dining')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'dining'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dineout Venues ({results.dining.length})
            </button>
          </div>
        )}

        {/* Results Container */}
        {query && (
          <div>
            {totalResultsCount === 0 && !loading ? (
              <EmptyState
                type="search"
                title={`No matches found for "${query}"`}
                description="Try checking for typos or searching for a broader term like 'Biryani', 'Pizza' or 'Milk'."
              />
            ) : (
              <div className="space-y-12">
                {/* Dishes Section */}
                {(activeTab === 'all' || activeTab === 'dishes') && results.dishes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#fc8019]" />
                      <span>Food Dishes ({results.dishes.length})</span>
                    </h3>
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 divide-y divide-gray-100">
                      {results.dishes.map((dish) => (
                        <FoodItemCard key={dish.id} item={dish} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Restaurants Section */}
                {(activeTab === 'all' || activeTab === 'restaurants') && results.restaurants.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Store className="w-4 h-4 text-[#fc8019]" />
                      <span>Restaurants ({results.restaurants.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {results.restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Groceries Section */}
                {(activeTab === 'all' || activeTab === 'groceries') && results.groceries.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                      <ShoppingBasket className="w-4 h-4 text-[#5a2c91]" />
                      <span>Instamart Instant Grocery ({results.groceries.length})</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {results.groceries.map((product) => (
                        <GroceryProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Dineout Section */}
                {(activeTab === 'all' || activeTab === 'dining') && results.dining.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#e43b4f]" />
                      <span>Dineout Restaurants ({results.dining.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.dining.map((dining) => (
                        <DiningRestaurantCard key={dining.id} restaurant={dining} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
