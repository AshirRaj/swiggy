import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronDown, Search, User } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';

export const InstamartHeader = ({ searchQuery, onSearchChange }) => {
  const { currentLocation, setIsLocationModalOpen } = useLocation();
  const { user, setIsAuthModalOpen } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="h-14 sm:h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Instamart Logo & Delivery Location */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
            {/* Mobile compact logo */}
            <div className="sm:hidden">
              <Logo variant="instamart" size="sm" />
            </div>
            {/* Tablet & Desktop logo */}
            <div className="hidden sm:block">
              <Logo variant="instamart" />
            </div>

            {/* Mobile delivery pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex md:hidden items-center gap-1 px-2 py-1 bg-purple-50/80 border border-purple-100 rounded-full text-left cursor-pointer max-w-[120px]"
            >
              <Zap className="w-3 h-3 text-[#5a2c91] fill-current shrink-0" />
              <span className="text-[11px] font-bold text-[#5a2c91] truncate">
                {currentLocation.area}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500 shrink-0" />
            </button>

            {/* Desktop 4 Mins Delivery pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-purple-50/70 border border-purple-100 rounded-full text-left group hover:bg-purple-100/60 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#5a2c91] fill-current" />
              <span className="text-xs font-bold text-[#5a2c91]">
                4 Mins Delivery to
              </span>
              <span className="text-xs text-gray-600 max-w-[120px] truncate">
                {currentLocation.area}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          {/* Center: Search input (hidden on mobile, shown on md+) */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder='Search for "Milk", "Bread", "Chips", "Paneer"...'
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/80 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border focus:border-[#5a2c91] focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>

          {/* Right: Auth & Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {user ? (
              <Link
                to="/account"
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-[#5a2c91]"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 text-[#5a2c91] flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-[#5a2c91] cursor-pointer px-1 py-1"
              >
                <User className="w-4 h-4 text-gray-600" />
                <span className="hidden sm:inline">Sign in</span>
              </button>
            )}

            {/* Cart Button */}

          </div>
        </div>

        {/* Mobile Search input (Row 2, full width) */}
        <div className="block md:hidden pb-2.5 pt-0.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder='Search for "Milk", "Bread", "Chips", "Paneer"...'
              className="w-full pl-10 pr-4 py-2 bg-gray-100/90 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border focus:border-[#5a2c91] focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
