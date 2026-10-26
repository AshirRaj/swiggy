import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Crown, 
  LogOut, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mockApi } from '../services/mockApi';
import { formatCurrency } from '../utils/currency';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'bookings' | 'addresses' | 'membership'
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    mockApi.getOrders().then(setOrders);
    mockApi.getDiningBookings().then(setBookings);
    mockApi.getAddresses().then(setAddresses);
  }, []);

  if (!user) {
    return (
      <MainLayout>
        <div className="py-20 text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-orange-100 text-[#fc8019] mx-auto flex items-center justify-center mb-6">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Sign in to your account</h2>
          <p className="text-xs text-gray-500 mt-2 mb-6">
            View past orders, track live deliveries, manage saved addresses, and access Swiggy One benefits.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-3.5 bg-[#fc8019] hover:bg-[#e56d05] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
          >
            Sign In / Login
          </button>
        </div>
      </MainLayout>
    );
  }

  const handleLogout = () => {
    logout();
    showToast('Logged out of Swiggy');
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fc8019] text-white font-black text-2xl flex items-center justify-center ring-4 ring-white/10 shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{user.name}</h1>
                {user.isSwiggyOne && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 font-black text-[10px] uppercase tracking-wider shadow-sm">
                    <Crown className="w-3 h-3 fill-current" />
                    <span>ONE</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-300 mt-1">{user.phone} • {user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation & Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Tab Links */}
          <div className="md:col-span-1 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-orange-50 text-[#fc8019]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-400">({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-orange-50 text-[#fc8019]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Dineout Bookings</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-400">({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-orange-50 text-[#fc8019]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-400">({addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('membership')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'membership'
                  ? 'bg-orange-50 text-[#fc8019]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-amber-500" />
                <span>Swiggy One</span>
              </span>
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="md:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 mb-4">Past Orders</h3>
                {orders.length === 0 ? (
                  <EmptyState
                    type="orders"
                    title="No past orders"
                    description="You have not placed any orders yet."
                    actionLink="/food"
                    actionText="Order Delicious Food"
                  />
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-sm">
                            {ord.restaurant?.name || 'Swiggy Order'}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Order #{ord.orderId} • {new Date(ord.placedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                          {ord.status || 'Delivered'}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-gray-600">
                        {ord.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-bold text-gray-800">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                        <span className="text-gray-500">Total Paid:</span>
                        <span className="font-black text-sm text-gray-900">
                          {formatCurrency(ord.totalAmount)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Dineout Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 mb-4">Dineout Reservations</h3>
                {bookings.length === 0 ? (
                  <EmptyState
                    type="search"
                    title="No table reservations"
                    description="You have not booked any restaurant tables yet."
                    actionLink="/dineout"
                    actionText="Explore Dineout"
                  />
                ) : (
                  bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-sm">
                          {b.restaurantName}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Booking ID: {b.id} • {b.date} at {b.time} ({b.guests} Guests)
                        </p>
                        <p className="text-xs text-[#e43b4f] font-bold mt-1">
                          Offer: {b.discountApplied}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full">
                        {b.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 mb-4">Saved Addresses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-[#fc8019] uppercase">
                          {a.type}
                        </span>
                        {a.isDefault && (
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-800 leading-snug">
                        {a.addressLine}
                      </p>
                      <p className="text-xs text-gray-500">
                        {a.area}, {a.city} {a.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Swiggy One Membership Tab */}
            {activeTab === 'membership' && (
              <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-6 h-6 fill-current text-amber-200" />
                    <h3 className="text-2xl font-black tracking-tight">Swiggy One Active</h3>
                  </div>
                  <p className="text-xs text-white/90 max-w-md leading-relaxed">
                    Enjoy unlimited free deliveries, exclusive discounts, and zero surge fees across Food Delivery, Instamart, and Dineout.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 text-xs space-y-1">
                    <CheckCircle2 className="w-4 h-4 text-[#22a159]" />
                    <h4 className="font-bold text-gray-900">Free Food Delivery</h4>
                    <p className="text-gray-500">On all restaurant orders above ₹149</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 text-xs space-y-1">
                    <CheckCircle2 className="w-4 h-4 text-[#22a159]" />
                    <h4 className="font-bold text-gray-900">Free Instamart</h4>
                    <p className="text-gray-500">Instant grocery delivery on orders above ₹199</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 text-xs space-y-1">
                    <CheckCircle2 className="w-4 h-4 text-[#22a159]" />
                    <h4 className="font-bold text-gray-900">Extra Dineout Off</h4>
                    <p className="text-gray-500">Up to 40% additional discount on dining bills</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
