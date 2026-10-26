import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search for restaurants, dishes or groceries...',
  className = '',
  autoFocus = false,
  size = 'md',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        className={`absolute left-4 text-gray-400 pointer-events-none ${
          size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 transition-all focus:outline-none focus:border-[#fc8019] focus:ring-4 focus:ring-orange-500/10 ${
          size === 'lg'
            ? 'pl-12 pr-12 py-3.5 text-base shadow-sm'
            : 'pl-11 pr-10 py-2.5 text-sm shadow-xs'
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3.5 p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
