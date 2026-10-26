import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { mockApi } from '../../services/mockApi';

export const TableBookingForm = ({ restaurant, onClose, onBookingSuccess }) => {
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState('Today');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(restaurant?.timeSlots?.[0] || '7:30 PM');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!restaurant) return null;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const bookingData = {
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantArea: restaurant.area,
        restaurantImage: restaurant.image,
        date: selectedDate,
        time: selectedSlot,
        guests: guestCount,
        specialRequest,
        discountApplied: restaurant.discountBadge || '15% OFF',
      };
      const result = await mockApi.bookDiningTable(bookingData);
      setConfirmedBooking(result);
      showToast(`Table booked at ${restaurant.name} for ${guestCount} guests!`);
      if (onBookingSuccess) onBookingSuccess(result);
    } catch {
      showToast('Booking failed. Please try again', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fc8019] flex items-center justify-center text-white font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{restaurant.name}</h3>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {restaurant.area}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-gray-900">Table Reserved Successfully!</h4>
            <p className="text-xs text-gray-500">
              Booking ID: <strong className="text-gray-800">{confirmedBooking.id}</strong>
            </p>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-500">Date &amp; Time:</span>
                <span className="font-bold text-gray-800">{confirmedBooking.date}, {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Number of Guests:</span>
                <span className="font-bold text-gray-800">{confirmedBooking.guests} People</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dineout Offer:</span>
                <span className="font-bold text-[#e43b4f]">{confirmedBooking.discountApplied}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400">
              Show this confirmation voucher at the restaurant reception when you arrive.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#fc8019] hover:bg-[#e56d05] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleConfirmBooking} className="p-6 space-y-5">
            {/* Offer banner */}
            {restaurant.discountBadge && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-xs font-bold text-red-700">
                <Sparkles className="w-4 h-4 shrink-0 text-[#e43b4f]" />
                <span>Special Dineout Deal: {restaurant.discountBadge} on total bill!</span>
              </div>
            )}

            {/* Select Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                1. Select Date
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Today', 'Tomorrow', 'Day After'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedDate === d
                        ? 'bg-[#fc8019] text-white border-[#fc8019] shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                2. Number of Guests
              </label>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestCount(num)}
                    className={`w-10 h-10 rounded-xl shrink-0 text-xs font-bold border transition-all cursor-pointer ${
                      guestCount === num
                        ? 'bg-[#fc8019] text-white border-[#fc8019] shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                3. Select Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto no-scrollbar">
                {(restaurant.timeSlots || ['1:00 PM', '7:30 PM', '8:00 PM', '8:30 PM']).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSlot === slot
                        ? 'bg-[#fc8019] text-white border-[#fc8019] shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Special Requests (Optional)
              </label>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. Window table, Anniversary surprise..."
                className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#fc8019]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#fc8019] hover:bg-[#e56d05] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              {isSubmitting ? 'Confirming Reservation...' : 'Confirm Table Reservation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
