import React, { useState } from 'react';
import { Tag, Sparkles, X, Check, Utensils, MessageSquare } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { CartItem } from './CartItem';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { mockApi } from '../../services/mockApi';

export const CartSummary = ({ showCheckoutBtn = false, onProceedToCheckout }) => {
  const {
    items,
    restaurant,
    itemTotal,
    deliveryFee,
    isFreeDelivery,
    platformFee,
    gstAndGovCharges,
    discountAmount,
    toPay,
    coupon,
    applyCoupon,
    removeCoupon,
    tip,
    setTip,
    cutleryNeeded,
    toggleCutlery,
    cookingInstructions,
    setInstructions,
  } = useCart();

  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [showCookingBox, setShowCookingBox] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code) {
      showToast('Please enter a coupon code', 'error');
      return;
    }
    setIsApplyingCoupon(true);
    try {
      const res = await mockApi.validateCoupon(code, itemTotal);
      if (res.valid) {
        applyCoupon(res);
        showToast(res.message);
        setCouponInput('');
      } else {
        showToast(res.message, 'error');
      }
    } catch {
      showToast('Failed to apply coupon', 'error');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const tipOptions = [10, 20, 30, 50];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Restaurant Info Header */}
      {restaurant && (
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center font-bold text-lg text-[#fc8019] shrink-0">
            {restaurant.name?.charAt(0) || 'S'}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">{restaurant.name}</h3>
            <p className="text-xs text-gray-400 font-medium">{restaurant.area || 'Bangalore'}</p>
          </div>
        </div>
      )}

      {/* Cart Items List */}
      <div className="space-y-1">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Add Cooking instructions & Cutlery options */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setShowCookingBox(!showCookingBox)}
            className="flex items-center gap-1.5 text-gray-700 hover:text-[#fc8019] font-semibold py-1 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{cookingInstructions ? 'Edit cooking requests' : '+ Add cooking requests'}</span>
          </button>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={cutleryNeeded}
              onChange={toggleCutlery}
              className="rounded text-[#fc8019] focus:ring-[#fc8019] w-3.5 h-3.5"
            />
            <span className="text-gray-700 font-medium">Cutlery Needed</span>
          </label>
        </div>

        {showCookingBox && (
          <div className="mt-2 animate-in fade-in duration-200">
            <textarea
              value={cookingInstructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Please avoid spicy sauce, make it extra crispy..."
              rows={2}
              className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#fc8019]"
            />
          </div>
        )}
      </div>

      {/* SAVINGS CORNER / Apply Coupon */}
      <div className="pt-2">
        <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#fc8019]" />
          <span>Savings Corner</span>
        </p>

        {coupon ? (
          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <div>
                <p className="font-bold text-emerald-800 tracking-wide">{coupon.coupon?.code || 'COUPON'}</p>
                <p className="text-emerald-700 text-[11px]">Saved {formatCurrency(discountAmount)}</p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 text-emerald-700 hover:text-emerald-900 font-bold text-xs"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="ENTER COUPON CODE"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-[#fc8019]"
              />
              <button
                type="button"
                onClick={() => handleApplyCoupon()}
                disabled={isApplyingCoupon || !couponInput}
                className="px-4 py-2 bg-[#fc8019] hover:bg-[#e56d05] disabled:opacity-40 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Apply
              </button>
            </div>

            {/* Quick coupon suggestions */}
            <div className="flex gap-2 pt-1 overflow-x-auto no-scrollbar">
              {['SWIGGY50', 'TRYNEW', 'JUMBO150'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleApplyCoupon(code)}
                  className="px-2.5 py-1 bg-orange-50/70 border border-orange-200/60 rounded-lg text-[10px] font-bold text-[#fc8019] hover:bg-orange-100 transition-colors shrink-0"
                >
                  Apply {code}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tip for delivery partner */}
      <div className="pt-2">
        <p className="text-xs font-bold text-gray-700 mb-2">
          Tip your delivery partner
        </p>
        <div className="grid grid-cols-4 gap-2">
          {tipOptions.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setTip(tip === amount ? 0 : amount)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                tip === amount
                  ? 'border-[#fc8019] bg-orange-50 text-[#fc8019]'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
      </div>

      {/* Bill Details */}
      <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
        <p className="font-bold text-gray-900 text-sm mb-2">Bill Details</p>

        <div className="flex justify-between text-gray-600">
          <span>Item Total</span>
          <span className="font-medium text-gray-900">{formatCurrency(itemTotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className={isFreeDelivery ? 'text-[#60b246] font-bold' : 'font-medium text-gray-900'}>
            {isFreeDelivery ? 'FREE' : formatCurrency(deliveryFee)}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-[#60b246] font-semibold">
            <span>Item Discount</span>
            <span>- {formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Platform Fee</span>
          <span className="font-medium text-gray-900">{formatCurrency(platformFee)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>GST and Restaurant Charges</span>
          <span className="font-medium text-gray-900">{formatCurrency(gstAndGovCharges)}</span>
        </div>

        {tip > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Delivery Tip</span>
            <span className="font-medium text-gray-900">{formatCurrency(tip)}</span>
          </div>
        )}

        <hr className="border-gray-200 my-2" />

        {/* TO PAY */}
        <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1">
          <span>TO PAY</span>
          <span>{formatCurrency(toPay)}</span>
        </div>
      </div>

      {showCheckoutBtn && (
        <button
          type="button"
          onClick={onProceedToCheckout}
          className="w-full py-4 bg-[#60b246] hover:bg-[#529b3c] active:scale-[0.99] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/25 transition-all mt-4 cursor-pointer"
        >
          Proceed to Pay {formatCurrency(toPay)}
        </button>
      )}

      {/* Cancellation note */}
      <p className="text-[10px] text-gray-400 text-center leading-relaxed">
        Review your order and address details. Orders cannot be cancelled once placed.
      </p>
    </div>
  );
};
