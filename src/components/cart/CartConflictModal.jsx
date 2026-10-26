import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartConflictModal = () => {
  const { conflictModalData, resolveConflictReplace, cancelConflict, restaurant } = useCart();

  if (!conflictModalData) return null;

  const currentRestaurantName = restaurant?.name || 'another restaurant';
  const newRestaurantName = conflictModalData.pendingRestaurant?.name || 'this new restaurant';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2.5 rounded-full bg-orange-100 text-[#fc8019] shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Items already in cart
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Your cart contains items from <strong className="text-gray-800">{currentRestaurantName}</strong>. Would you like to reset your cart for adding dishes from <strong className="text-gray-800">{newRestaurantName}</strong>?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={cancelConflict}
            className="py-3 px-4 border border-gray-300 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          >
            No
          </button>
          <button
            type="button"
            onClick={resolveConflictReplace}
            className="py-3 px-4 bg-[#60b246] hover:bg-[#529b3c] rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            Yes, Start Afresh
          </button>
        </div>
      </div>
    </div>
  );
};
