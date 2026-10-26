import React, { useRef, useState, useEffect } from 'react';
import { SectionHeading } from './SectionHeading';

export const HorizontalCarousel = ({
  title,
  subtitle,
  children,
  actionText,
  onAction,
  scrollDistance = 450,
  className = '',
}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className={`w-full ${className}`}>
      {title && (
        <SectionHeading
          title={title}
          subtitle={subtitle}
          onPrev={handlePrev}
          onNext={handleNext}
          canScrollPrev={canScrollLeft}
          canScrollNext={canScrollRight}
          actionText={actionText}
          onAction={onAction}
        />
      )}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-3"
      >
        {children}
      </div>
    </section>
  );
};
