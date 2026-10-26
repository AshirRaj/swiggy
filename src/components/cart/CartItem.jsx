import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { QuantitySelector } from '../shared/QuantitySelector';
import { useCart } from '../../context/CartContext';

export const CartItem = ({ item }) => {
  const { addItem, removeItem } = useCart();

  if (!item) return null;

  return (
    <div className="py-3 flex items-center justify-between gap-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        {/* Veg or Non-Veg indicator */}
        <div
          className={`w-3.5 h-3.5 border-2 rounded flex items-center justify-center shrink-0 ${
            item.isVeg !== false ? 'border-[#0f8a65]' : 'border-[#e43b4f]'
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              item.isVeg !== false ? 'bg-[#0f8a65]' : 'bg-[#e43b4f]'
            }`}
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {item.name}
          </p>
          {item.weight && (
            <p className="text-xs text-gray-400 font-medium">{item.weight}</p>
          )}
          <p className="text-xs text-gray-500 font-medium">
            {formatCurrency(item.price)} each
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 shrink-0">
        <QuantitySelector
          quantity={item.quantity}
          onIncrement={() => addItem(item)}
          onDecrement={() => removeItem(item.id)}
          size="sm"
        />
        <span className="text-sm font-bold text-gray-900 min-w-[50px] text-right">
          {formatCurrency(item.price * item.quantity)}
        </span>
      </div>
    </div>
  );
};
