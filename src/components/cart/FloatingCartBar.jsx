import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { useCart } from '../../context/CartContext';

export const FloatingCartBar = () => {
  const { totalCount, toPay } = useCart();
  const location = useLocation();

  // Don't show floating bar on the cart page itself
  if (totalCount === 0 || location.pathname === '/cart') {
    return null;
  }

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 max-w-xl mx-auto pointer-events-none">
      <Link
        to="/cart"
        className="pointer-events-auto flex items-center justify-between px-5 py-3.5 bg-[#60b246] hover:bg-[#529b3c] active:scale-[0.98] text-white rounded-2xl shadow-xl shadow-emerald-950/25 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              {totalCount} {totalCount === 1 ? 'item' : 'items'} added
            </p>
            <p className="text-sm font-extrabold">{formatCurrency(toPay)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </div>
  );
};
