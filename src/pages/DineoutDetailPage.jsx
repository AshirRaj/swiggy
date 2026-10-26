import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Tag, Calendar, Sparkles, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { TableBookingForm } from '../components/dineout/TableBookingForm';
import { mockApi } from '../services/mockApi';

export const DineoutDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    mockApi.getDiningRestaurantById(id).then((data) => {
      setRestaurant(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse space-y-4">
          <div className="w-full h-80 bg-gray-200 rounded-3xl"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
        </div>
      </MainLayout>
    );
  }

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold">Venue not found</h2>
          <Link to="/dineout" className="mt-4 inline-block text-[#fc8019] font-bold text-xs">
            Back to Dineout
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link to="/" className="hover:text-[#fc8019]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/dineout" className="hover:text-[#fc8019]">Dineout</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold truncate">{restaurant.name}</span>
        </nav>

        {/* Hero Banner Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden bg-gray-100 shadow-md mb-8">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white">
              {restaurant.discountBadge && (
                <span className="inline-block px-3 py-1 bg-[#e43b4f] text-white font-black text-xs rounded-md uppercase tracking-wider mb-2">
                  {restaurant.discountBadge}
                </span>
              )}
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {restaurant.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 flex items-center gap-2">
                <span>{restaurant.cuisines?.join(', ')}</span>
                <span>•</span>
                <span>{restaurant.costForTwoString}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Ratings & Address */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Location &amp; Address
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{restaurant.fullAddress}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#22a159] text-white font-bold rounded-lg text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{restaurant.rating}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1 font-medium">
                  {restaurant.totalRatings} ratings
                </p>
              </div>
            </div>

            {/* Exclusive Offers */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#e43b4f]" />
                <span>Available Dineout Offers &amp; Discounts</span>
              </h3>
              <div className="space-y-3">
                {restaurant.offers?.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-3.5 rounded-xl bg-red-50/60 border border-red-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-red-900">{offer.title}</p>
                      <p className="text-[11px] text-red-600 mt-0.5">Pay with Swiggy Dineout at the restaurant</p>
                    </div>
                    <span className="text-xs font-black text-[#e43b4f] px-2 py-1 bg-white rounded-md border border-red-200">
                      {offer.discount}% OFF
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-4">Venue Highlights</h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 font-medium">
                {restaurant.highlights?.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#22a159] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Table Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl border border-gray-200/80 p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-extrabold text-base text-gray-900">Table Reservation</h3>
                <span className="text-xs font-bold text-[#e43b4f] bg-rose-50 px-2 py-0.5 rounded">
                  Free Booking
                </span>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                Reserve your table instantly with zero cancellation fee. Get guaranteed discounts on your food bill.
              </p>

              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-4 bg-[#fc8019] hover:bg-[#e56d05] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table Now</span>
              </button>

              <div className="pt-2 text-[11px] text-gray-400 space-y-1">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22a159]" />
                  <span>Instant SMS &amp; App Confirmation</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#fc8019]" />
                  <span>Exclusive {restaurant.discountBadge || '15% OFF'} on food bill</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <TableBookingForm
          restaurant={restaurant}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </MainLayout>
  );
};
