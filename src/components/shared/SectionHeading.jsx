import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const SectionHeading = ({
  title,
  subtitle,
  onPrev,
  onNext,
  canScrollPrev = false,
  canScrollNext = true,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex items-end justify-between mb-6 ${className}`}>
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actionText && (
          <button
            onClick={onAction}
            className="text-xs sm:text-sm font-bold text-[#fc8019] hover:underline mr-2"
          >
            {actionText}
          </button>
        )}

        {(onPrev || onNext) && (
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={!canScrollPrev}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={!canScrollNext}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
