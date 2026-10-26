import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { InstamartHeader } from '../components/instamart/InstamartHeader';
import { GroceryCategoryGrid } from '../components/instamart/GroceryCategoryGrid';
import { GroceryProductCard } from '../components/instamart/GroceryProductCard';
import { ProductCardSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { FloatingCartBar } from '../components/cart/FloatingCartBar';
import { mockApi } from '../services/mockApi';

export const InstamartPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Fetch categories
  useEffect(() => {
    mockApi.getGroceryCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  // Fetch products
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    mockApi
      .getGroceryProducts({
        categoryId: selectedCategory,
        search: searchQuery,
        sortBy,
      })
      .then((data) => {
        if (!isMounted) return;
        setProducts(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, sortBy]);

  const promoBanners = [
    {
      id: 1,
      tag: 'SUPER SAVER',
      title: 'Fresh Store & Farm Picks',
      subtitle: 'Up to 50% off on fresh greens & fruits',
      bg: 'from-emerald-700 to-emerald-950',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      tag: 'INSTANT CRAVINGS',
      title: 'Midnight Munchies & Sodas',
      subtitle: 'Crisps, chocolates, chilled sodas in 4 mins',
      bg: 'from-purple-800 to-indigo-950',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      tag: 'DAIRY ESSENTIALS',
      title: 'Morning Milk, Bread & Eggs',
      subtitle: 'Farm fresh essentials at MRP discounts',
      bg: 'from-amber-700 to-orange-950',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      {/* Instamart Customized Sticky Header */}
      <InstamartHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full min-w-0">
        {/* Instamart Promotional Banners Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {promoBanners.map((banner) => (
            <div
              key={banner.id}
              className={`p-6 rounded-3xl bg-gradient-to-br ${banner.bg} text-white flex items-center justify-between shadow-md relative overflow-hidden group`}
            >
              <div className="z-10 max-w-[65%]">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {banner.tag}
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight mt-2 leading-snug">
                  {banner.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">
                  {banner.subtitle}
                </p>
              </div>
              <img
                src={banner.image}
                alt={banner.title}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              />
            </div>
          ))}
        </div>

        {/* Categories Bar */}
        <div className="mb-6">
          <GroceryCategoryGrid
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setSearchParams(catId === 'all' ? {} : { category: catId });
            }}
          />
        </div>

        {/* Sort and Filters bar */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
          <p className="text-sm font-bold text-gray-800">
            {selectedCategory === 'all'
              ? 'All Grocery Essentials'
              : categories.find((c) => c.id === selectedCategory)?.name || 'Groceries'}{' '}
            <span className="text-xs text-gray-400 font-normal">({products.length} items)</span>
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#5a2c91] cursor-pointer"
            >
              <option value="">Relevance</option>
              <option value="discount">Highest Discount</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-12">
            <EmptyState
              type="search"
              title="No products found"
              description="We could not find any grocery products matching your search."
              actionText="View All Groceries"
              onAction={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <GroceryProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Instamart Guarantee Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-purple-50 border border-purple-100 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#5a2c91] text-white flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Lightning Delivery</h4>
              <p className="text-xs text-gray-500">Groceries delivered in 4-10 minutes flat</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#5a2c91] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Freshness Guarantee</h4>
              <p className="text-xs text-gray-500">Quality-checked vegetables, dairy and fruits</p>
            </div>
          </div>
        </div>
      </main>
      <FloatingCartBar />
    </div>
  );
};
