import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Tag, Search, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { MenuCategory } from '../components/food/MenuCategory';
import { MenuDishSkeleton } from '../components/common/LoadingSkeleton';
import { mockApi } from '../services/mockApi';
import { OFFERS } from '../data/offers';
import { useToast } from '../context/ToastContext';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { showToast } = useToast();

  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters inside menu
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [isNonVegOnly, setIsNonVegOnly] = useState(false);
  const [isBestsellerOnly, setIsBestsellerOnly] = useState(false);
  const [dishSearch, setDishSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      mockApi.getRestaurantById(id),
      mockApi.getFoodItems(id),
    ]).then(([restData, itemsData]) => {
      if (!isMounted) return;
      setRestaurant(restData);
      setFoodItems(itemsData);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Group filtered items by category
  const categories = useMemo(() => {
    let filtered = [...foodItems];

    if (isVegOnly) {
      filtered = filtered.filter((i) => i.isVeg);
    } else if (isNonVegOnly) {
      filtered = filtered.filter((i) => !i.isVeg);
    }

    if (isBestsellerOnly) {
      filtered = filtered.filter((i) => i.isBestseller);
    }

    if (dishSearch.trim()) {
      const q = dishSearch.trim().toLowerCase();
      filtered = filtered.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }

    const grouped = {};
    filtered.forEach((item) => {
      const cat = item.category || 'Recommended';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    return grouped;
  }, [foodItems, isVegOnly, isNonVegOnly, isBestsellerOnly, dishSearch]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full h-48 bg-gray-200 rounded-3xl animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <MenuDishSkeleton key={i} />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Restaurant not found</h2>
          <p className="text-sm text-gray-500 mt-2">The restaurant you are looking for does not exist.</p>
          <Link
            to="/food"
            className="mt-6 inline-block px-6 py-3 bg-[#fc8019] text-white font-bold rounded-xl text-xs uppercase"
          >
            Back to Restaurants
          </Link>
        </div>
      </MainLayout>
    );
  }

  const faqs = [
    {
      q: `Does ${restaurant.name} deliver food online?`,
      a: `Yes, ${restaurant.name} delivers food online via Swiggy. You can order fresh dishes with doorstep delivery in ${restaurant.deliveryTime}.`,
    },
    {
      q: `What are the most popular dishes at ${restaurant.name}?`,
      a: `Popular dishes include ${foodItems.slice(0, 3).map((f) => f.name).join(', ')}.`,
    },
    {
      q: `Does ${restaurant.name} offer vegetarian options?`,
      a: `Yes! You can toggle the Pure Veg filter to browse all vegetarian options prepared with fresh ingredients.`,
    },
  ];

  return (
    <MainLayout>
      <div className="page-container py-5 sm:py-8 max-w-4xl w-full min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-500 mb-4 sm:mb-6 font-medium flex-wrap">
          <Link to="/" className="hover:text-[#fc8019] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link to="/food" className="hover:text-[#fc8019] transition-colors truncate max-w-[120px] sm:max-w-none">{restaurant.area || 'Bangalore'}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-bold truncate max-w-[150px] sm:max-w-none">{restaurant.name}</span>
        </nav>

        {/* Restaurant Header Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/70 p-4 sm:p-7 shadow-xs mb-6 w-full min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            {restaurant.name}
          </h1>

          <div className="mt-3.5 sm:mt-4 p-3.5 sm:p-4 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800 flex-wrap">
                <div className="w-5 h-5 rounded-full bg-[#22a159] text-white flex items-center justify-center shrink-0">
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span>{restaurant.rating} ({restaurant.totalRatings} ratings)</span>
                <span className="text-gray-400">•</span>
                <span>{restaurant.costForTwoString}</span>
              </div>

              <p className="text-xs font-semibold text-[#fc8019] mt-2 truncate">
                {restaurant.cuisines?.join(', ')}
              </p>

              <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-500 font-medium mt-2 flex-wrap">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  Outlet: {restaurant.outlet || restaurant.area}
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  {restaurant.deliveryTime}
                </span>
              </div>
            </div>

            {restaurant.image && (
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-2xs shrink-0"
              />
            )}
          </div>
        </div>

        {/* Deals / Offers Carousel */}
        <div className="mb-6 sm:mb-8 w-full min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#fc8019]" />
            <span>Deals For You</span>
          </p>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 w-full min-w-0">
            {OFFERS.slice(0, 4).map((deal) => (
              <div
                key={deal.code}
                onClick={() => {
                  navigator.clipboard?.writeText(deal.code);
                  showToast(`Coupon code ${deal.code} copied!`);
                }}
                className="shrink-0 p-3 sm:p-3.5 bg-white border border-gray-200 rounded-2xl flex items-center gap-3 hover:border-[#fc8019] hover:bg-orange-50/20 transition-all cursor-pointer group min-w-[190px] sm:min-w-[220px]"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 text-[#fc8019] font-black text-xs flex items-center justify-center shrink-0">
                  %
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-gray-800 tracking-tight group-hover:text-[#fc8019] truncate">
                    {deal.title}
                  </p>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    USE {deal.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Search and Veg/Non-Veg Filter Toggles */}
        <div className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md py-3 sm:py-4 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 mb-6 w-full min-w-0">
          {/* Search inside menu */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={dishSearch}
              onChange={(e) => setDishSearch(e.target.value)}
              placeholder="Search for dishes..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#fc8019]"
            />
          </div>

          {/* Filters pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 py-0.5">
            {/* Veg toggle */}
            <button
              type="button"
              onClick={() => {
                setIsVegOnly(!isVegOnly);
                if (!isVegOnly) setIsNonVegOnly(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shrink-0 ${
                isVegOnly
                  ? 'border-[#0f8a65] bg-emerald-50 text-[#0f8a65]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="w-3 h-3 border border-[#0f8a65] rounded-xs flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0f8a65]" />
              </div>
              <span>Veg</span>
            </button>

            {/* Non-Veg toggle */}
            <button
              type="button"
              onClick={() => {
                setIsNonVegOnly(!isNonVegOnly);
                if (!isNonVegOnly) setIsVegOnly(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shrink-0 ${
                isNonVegOnly
                  ? 'border-[#e43b4f] bg-rose-50 text-[#e43b4f]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="w-3 h-3 border border-[#e43b4f] rounded-xs flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e43b4f]" />
              </div>
              <span>Non-Veg</span>
            </button>

            {/* Bestseller filter */}
            <button
              type="button"
              onClick={() => setIsBestsellerOnly(!isBestsellerOnly)}
              className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shrink-0 ${
                isBestsellerOnly
                  ? 'border-[#fc8019] bg-orange-50 text-[#fc8019]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              Bestseller
            </button>
          </div>
        </div>

        {/* Menu Categories and Dishes */}
        <div className="space-y-4">
          {Object.keys(categories).length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-sm">No dishes found matching your current filter.</p>
              <button
                onClick={() => {
                  setIsVegOnly(false);
                  setIsNonVegOnly(false);
                  setIsBestsellerOnly(false);
                  setDishSearch('');
                }}
                className="mt-3 text-[#fc8019] text-xs font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            Object.entries(categories).map(([catName, items], index) => (
              <MenuCategory
                key={catName}
                title={catName}
                items={items}
                restaurant={restaurant}
                defaultOpen={index === 0 || index === 1}
              />
            ))
          )}
        </div>

        {/* FAQs Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            FAQs about {restaurant.name}
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-100 rounded-2xl p-4 bg-gray-50/60"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-800"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedFaq === idx && (
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FSSAI Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-gray-50 text-[11px] text-gray-400 space-y-1">
          <p className="font-bold text-gray-600">License No. 12023033000434</p>
          <p>{restaurant.name} • {restaurant.outlet || restaurant.area}</p>
        </div>
      </div>
    </MainLayout>
  );
};
