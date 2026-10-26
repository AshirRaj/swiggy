import React from 'react';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

export const FilterChips = ({
  sortBy,
  onSortChange,
  pureVeg,
  onTogglePureVeg,
  fastDelivery,
  onToggleFastDelivery,
  rating4Plus,
  onToggleRating4Plus,
  hasOffers,
  onToggleOffers,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 overflow-x-auto no-scrollbar py-3 ${className}`}>
      {/* Filter Icon button */}
      <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-300 bg-white text-xs font-bold text-gray-700 shadow-2xs whitespace-nowrap">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filter</span>
      </div>

      {/* Sort By Dropdown */}
      <div className="relative inline-block">
        <select
          value={sortBy || ''}
          onChange={(e) => onSortChange(e.target.value)}
          className={`appearance-none pl-3.5 pr-8 py-1.5 rounded-full border text-xs font-bold shadow-2xs cursor-pointer focus:outline-none transition-colors ${
            sortBy
              ? 'border-[#fc8019] bg-orange-50 text-[#fc8019]'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
          }`}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating: High to Low</option>
          <option value="deliveryTime">Delivery Time: Fastest</option>
          <option value="costLowToHigh">Cost: Low to High</option>
          <option value="costHighToLow">Cost: High to Low</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
      </div>

      {/* Fast Delivery Chip */}
      <button
        onClick={onToggleFastDelivery}
        className={`px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-2xs flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
          fastDelivery
            ? 'border-[#fc8019] bg-orange-50 text-[#fc8019]'
            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
        }`}
      >
        {fastDelivery && <Check className="w-3.5 h-3.5" />}
        <span>Fast Delivery</span>
      </button>

      {/* Ratings 4.0+ Chip */}
      <button
        onClick={onToggleRating4Plus}
        className={`px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-2xs flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
          rating4Plus
            ? 'border-[#fc8019] bg-orange-50 text-[#fc8019]'
            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
        }`}
      >
        {rating4Plus && <Check className="w-3.5 h-3.5" />}
        <span>Ratings 4.0+</span>
      </button>

      {/* Pure Veg Chip */}
      <button
        onClick={onTogglePureVeg}
        className={`px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-2xs flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
          pureVeg
            ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
        }`}
      >
        {pureVeg && <Check className="w-3.5 h-3.5" />}
        <span>Pure Veg</span>
      </button>

      {/* Offers Chip */}
      <button
        onClick={onToggleOffers}
        className={`px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-2xs flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
          hasOffers
            ? 'border-[#fc8019] bg-orange-50 text-[#fc8019]'
            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
        }`}
      >
        {hasOffers && <Check className="w-3.5 h-3.5" />}
        <span>Offers</span>
      </button>
    </div>
  );
};
