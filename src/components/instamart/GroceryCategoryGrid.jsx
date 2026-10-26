import React from 'react';

export const GroceryCategoryGrid = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
          selectedCategory === 'all'
            ? 'bg-[#5a2c91] text-white border-[#5a2c91] shadow-xs'
            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
        }`}
      >
        All Groceries
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
              isSelected
                ? 'bg-[#5a2c91] text-white border-[#5a2c91] shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
