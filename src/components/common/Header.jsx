import React from 'react';
import { Link, useLocation as useRouteLocation } from 'react-router-dom';
import {
  ChevronDown,
  Search,
  Percent,
  HelpCircle,
  User,
  ShoppingBag,
  Briefcase,
  ArrowUpRight
} from 'lucide-react';
import { Logo } from './Logo';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Header = ({ isLanding = false }) => {
  const routeLocation = useRouteLocation();
  const { currentLocation, setIsLocationModalOpen } = useLocation();
  const { user, setIsAuthModalOpen } = useAuth();
  const { totalCount } = useCart();

  const isHome = isLanding || routeLocation.pathname === '/';
  const isFood = routeLocation.pathname === '/food' || routeLocation.pathname.startsWith('/restaurant');
  const isInstamart = routeLocation.pathname === '/instamart';
  const isDineout = routeLocation.pathname === '/dineout';

  if (isHome) {
    // Landing Page Header (Orange Background, White Elements)
    return (
      <header className="w-full bg-[#ff5200] text-white py-4 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <Logo variant="white" size="lg" />

          <nav className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/food"
              className="hidden md:inline-flex text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Swiggy Corporate
            </Link>
            <Link
              to="/help"
              className="hidden sm:inline-flex text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Partner with us
            </Link>
            <a
              href="#app-download"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 border border-white/60 rounded-full text-xs font-bold text-white hover:bg-white/10 transition-all"
            >
              Get the App <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {user ? (
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2 bg-black/90 hover:bg-black text-white text-sm font-bold rounded-full shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <div className="w-6 h-6 rounded-full bg-[#fc8019] flex items-center justify-center text-xs text-white">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-2.5 bg-black hover:bg-neutral-900 text-white text-sm font-bold rounded-full shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Sign in
              </button>
            )}
          </nav>
        </div>
      </header>
    );
  }

  // Internal Header (Sticky, White Background, Complete Navigation)
  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo & Location Selector */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Logo variant="default" />

          {/* Location Trigger */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-2 group text-left cursor-pointer"
            aria-label="Select delivery location"
          >
            <span className="text-sm font-bold text-gray-900 border-b-2 border-gray-900 group-hover:text-[#fc8019] group-hover:border-[#fc8019] transition-colors">
              {currentLocation.label || 'Other'}
            </span>
            <span className="text-xs text-gray-500 max-w-[130px] sm:max-w-[200px] lg:max-w-[260px] truncate group-hover:text-gray-700">
              {currentLocation.area}, {currentLocation.city}
            </span>
            <ChevronDown className="w-4 h-4 text-[#fc8019] transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>

        {/* Center / Navigation Links for desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/food"
            className={`text-sm font-semibold transition-colors pb-1 border-b-2 ${isFood ? 'text-[#fc8019] border-[#fc8019]' : 'text-gray-600 border-transparent hover:text-[#fc8019]'
              }`}
          >
            Food Delivery
          </Link>
          <Link
            to="/instamart"
            className={`text-sm font-semibold transition-colors pb-1 border-b-2 ${isInstamart ? 'text-[#5a2c91] border-[#5a2c91]' : 'text-gray-600 border-transparent hover:text-[#5a2c91]'
              }`}
          >
            Instamart
          </Link>
          <Link
            to="/dineout"
            className={`text-sm font-semibold transition-colors pb-1 border-b-2 ${isDineout ? 'text-[#fc8019] border-[#fc8019]' : 'text-gray-600 border-transparent hover:text-[#fc8019]'
              }`}
          >
            Dineout
          </Link>
        </div>

        {/* Right Nav Action Items */}
        <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Link
            to="/food"
            className="hidden xl:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-colors"
          >
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span>Corporate</span>
          </Link>


          <Link
            to="/search"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors -translate-x-1 sm:translate-x-0 ${routeLocation.pathname === '/search'
              ? 'text-[#fc8019]'
              : 'text-gray-700 hover:text-[#fc8019]'
              }`}
          >
            <Search className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline">Search</span>
          </Link>


          <Link
            to="/food?filter=offers"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-colors relative"
          >
            <Percent className="w-4 h-4 text-gray-500" />
            <span>Offers</span>
            <span className="absolute -top-2.5 -right-4 px-1.5 py-0.2 bg-[#ffa700] text-white text-[9px] font-black rounded-full uppercase tracking-tighter">
              NEW
            </span>
          </Link>

          <Link
            to="/help"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>Help</span>
          </Link>

          {/* User Sign In / Profile */}
          {user ? (
            <Link
              to="/account"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-colors group py-1"
              aria-label="User Profile"
            >
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#fc8019] font-bold flex items-center justify-center text-xs border border-orange-200 group-hover:scale-105 group-hover:bg-[#fc8019] group-hover:text-white transition-all shadow-2xs">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-gray-800 leading-tight max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] text-gray-400 font-medium">Profile</span>
              </div>
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-colors cursor-pointer group py-1"
              aria-label="Sign In or Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-[#fc8019] flex items-center justify-center border border-gray-200/80 transition-all shadow-2xs">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-gray-800 leading-tight">Profile</span>
                <span className="text-[10px] text-gray-400 font-medium">Sign In</span>
              </div>
            </button>
          )}

          {/* Cart Icon with Counter */}
          <Link
            to="/cart"
            className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#fc8019] transition-colors relative py-1"
          >
            <div className="relative">
              <ShoppingBag
                className={`w-5 h-5 ${totalCount > 0 ? 'text-[#60b246]' : 'text-gray-600'}`}
              />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#60b246] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              )}
            </div>
            <span className={`hidden sm:inline ${totalCount > 0 ? 'text-[#60b246]' : ''}`}>
              Cart
            </span>
          </Link>
        </nav>
      </div>

      {/* Subnav bar for mobile view */}
      <div className="lg:hidden flex items-center justify-around border-t border-gray-100 py-2 bg-gray-50/70 text-xs font-semibold">
        <Link
          to="/food"
          className={`px-3 py-1 rounded-full ${isFood ? 'bg-[#fc8019] text-white' : 'text-gray-600'}`}
        >
          Food
        </Link>
        <Link
          to="/instamart"
          className={`px-3 py-1 rounded-full ${isInstamart ? 'bg-[#5a2c91] text-white' : 'text-gray-600'}`}
        >
          Instamart
        </Link>
        <Link
          to="/dineout"
          className={`px-3 py-1 rounded-full ${isDineout ? 'bg-[#282c3f] text-white' : 'text-gray-600'}`}
        >
          Dineout
        </Link>

        <Link
          to="/search"
          className={`px-2 py-1 -translate-x-1 rounded-full whitespace-nowrap ${routeLocation.pathname === '/search'
            ? 'bg-[#fc8019] text-white'
            : 'text-gray-600'
            }`}
        >
          Search
        </Link>

        <Link
          to={user ? "/account" : "#"}
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              setIsAuthModalOpen(true);
            }
          }}
          className={`px-3 py-1 rounded-full flex items-center gap-1 ${routeLocation.pathname === '/account' ? 'bg-[#fc8019] text-white' : 'text-gray-600'}`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile</span>
        </Link>
      </div>
    </header>
  );
};
