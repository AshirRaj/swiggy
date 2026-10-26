import React, { useState, useEffect } from 'react';
import { X, MapPin, Navigation, Search, Check, ChevronRight } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { useToast } from '../../context/ToastContext';
import { CITIES, POPULAR_LOCATIONS } from '../../data/cities';

export const LocationSelector = () => {
  const { currentLocation, selectLocation, detectGPSLocation, isLocationModalOpen, setIsLocationModalOpen } = useLocation();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLocationModalOpen) {
        setIsLocationModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocationModalOpen, setIsLocationModalOpen]);

  if (!isLocationModalOpen) return null;

  const handleDetectGPS = async () => {
    setIsDetecting(true);
    try {
      const loc = await detectGPSLocation();
      showToast(`Location set to ${loc.area}, ${loc.city}`);
    } catch {
      showToast('Could not detect location automatically', 'error');
    } finally {
      setIsDetecting(false);
    }
  };

  const filteredLocations = POPULAR_LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.fullAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-b-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-top-4 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#fc8019]" />
            <h2 className="text-lg font-bold text-gray-900">Choose your location</h2>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for area, street name..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fc8019] focus:bg-white focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
              autoFocus
            />
          </div>

          {/* GPS Button */}
          <button
            onClick={handleDetectGPS}
            disabled={isDetecting}
            className="w-full mt-3 p-3.5 border border-dashed border-[#fc8019] rounded-xl flex items-center gap-3 text-left hover:bg-orange-50/50 transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#fc8019] group-hover:scale-110 transition-transform">
              <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#fc8019]">
                {isDetecting ? 'Detecting current location...' : 'Use current location'}
              </p>
              <p className="text-xs text-gray-500">Using GPS / Precise location</p>
            </div>
          </button>
        </div>

        {/* Locations List */}
        <div className="overflow-y-auto px-6 py-2 divide-y divide-gray-100">
          <div className="py-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              {searchQuery ? 'Search Results' : 'Popular Delivery Areas'}
            </p>
            <div className="space-y-1">
              {filteredLocations.map((loc) => {
                const isSelected = currentLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      selectLocation(loc);
                      showToast(`Delivery location set to ${loc.name}`);
                    }}
                    className={`w-full text-left p-3 rounded-xl flex items-start justify-between hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-orange-50/60 border border-orange-200/60' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin
                        className={`w-4 h-4 mt-1 shrink-0 ${
                          isSelected ? 'text-[#fc8019]' : 'text-gray-400'
                        }`}
                      />
                      <div>
                        <p className={`text-sm font-semibold ${isSelected ? 'text-[#fc8019]' : 'text-gray-800'}`}>
                          {loc.name}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">{loc.fullAddress}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#fc8019] shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Cities Grid */}
          <div className="py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Browse by City
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    selectLocation({
                      id: `city-${city.id}`,
                      name: city.areas[0],
                      city: city.name,
                      fullAddress: `${city.areas[0]}, ${city.name}`,
                    });
                    showToast(`Selected ${city.name} (${city.areas[0]})`);
                  }}
                  className="p-2.5 text-left border border-gray-100 rounded-lg hover:border-[#fc8019] hover:bg-orange-50/40 transition-colors text-xs font-medium text-gray-700 flex items-center justify-between"
                >
                  <span>{city.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
