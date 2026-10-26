import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'default', size = 'default', className = '' }) => {
  // variant: 'default' (orange icon + black text), 'white' (white icon + white text), 'instamart' (orange icon + purple instamart text), 'dineout' (white icon + white text)
  const isWhite = variant === 'white';
  const isInstamart = variant === 'instamart';
  const isDineout = variant === 'dineout';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 ${className}`}>
      {/* Swiggy Location / Delivery Pin Badge Icon */}
      <div className={`flex items-center justify-center shrink-0 ${size === 'lg' ? 'w-12 h-12' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'} rounded-2xl ${isWhite ? 'bg-white' : 'bg-[#fc8019]'} shadow-sm`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={size === 'lg' ? 'w-7 h-7' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C7.58 2 4 5.58 4 10C4 15.25 12 22 12 22C12 22 20 15.25 20 10C20 5.58 16.42 2 12 2ZM12 13.5C10.07 13.5 8.5 11.93 8.5 10C8.5 8.07 10.07 6.5 12 6.5C13.93 6.5 15.5 8.07 15.5 10C15.5 11.93 13.93 13.5 12 13.5Z"
            fill={isWhite ? '#fc8019' : '#ffffff'}
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex items-baseline">
        <span
          className={`font-black tracking-tight ${
            size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-xl' : 'text-2xl'
          } ${isWhite ? 'text-white' : 'text-[#fc8019]'}`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.04em' }}
        >
          Swiggy
        </span>
        {isInstamart && (
          <span className={`ml-1.5 font-bold tracking-tight text-[#5a2c91] ${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl'}`}>
            instamart
          </span>
        )}
        {isDineout && (
          <span className="ml-1.5 font-semibold text-slate-700 text-lg">
            dineout
          </span>
        )}
      </div>
    </Link>
  );
};
