import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export const RestaurantCard = ({ restaurant, className = '' }) => {
  if (!restaurant) return null;

  const {
    id,
    name,
    image,
    cuisines = [],
    rating,
    deliveryTime,
    area,
    offer,
  } = restaurant;

  return (
    <Link
      to={`/restaurant/${id}`}
      className={`group flex flex-col cursor-pointer transition-transform duration-200 hover:scale-[0.97] w-full min-w-0 ${className}`}
    >
      {/* Restaurant Image Container */}
      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-gray-100 shadow-xs">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Bottom dark gradient overlay for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-14 sm:h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-2.5 sm:p-3">
          {offer && (
            <p className="text-white font-black text-xs sm:text-base tracking-tight drop-shadow-sm uppercase truncate">
              {offer}
            </p>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-2.5 sm:pt-3 px-1 w-full min-w-0">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate group-hover:text-[#fc8019] transition-colors">
          {name}
        </h3>

        {/* Rating and Delivery Time */}
        <div className="flex items-center gap-1.5 mt-0.5 text-xs sm:text-sm font-bold text-gray-800">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#22a159] flex items-center justify-center text-white shrink-0">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
          </div>
          <span>{rating}</span>
          <span className="text-gray-400 font-normal">•</span>
          <span>{deliveryTime}</span>
        </div>

        {/* Cuisines */}
        <p className="text-xs text-gray-500 font-medium truncate mt-1">
          {cuisines.join(', ')}
        </p>

        {/* Area */}
        <p className="text-xs text-gray-500 font-medium truncate">
          {area}
        </p>
      </div>
    </Link>
  );
};
