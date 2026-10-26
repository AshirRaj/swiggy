import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, UtensilsCrossed, ArrowRight } from 'lucide-react';

export const EmptyState = ({
  type = 'cart',
  title,
  description,
  actionText,
  actionLink,
  onAction,
}) => {
  let defaultIcon = <ShoppingBag className="w-16 h-16 text-gray-300" />;
  let defaultTitle = 'Your cart is empty';
  let defaultDesc = 'You can go to home page to view more restaurants';
  let defaultBtn = 'SEE RESTAURANTS NEAR YOU';
  let defaultHref = '/food';

  if (type === 'search') {
    defaultIcon = <Search className="w-16 h-16 text-gray-300" />;
    defaultTitle = 'No matches found';
    defaultDesc = 'Try searching with a different term, dish name or restaurant.';
    defaultBtn = 'EXPLORE POPULAR DISHES';
    defaultHref = '/food';
  } else if (type === 'orders') {
    defaultIcon = <UtensilsCrossed className="w-16 h-16 text-gray-300" />;
    defaultTitle = 'No orders placed yet';
    defaultDesc = 'Looks like you have not placed an order yet.';
    defaultBtn = 'ORDER NOW';
    defaultHref = '/food';
  }

  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto animate-in fade-in duration-300">
      <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 shadow-inner">
        {defaultIcon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title || defaultTitle}
      </h3>
      <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
        {description || defaultDesc}
      </p>

      {actionLink ? (
        <Link
          to={actionLink || defaultHref}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fc8019] hover:bg-[#e56d05] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
        >
          <span>{actionText || defaultBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : onAction ? (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fc8019] hover:bg-[#e56d05] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>{actionText || defaultBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <Link
          to={defaultHref}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fc8019] hover:bg-[#e56d05] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
        >
          <span>{actionText || defaultBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};
