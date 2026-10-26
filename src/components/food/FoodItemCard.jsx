import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { QuantitySelector } from '../shared/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const FoodItemCard = ({ item, restaurant }) => {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const { showToast } = useToast();

  if (!item) return null;

  const quantity = getItemQuantity(item.id);

  const handleAdd = () => {
    const success = addItem(item, restaurant);
    if (success) {
      showToast(`Added ${item.name} to cart`);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="py-5 sm:py-6 border-b border-gray-100 flex items-start justify-between gap-3 sm:gap-6 last:border-b-0 w-full min-w-0">
      {/* Left Details */}
      <div className="flex-1 min-w-0 pr-2">
        {/* Veg / Non-Veg Indicator & Bestseller */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <div
            className={`w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 ${
              item.isVeg ? 'border-[#0f8a65]' : 'border-[#e43b4f]'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                item.isVeg ? 'bg-[#0f8a65]' : 'bg-[#e43b4f]'
              }`}
            />
          </div>
          {item.isBestseller && (
            <span className="text-[10px] font-black tracking-wide text-[#ee5a36] bg-orange-50 px-2 py-0.5 rounded-full uppercase">
              ★ Bestseller
            </span>
          )}
        </div>

        {/* Dish Name */}
        <Link
          to={`/product/${item.id}`}
          className="text-sm sm:text-base font-bold text-gray-900 tracking-tight leading-snug hover:text-[#fc8019] transition-colors block"
        >
          {item.name}
        </Link>

        {/* Price */}
        <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
          {formatCurrency(item.price)}
        </p>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-[#0f8a65]">
            <Star className="w-3 h-3 fill-current" />
            <span>{item.rating}</span>
            {item.ratingCount && (
              <span className="text-gray-400 font-normal">({item.ratingCount})</span>
            )}
          </div>
        )}

        {/* Description */}
        {item.description && (
          <p className="text-xs text-gray-500 font-normal mt-1.5 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Right Dish Image & ADD Button */}
      <div className="relative shrink-0 flex flex-col items-center">
        <Link
          to={`/product/${item.id}`}
          className="w-24 h-24 sm:w-36 sm:h-28 rounded-2xl overflow-hidden bg-gray-100 shadow-xs block group"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';
            }}
          />
        </Link>

        {/* Floating Add Button Overlay */}
        <div className="-mt-4 z-10">
          <QuantitySelector
            quantity={quantity}
            onIncrement={handleAdd}
            onDecrement={handleRemove}
            size="sm"
          />
        </div>

        {item.customizable && (
          <span className="text-[10px] text-gray-400 mt-1 font-medium">
            Customisable
          </span>
        )}
      </div>
    </div>
  );
};
