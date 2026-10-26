import React from 'react';
import { Plus, Minus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 0,
  onIncrement,
  onDecrement,
  size = 'md',
  className = '',
}) => {
  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onIncrement();
        }}
        className={`bg-white text-[#60b246] hover:bg-emerald-50/50 border border-gray-200/80 font-black tracking-wider rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center cursor-pointer ${
          size === 'sm'
            ? 'px-4 py-1 text-xs'
            : 'px-7 py-2 text-sm font-extrabold uppercase'
        } ${className}`}
      >
        ADD
      </button>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white border border-[#60b246] rounded-lg shadow-xs flex items-center justify-between font-bold text-[#60b246] select-none ${
        size === 'sm' ? 'px-2 py-1 text-xs gap-2' : 'px-3 py-1.5 text-sm gap-3'
      } ${className}`}
    >
      <button
        type="button"
        onClick={onDecrement}
        className="hover:bg-emerald-50 rounded p-0.5 transition-colors cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
      <span className="font-extrabold min-w-[16px] text-center text-gray-900">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="hover:bg-emerald-50 rounded p-0.5 transition-colors cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
    </div>
  );
};
