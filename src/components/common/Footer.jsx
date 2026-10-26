import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Logo } from './Logo';


import { useLocation } from 'react-router-dom';

export const Footer = ({ showCities = null }) => {
  const location = useLocation();
  const [showMoreCities, setShowMoreCities] = useState(false);
  const displayCities = showCities !== null ? showCities : location.pathname !== '/';

  const popularCities = [
    'Bangalore',
    'Gurgaon',
    'Hyderabad',
    'Delhi',
    'Mumbai',
    'Pune',
    'Kolkata',
    'Chennai',
    'Ahmedabad',
    'Chandigarh',
    'Jaipur',
    'Kochi',
    'Coimbatore',
    'Lucknow',
    'Nagpur',
    'Indore',
  ];

  return (
    <footer className="w-full bg-[#f0f0f5] text-[#02060c] pt-12 pb-8 border-t border-gray-200/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Quick Links Section (shown on subpages) */}
        {displayCities && (
          <>
            <div className="mb-12">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Cities with food delivery
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs text-gray-600 font-medium">
                {popularCities.slice(0, showMoreCities ? popularCities.length : 8).map((city) => (
                  <Link
                    key={city}
                    to="/food"
                    className="py-3 px-4 bg-white rounded-xl border border-gray-200/60 hover:border-[#fc8019] hover:text-[#fc8019] transition-all truncate"
                  >
                    Order food online in {city}
                  </Link>
                ))}
                <button
                  onClick={() => setShowMoreCities(!showMoreCities)}
                  className="py-3 px-4 bg-white rounded-xl border border-gray-200/60 font-bold text-[#fc8019] flex items-center justify-center gap-1 hover:bg-orange-50/40 transition-colors cursor-pointer"
                >
                  <span>{showMoreCities ? 'Show Less' : 'Show More'}</span>
                  {showMoreCities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <hr className="border-gray-200 mb-12" />
          </>
        )}

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-sm">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <Logo variant="default" size="default" />
            <p className="text-xs text-gray-500 mt-4 font-medium">
              © 2026 Swiggy Limited
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Crafted with high visual fidelity for web.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Company</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">About Us</Link></li>
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Swiggy Corporate</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Careers</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Team</Link></li>
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Swiggy One</Link></li>
              <li><Link to="/instamart" className="hover:text-[#fc8019] transition-colors">Swiggy Instamart</Link></li>
              <li><Link to="/dineout" className="hover:text-[#fc8019] transition-colors">Swiggy Dineout</Link></li>
            </ul>
          </div>

          {/* Contact us & Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Contact us</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium mb-6">
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Help & Support</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Partner With Us</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Ride With Us</Link></li>
            </ul>

            <h4 className="font-bold text-gray-900 mb-3 text-sm">Legal</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Cookie Policy</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Available in */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Available in:</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Bangalore</Link></li>
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Gurgaon</Link></li>
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Hyderabad</Link></li>
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Delhi</Link></li>
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Mumbai</Link></li>
              <li><Link to="/food" className="hover:text-[#fc8019] transition-colors">Pune</Link></li>
              <li className="pt-2">
                <span className="inline-block px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white">
                  685 cities ▾
                </span>
              </li>
            </ul>
          </div>

          {/* Life at Swiggy & Social */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Life at Swiggy</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium mb-6">
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Explore With Swiggy</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Swiggy News</Link></li>
              <li><Link to="/help" className="hover:text-[#fc8019] transition-colors">Snackables</Link></li>
            </ul>

            <h4 className="font-bold text-gray-900 mb-3 text-sm">Social Links</h4>
            <div className="flex items-center gap-3 text-gray-700">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#fc8019] hover:border-[#fc8019] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#fc8019] hover:border-[#fc8019] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#fc8019] hover:border-[#fc8019] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#fc8019] hover:border-[#fc8019] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>

          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* App Download Banner */}
        <div id="app-download" className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <p className="text-base sm:text-lg font-bold text-gray-900 text-center sm:text-left">
            For better experience, download the Swiggy app now
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              className="h-11 px-4 bg-black text-white rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.67 1.38-.56.64-1.06 1.7-0.93 2.71 1.03.08 2.07-.49 2.68-1.24z"/>
              </svg>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-gray-400">Download on the</p>
                <p className="font-bold -mt-0.5">App Store</p>
              </div>
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              className="h-11 px-4 bg-black text-white rounded-xl flex items-center gap-2 text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3.6 1.6c-.3.3-.5.8-.5 1.5v17.8c0 .7.2 1.2.5 1.5l.1.1 10-10v-.2l-10-10-.1.1zM17.4 14.1l-3.2-3.2v-.2l3.2-3.2.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.8 2.2zM14.2 11.2l-2.7-2.7-7.9-7.9c.4-.4 1-.4 1.8 0l11.6 6.6-2.8 4zM14.2 12.8l2.8 4-11.6 6.6c-.8.4-1.4.4-1.8 0l7.9-7.9 2.7-2.7z"/>
              </svg>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-gray-400">Get it on</p>
                <p className="font-bold -mt-0.5">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
