import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Tag } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export const DiningRestaurantCard = ({ restaurant, onBookTable }) => {
  if (!restaurant) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Restaurant Image */}
      <div className="relative w-full aspect-16/10 bg-gray-100 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Discount Badge */}
        {restaurant.discountBadge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#e43b4f] text-white font-black text-xs tracking-wider rounded-md uppercase shadow-md">
            {restaurant.discountBadge}
          </span>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-white rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#22a159] text-[#22a159]" />
          <span>{restaurant.rating}</span>
          <span className="text-gray-300 font-normal">({restaurant.totalRatings})</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link
            to={`/dineout/${restaurant.id}`}
            className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#fc8019] transition-colors line-clamp-1"
          >
            {restaurant.name}
          </Link>

          <p className="text-xs text-gray-500 font-medium truncate mt-1">
            {restaurant.cuisines?.join(', ')}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {restaurant.area}
            </span>
            <span>{restaurant.costForTwoString}</span>
          </div>

          {/* Dineout Offer banner */}
          {restaurant.offers && restaurant.offers[0] && (
            <div className="mt-3 p-2 bg-red-50/70 border border-red-100 rounded-lg flex items-center gap-1.5 text-xs text-red-700 font-semibold">
              <Tag className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{restaurant.offers[0].title}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
          <Link
            to={`/dineout/${restaurant.id}`}
            className="py-2.5 px-3 text-center border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-colors"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={() => onBookTable && onBookTable(restaurant)}
            className="py-2.5 px-3 text-center bg-[#fc8019] hover:bg-[#e56d05] text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};
