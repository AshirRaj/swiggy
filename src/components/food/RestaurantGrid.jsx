import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantCardSkeleton } from '../common/LoadingSkeleton';
import { EmptyState } from '../common/EmptyState';

export const RestaurantGrid = ({
  restaurants = [],
  loading = false,
  title,
  subtitle,
  onResetFilters,
}) => {
  if (loading) {
    return (
      <div className="w-full py-6">
        {title && (
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-6">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {[...Array(8)].map((_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="w-full py-12">
        <EmptyState
          type="search"
          title="No restaurants found"
          description="We couldn't find any restaurants matching your current filters. Try changing or clearing filters."
          actionText="Clear All Filters"
          onAction={onResetFilters}
        />
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      {title && (
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full min-w-0">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};
