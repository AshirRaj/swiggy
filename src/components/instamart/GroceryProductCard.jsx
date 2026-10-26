import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { QuantitySelector } from '../shared/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const GroceryProductCard = ({ product }) => {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const { showToast } = useToast();

  if (!product) return null;

  const quantity = getItemQuantity(product.id);

  const handleAdd = () => {
    addItem({
      ...product,
      type: 'grocery',
    });
    showToast(`Added ${product.name} to cart`);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex flex-col justify-between p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition-shadow group">
      <div>
        {/* Product Image & Top Discount Tag */}
        <Link
          to={`/product/${product.id}`}
          className="relative w-full aspect-square rounded-xl bg-gray-50 flex items-center justify-center p-2 mb-2 overflow-hidden block"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80';
            }}
          />

          {product.discountPercent > 0 && (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-emerald-700 text-white font-black text-[10px] rounded tracking-wide">
              {product.discountPercent}% OFF
            </span>
          )}
        </Link>

        {/* 4 Mins delivery & Weight */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mb-1">
          <span className="text-gray-500 uppercase tracking-wider">{product.deliveryTime || '4 MINS'}</span>
          <span>{product.weight}</span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-[#5a2c91] transition-colors block"
        >
          {product.name}
        </Link>
      </div>

      {/* Price and Add Button */}
      <div className="pt-2 border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <div>
          <QuantitySelector
            quantity={quantity}
            onIncrement={handleAdd}
            onDecrement={handleRemove}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};
