import React from 'react';
import { QrCode, Smartphone } from 'lucide-react';

export const AppDownloadBanner = () => {
  return (
    <div className="w-full bg-[#02060c] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 my-10">
      {/* Decorative background glow */}
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#fc8019]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left content */}
      <div className="relative z-10 max-w-lg text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-4">
          <div className="w-5 h-5 rounded-full bg-[#ff5200] flex items-center justify-center text-white font-black text-[10px]">
            S
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-200">
            Swiggy App
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Get the Swiggy App now!
        </h3>

        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-2 max-w-md">
          For best offers, live order tracking, and lightning-fast grocery delivery curated specially for you.
        </p>

        {/* Store Badges */}
        <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noreferrer"
            className="h-10 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center gap-2 text-xs font-semibold text-white transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.67 1.38-.56.64-1.06 1.7-0.93 2.71 1.03.08 2.07-.49 2.68-1.24z"/>
            </svg>
            <span>App Store</span>
          </a>

          <a
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
            className="h-10 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center gap-2 text-xs font-semibold text-white transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M3.6 1.6c-.3.3-.5.8-.5 1.5v17.8c0 .7.2 1.2.5 1.5l.1.1 10-10v-.2l-10-10-.1.1zM17.4 14.1l-3.2-3.2v-.2l3.2-3.2.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.8 2.2zM14.2 11.2l-2.7-2.7-7.9-7.9c.4-.4 1-.4 1.8 0l11.6 6.6-2.8 4zM14.2 12.8l2.8 4-11.6 6.6c-.8.4-1.4.4-1.8 0l7.9-7.9 2.7-2.7z"/>
            </svg>
            <span>Google Play</span>
          </a>
        </div>
      </div>

      {/* Right Smartphone mockup with QR code */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Floating food icons */}
        <span className="hidden sm:inline-block text-3xl select-none animate-bounce" style={{ animationDuration: '3s' }}>
          🍔
        </span>

        {/* Phone Frame */}
        <div className="w-44 sm:w-48 bg-white rounded-3xl p-3 shadow-2xl border-4 border-gray-800 flex flex-col items-center text-center">
          {/* Dynamic Island / Speaker */}
          <div className="w-16 h-3 bg-gray-900 rounded-full mb-3" />

          {/* QR Container */}
          <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-xl p-2 flex items-center justify-center">
            {/* Crisp QR Code Graphic */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-gray-900">
              {/* Corner 1 */}
              <rect x="10" y="10" width="24" height="24" fill="#000" rx="3" />
              <rect x="15" y="15" width="14" height="14" fill="#fff" rx="1" />
              <rect x="18" y="18" width="8" height="8" fill="#000" />

              {/* Corner 2 */}
              <rect x="66" y="10" width="24" height="24" fill="#000" rx="3" />
              <rect x="71" y="15" width="14" height="14" fill="#fff" rx="1" />
              <rect x="74" y="18" width="8" height="8" fill="#000" />

              {/* Corner 3 */}
              <rect x="10" y="66" width="24" height="24" fill="#000" rx="3" />
              <rect x="15" y="71" width="14" height="14" fill="#fff" rx="1" />
              <rect x="18" y="74" width="8" height="8" fill="#000" />

              {/* QR Data pattern */}
              <rect x="42" y="14" width="6" height="6" />
              <rect x="52" y="14" width="6" height="12" />
              <rect x="42" y="26" width="16" height="6" />
              <rect x="14" y="44" width="6" height="12" />
              <rect x="26" y="44" width="8" height="6" />
              <rect x="40" y="40" width="8" height="8" fill="#ff5200" />
              <rect x="52" y="42" width="6" height="6" />
              <rect x="64" y="44" width="12" height="6" />
              <rect x="80" y="44" width="6" height="12" />
              <rect x="44" y="54" width="12" height="6" />
              <rect x="62" y="56" width="8" height="8" />
              <rect x="44" y="68" width="6" height="18" />
              <rect x="56" y="72" width="12" height="6" />
              <rect x="74" y="70" width="12" height="16" />
            </svg>
          </div>

          <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-[#ff5200]">
            Scan to download
          </p>
        </div>

        <span className="hidden sm:inline-block text-3xl select-none animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          🥗
        </span>
      </div>
    </div>
  );
};
