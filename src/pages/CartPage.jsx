import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Plus, 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight,
  Truck
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyState } from '../components/common/EmptyState';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mockApi } from '../services/mockApi';
import { formatCurrency } from '../utils/currency';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, restaurant, toPay, clearCart, tip, cutleryNeeded, cookingInstructions } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();
  const { showToast } = useToast();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Address add form modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    addressLine: '',
    area: '',
    city: 'Bengaluru',
    pincode: '',
  });

  useEffect(() => {
    mockApi.getAddresses().then((list) => {
      setAddresses(list);
      if (list.length > 0) {
        setSelectedAddressId(list[0].id);
      }
    });
  }, []);

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.addressLine || !newAddress.area) {
      showToast('Please fill all address fields', 'error');
      return;
    }
    const saved = await mockApi.saveAddress(newAddress);
    setAddresses((prev) => [saved, ...prev]);
    setSelectedAddressId(saved.id);
    setShowAddressModal(false);
    showToast('New address saved!');
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      showToast('Please sign in or enter your mobile number to place the order', 'info');
      return;
    }

    const currentAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!currentAddress) {
      showToast('Please select or add a delivery address', 'error');
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderPayload = {
        items,
        restaurant: restaurant || { name: 'Swiggy Instamart Store', area: 'Instant Hub' },
        deliveryAddress: currentAddress,
        paymentMethod,
        totalAmount: toPay,
        tip,
        cutleryNeeded,
        cookingInstructions,
      };

      const placed = await mockApi.placeOrder(orderPayload);
      setOrderConfirmation(placed);
      clearCart();
      showToast('Order placed successfully! Sit back and relax');
    } catch {
      showToast('Could not process order. Please try again', 'error');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0 && !orderConfirmation) {
    return (
      <MainLayout>
        <div className="py-16">
          <EmptyState
            type="cart"
            title="Your cart is empty"
            description="Good food is always cooking! Go ahead, order some yummy items from the menu."
            actionText="SEE RESTAURANTS NEAR YOU"
            actionLink="/food"
          />
        </div>
      </MainLayout>
    );
  }

  // Order Confirmed Success Screen
  if (orderConfirmation) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Order #{orderConfirmation.orderId} • Delivered in ~{orderConfirmation.estimatedDelivery}
          </p>

          {/* Live Order Tracker Graphic */}
          <div className="my-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#fc8019]">
                  Live Order Status
                </p>
                <h3 className="font-extrabold text-base text-gray-900 mt-0.5">
                  Restaurant is preparing your fresh order
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 text-[#fc8019] flex items-center justify-center animate-pulse">
                <Truck className="w-5 h-5" />
              </div>
            </div>

            {/* Simulated timeline */}
            <div className="mt-6 space-y-4 text-xs font-semibold">
              <div className="flex items-center gap-3 text-emerald-600">
                <div className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                <span>Order Confirmed &amp; Payment Received ({formatCurrency(orderConfirmation.totalAmount)})</span>
              </div>
              <div className="flex items-center gap-3 text-orange-600">
                <div className="w-3 h-3 rounded-full bg-[#fc8019] ring-4 ring-orange-100 animate-ping" />
                <span>Chef is preparing the dishes fresh</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span>Delivery partner assigned</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gray-50 flex items-center justify-between text-xs text-gray-600">
              <div>
                <p className="font-bold text-gray-800">Delivering to:</p>
                <p className="text-gray-500">{orderConfirmation.deliveryAddress?.addressLine}, {orderConfirmation.deliveryAddress?.area}</p>
              </div>
              <span className="font-black text-gray-900">{orderConfirmation.deliveryAddress?.type}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/account"
              className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              View in My Orders
            </Link>
            <Link
              to="/food"
              className="px-6 py-3.5 bg-[#fc8019] hover:bg-[#e56d05] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
            >
              Order More Food
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-8">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Delivery Address & Payment Method */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#fc8019]" />
                  <h3 className="font-black text-base text-gray-900">
                    Delivery Address
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="text-xs font-bold text-[#fc8019] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Saved Addresses grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#fc8019] bg-orange-50/40 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs text-gray-900 uppercase">
                          {addr.type}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#fc8019] text-white flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-snug">
                        {addr.addressLine}, {addr.area}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#fc8019]" />
                <h3 className="font-black text-base text-gray-900">
                  Payment Method (Simulated)
                </h3>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:border-[#fc8019] cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#fc8019] focus:ring-[#fc8019]"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800">UPI Instant Pay</p>
                      <p className="text-xs text-gray-400">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Fastest
                  </span>
                </label>

                {/* Card Option */}
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:border-[#fc8019] cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#fc8019] focus:ring-[#fc8019]"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800">Credit or Debit Card</p>
                      <p className="text-xs text-gray-400">Visa, Mastercard, RuPay, Diners</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">Instant OTP</span>
                </label>

                {/* Cash on Delivery */}
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:border-[#fc8019] cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#fc8019] focus:ring-[#fc8019]"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800">Pay on Delivery</p>
                      <p className="text-xs text-gray-400">Pay via cash or UPI at your doorstep</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <CartSummary
                showCheckoutBtn={true}
                onProceedToCheckout={handlePlaceOrder}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Add Delivery Address</h3>
            <form onSubmit={handleAddNewAddress} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Address Type</label>
                <div className="flex gap-2">
                  {['Home', 'Work', 'Other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewAddress({ ...newAddress, type })}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                        newAddress.type === type
                          ? 'border-[#fc8019] bg-orange-50 text-[#fc8019]'
                          : 'border-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Flat / House No. / Building</label>
                <input
                  type="text"
                  required
                  value={newAddress.addressLine}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                  placeholder="e.g. Flat 104, Sunrise Apartments"
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#fc8019]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Area / Street</label>
                <input
                  type="text"
                  required
                  value={newAddress.area}
                  onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                  placeholder="e.g. 100ft Road, Indiranagar"
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#fc8019]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 py-3 text-xs font-bold text-gray-600 border border-gray-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-bold text-white bg-[#fc8019] rounded-xl shadow-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
