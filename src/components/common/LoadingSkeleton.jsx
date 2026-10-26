import React from 'react';

export const RestaurantCardSkeleton = () => (
  <div className="w-full flex flex-col gap-3 animate-pulse">
    <div className="w-full h-44 sm:h-48 bg-gray-200 rounded-2xl"></div>
    <div className="w-3/4 h-5 bg-gray-200 rounded-md"></div>
    <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>
    <div className="w-2/3 h-3 bg-gray-100 rounded-md"></div>
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="w-full flex flex-col gap-2 p-3 border border-gray-100 rounded-2xl animate-pulse">
    <div className="w-full h-36 bg-gray-200 rounded-xl"></div>
    <div className="w-16 h-3 bg-gray-200 rounded-full mt-2"></div>
    <div className="w-full h-4 bg-gray-200 rounded-md"></div>
    <div className="w-20 h-3 bg-gray-100 rounded-md"></div>
    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
      <div className="w-16 h-5 bg-gray-200 rounded-md"></div>
      <div className="w-16 h-8 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

export const MenuDishSkeleton = () => (
  <div className="py-6 flex items-start justify-between gap-6 border-b border-gray-100 animate-pulse">
    <div className="flex-1 space-y-2">
      <div className="w-4 h-4 bg-gray-200 rounded"></div>
      <div className="w-48 h-5 bg-gray-200 rounded"></div>
      <div className="w-20 h-4 bg-gray-200 rounded"></div>
      <div className="w-full max-w-md h-3 bg-gray-100 rounded mt-3"></div>
      <div className="w-3/4 max-w-sm h-3 bg-gray-100 rounded"></div>
    </div>
    <div className="w-32 h-32 bg-gray-200 rounded-2xl shrink-0"></div>
  </div>
);
