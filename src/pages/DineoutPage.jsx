import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, Calendar } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { DiningRestaurantCard } from '../components/dineout/DiningRestaurantCard';
import { TableBookingForm } from '../components/dineout/TableBookingForm';
import { EmptyState } from '../components/common/EmptyState';
import { useLocation } from '../context/LocationContext';
import { mockApi } from '../services/mockApi';

export const DineoutPage = () => {
  const { currentLocation } = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForBooking, setSelectedForBooking] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    mockApi
      .getDiningRestaurants({
        filter: selectedFilter !== 'all' ? selectedFilter : null,
        search: searchQuery,
        pureVeg: pureVegOnly,
      })
      .then((data) => {
        if (!isMounted) return;
        setRestaurants(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFilter, pureVegOnly, searchQuery]);

  const filterOptions = [
    { id: 'all', label: 'All Restaurants' },
    { id: 'rooftop', label: 'Rooftop Ambiance' },
    { id: 'buffet', label: 'Buffet Specials' },
    { id: 'outdoor', label: 'Outdoor Seating' },
  ];

  return (
    <MainLayout>
      {/* Dineout Hero Banner matching Swiggy live inspection */}
      <section className="bg-neutral-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full">
        <div className="page-container flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-orange-400 mb-3 sm:mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Swiggy Dineout • Up to 50% Off</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Explore Top Dining Out Restaurants in {currentLocation.city}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-2.5 sm:mt-3 leading-relaxed max-w-lg mx-auto md:mx-0">
              Book tables with instant confirmation, pay bills seamlessly, and unlock exclusive discounts at the city's finest dining establishments.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80"
              alt="Dining Table"
              className="w-full max-w-[340px] md:w-80 h-40 sm:h-48 object-cover rounded-3xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="page-container py-6 sm:py-8 w-full min-w-0">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 w-full min-w-0">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant name, cuisine or area..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#fc8019]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-0.5">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedFilter === opt.id
                    ? 'bg-[#fc8019] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}

            <button
              onClick={() => setPureVegOnly(!pureVegOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer shrink-0 ${
                pureVegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              Pure Veg
            </button>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="py-12">
            <EmptyState
              type="search"
              title="No dining restaurants found"
              description="No venues matched your criteria. Try changing filters or search terms."
              actionText="Reset Filters"
              onAction={() => {
                setSelectedFilter('all');
                setPureVegOnly(false);
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
            {restaurants.map((restaurant) => (
              <DiningRestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onBookTable={(rest) => setSelectedForBooking(rest)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Table Booking Modal */}
      {selectedForBooking && (
        <TableBookingForm
          restaurant={selectedForBooking}
          onClose={() => setSelectedForBooking(null)}
        />
      )}
    </MainLayout>
  );
};
