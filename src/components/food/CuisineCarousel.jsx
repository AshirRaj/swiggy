import React from 'react';
import { Link } from 'react-router-dom';
import { HorizontalCarousel } from '../shared/HorizontalCarousel';
import { CUISINES } from '../../data/cuisines';

export const CuisineCarousel = ({ selectedCuisine, onSelectCuisine }) => {
  return (
    <HorizontalCarousel
      title="What's on your mind?"
      className="py-4"
    >
      {CUISINES.map((cuisine) => {
        const isSelected = selectedCuisine?.toLowerCase() === cuisine.name.toLowerCase();

        if (onSelectCuisine) {
          return (
            <button
              key={cuisine.id}
              onClick={() => onSelectCuisine(isSelected ? null : cuisine.name)}
              className="flex flex-col items-center shrink-0 w-24 sm:w-28 group cursor-pointer text-center"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-50 border-2 transition-all p-1 ${
                  isSelected
                    ? 'border-[#fc8019] shadow-md scale-105'
                    : 'border-transparent group-hover:scale-105'
                }`}
              >
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <span
                className={`mt-2 text-xs sm:text-sm font-semibold truncate max-w-full ${
                  isSelected ? 'text-[#fc8019] font-bold' : 'text-gray-700 group-hover:text-gray-900'
                }`}
              >
                {cuisine.name}
              </span>
            </button>
          );
        }

        return (
          <Link
            key={cuisine.id}
            to={`/food?cuisine=${encodeURIComponent(cuisine.name)}`}
            className="flex flex-col items-center shrink-0 w-24 sm:w-28 group cursor-pointer text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-50 group-hover:scale-105 transition-transform duration-200">
              <img
                src={cuisine.image}
                alt={cuisine.name}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <span className="mt-2 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900 truncate max-w-full">
              {cuisine.name}
            </span>
          </Link>
        );
      })}
    </HorizontalCarousel>
  );
};
