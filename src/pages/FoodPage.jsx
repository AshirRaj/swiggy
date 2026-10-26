import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { CuisineCarousel } from '../components/food/CuisineCarousel';
import { HorizontalCarousel } from '../components/shared/HorizontalCarousel';
import { RestaurantCard } from '../components/food/RestaurantCard';
import { RestaurantGrid } from '../components/food/RestaurantGrid';
import { FilterChips } from '../components/shared/FilterChips';
import { useLocation } from '../context/LocationContext';
import { mockApi } from '../services/mockApi';

export const FoodPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentLocation } = useLocation();

  const [restaurants, setRestaurants] = useState([]);
  const [topChains, setTopChains] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters from query params or state
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
  const [pureVeg, setPureVeg] = useState(searchParams.get('pureVeg') === 'true');
  const [fastDelivery, setFastDelivery] = useState(searchParams.get('fastDelivery') === 'true');
  const [rating4Plus, setRating4Plus] = useState(searchParams.get('rating4Plus') === 'true');
  const [hasOffers, setHasOffers] = useState(searchParams.get('filter') === 'offers');
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || '');

  // Fetch top chains initially
  useEffect(() => {
    mockApi.getRestaurants({ sortBy: 'rating' }).then((data) => {
      setTopChains(data.slice(0, 8));
    });
  }, []);

  // Fetch filtered restaurants whenever filter changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    mockApi
      .getRestaurants({
        sortBy,
        pureVeg,
        fastDelivery,
        rating4Plus,
        cuisine: selectedCuisine,
      })
      .then((data) => {
        if (!isMounted) return;
        let list = data;
        if (hasOffers) {
          list = list.filter((r) => !!r.offer);
        }
        setRestaurants(list);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [sortBy, pureVeg, fastDelivery, rating4Plus, hasOffers, selectedCuisine]);

  const handleResetFilters = () => {
    setSortBy('');
    setPureVeg(false);
    setFastDelivery(false);
    setRating4Plus(false);
    setHasOffers(false);
    setSelectedCuisine('');
    setSearchParams({});
  };

  return (
    <MainLayout>
      <div className="page-container py-6 sm:py-8 w-full min-w-0">
        {/* Section 1: What's on your mind? */}
        <div className="w-full min-w-0 overflow-hidden">
          <CuisineCarousel
            selectedCuisine={selectedCuisine}
            onSelectCuisine={(cuisine) => setSelectedCuisine(cuisine || '')}
          />
        </div>

        <hr className="my-6 sm:my-8 border-gray-200" />

        {/* Section 2: Top restaurant chains in [City] */}
        <div className="w-full min-w-0">
          <HorizontalCarousel
            title={`Top restaurant chains in ${currentLocation.city}`}
          >
            {topChains.map((r) => (
              <div key={`chain-${r.id}`} className="shrink-0 w-60 sm:w-72">
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </HorizontalCarousel>
        </div>

        <hr className="my-6 sm:my-8 border-gray-200" />

        {/* Section 3: Restaurants with online food delivery in [City] */}
        <div className="w-full min-w-0">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
            Restaurants with online food delivery in {currentLocation.city}
          </h2>

          {/* Active Filter Chips Bar */}
          <FilterChips
            sortBy={sortBy}
            onSortChange={setSortBy}
            pureVeg={pureVeg}
            onTogglePureVeg={() => setPureVeg(!pureVeg)}
            fastDelivery={fastDelivery}
            onToggleFastDelivery={() => setFastDelivery(!fastDelivery)}
            rating4Plus={rating4Plus}
            onToggleRating4Plus={() => setRating4Plus(!rating4Plus)}
            hasOffers={hasOffers}
            onToggleOffers={() => setHasOffers(!hasOffers)}
            className="mb-4 w-full min-w-0"
          />

          {/* Active filter badge tags */}
          {(selectedCuisine || sortBy || pureVeg || fastDelivery || rating4Plus || hasOffers) && (
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-500 flex-wrap">
              <span>Active filters:</span>
              {selectedCuisine && (
                <span className="px-2 py-0.5 bg-orange-100 text-[#fc8019] rounded-md">
                  Cuisine: {selectedCuisine}
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-[#fc8019] hover:underline font-bold ml-2 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Restaurant Grid */}
          <RestaurantGrid
            restaurants={restaurants}
            loading={loading}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>
    </MainLayout>
  );
};
