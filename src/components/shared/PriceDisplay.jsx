import React from 'react';
import { formatCurrency } from '../../utils/currency';

export const PriceDisplay = ({
  price,
  originalPrice,
  className = '',
  size = 'md',
}) => {
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span
        className={`font-bold text-gray-900 ${
          size === 'lg' ? 'text-lg sm:text-xl' : size === 'sm' ? 'text-xs' : 'text-sm'
        }`}
      >
        {formatCurrency(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span
          className={`line-through text-gray-400 font-normal ${
            size === 'lg' ? 'text-sm' : 'text-xs'
          }`}
        >
          {formatCurrency(originalPrice)}
        </span>
      )}
    </div>
  );
};
