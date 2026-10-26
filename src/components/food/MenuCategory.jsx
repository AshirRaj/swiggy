import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FoodItemCard } from './FoodItemCard';

export const MenuCategory = ({
  title,
  items = [],
  restaurant,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!items || items.length === 0) return null;

  return (
    <div className="border-b-8 border-gray-100 py-4 last:border-b-0">
      {/* Category Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-black text-gray-900 tracking-tight">
          {title} ({items.length})
        </h3>
        <div className="p-1 rounded-full text-gray-600 group-hover:bg-gray-100 transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Items list */}
      {isOpen && (
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <FoodItemCard key={item.id} item={item} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};
