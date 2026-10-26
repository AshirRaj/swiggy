import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  Star 
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { HorizontalCarousel } from '../components/shared/HorizontalCarousel';
import { RestaurantCard } from '../components/food/RestaurantCard';
import { CUISINES } from '../data/cuisines';
import { GROCERY_CATEGORIES } from '../data/groceryProducts';
import { DINING_RESTAURANTS } from '../data/diningRestaurants';
import { useLocation } from '../context/LocationContext';
import { mockApi } from '../services/mockApi';
import {
  FoodDeliveryArt,
  InstamartArt,
  DineoutArt,
  VeggiesDecorativeArt,
  SushiDecorativeArt,
} from '../components/food/HeroIllustrations';
import { AppDownloadBanner } from '../components/common/AppDownloadBanner';

export const HomePage = () => {
  const navigate = useNavigate();
  const { currentLocation, setIsLocationModalOpen } = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMoreCities, setShowMoreCities] = useState(false);

  // 2-row cuisine carousel ref
  const cuisineScrollRef = useRef(null);
  const [canScrollCuisineLeft, setCanScrollCuisineLeft] = useState(false);
  const [canScrollCuisineRight, setCanScrollCuisineRight] = useState(true);

  // Hero cards mobile scroll ref
  const heroCardsRef = useRef(null);
  const [activeHeroCard, setActiveHeroCard] = useState(0);

  const popularCities = [
    'Bangalore',
    'Gurgaon',
    'Hyderabad',
    'Delhi',
    'Mumbai',
    'Pune',
    'Kolkata',
    'Chennai',
    'Ahmedabad',
    'Chandigarh',
    'Jaipur',
    'Kochi',
    'Coimbatore',
    'Lucknow',
    'Nagpur',
    'Indore',
  ];

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await mockApi.getRestaurants({ sortBy: 'rating' });
        setTopRestaurants(data.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTop();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // Cuisine 2-row scroll handlers
  const checkCuisineScroll = () => {
    if (cuisineScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cuisineScrollRef.current;
      setCanScrollCuisineLeft(scrollLeft > 10);
      setCanScrollCuisineRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleCuisinePrev = () => {
    if (cuisineScrollRef.current) {
      cuisineScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      setTimeout(checkCuisineScroll, 300);
    }
  };

  const handleCuisineNext = () => {
    if (cuisineScrollRef.current) {
      cuisineScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      setTimeout(checkCuisineScroll, 300);
    }
  };

  // Hero cards mobile scroll tracker
  const handleHeroCardsScroll = () => {
    if (heroCardsRef.current) {
      const { scrollLeft, clientWidth } = heroCardsRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.78 || 1));
      setActiveHeroCard(Math.min(Math.max(index, 0), 2));
    }
  };

  return (
    <MainLayout isLanding={true}>
      {/* 1. HERO SECTION — VIBRANT SWIGGY ORANGE (100% FULL VIEWPORT WIDTH) */}
      <section className="relative w-full bg-[#ff5200] pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Grocery Bag on Left */}
        <div className="absolute left-0 -top-2 w-32 sm:w-56 md:w-64 h-32 sm:h-56 md:h-64 opacity-20 sm:opacity-95 pointer-events-none select-none z-0">
          <VeggiesDecorativeArt />
        </div>

        {/* Decorative Sushi Board on Right */}
        <div className="absolute right-0 -top-2 w-32 sm:w-56 md:w-64 h-32 sm:h-56 md:h-64 opacity-20 sm:opacity-95 pointer-events-none select-none z-0">
          <SushiDecorativeArt />
        </div>

        {/* Central Content */}
        <div className="max-w-[1240px] mx-auto text-center relative z-10">
          {/* Main Headline matching Official Swiggy */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto drop-shadow-xs">
            Order food &amp; groceries. Discover best restaurants. Swiggy it!
          </h1>

          {/* Search and Location inputs */}
          <div className="mt-7 sm:mt-9 flex flex-col md:flex-row items-stretch justify-center gap-3.5 max-w-3xl mx-auto">
            {/* Location selector pill */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex-1 md:max-w-[280px] bg-white text-gray-800 px-5 py-3.5 sm:py-4 rounded-2xl md:rounded-full shadow-lg flex items-center justify-between text-left hover:bg-orange-50/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className="w-5 h-5 text-[#fc8019] shrink-0" />
                <span className="text-sm font-bold truncate text-gray-800">
                  {currentLocation.area}, {currentLocation.city}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-700 shrink-0" />
            </button>

            {/* Search input pill */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-2 bg-white rounded-2xl md:rounded-full shadow-lg flex items-center px-5 py-2 sm:py-2.5 transition-all focus-within:ring-4 focus-within:ring-white/40"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for restaurant, item or more"
                className="w-full text-sm text-gray-800 placeholder-gray-400 py-2 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="p-2 text-gray-400 hover:text-[#fc8019] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* 3 HERO SERVICE CARDS — INSIDE THE ORANGE HERO SECTION */}
          <div className="mt-8 sm:mt-12 w-full max-w-[1100px] mx-auto">
            <div 
              ref={heroCardsRef}
              onScroll={handleHeroCardsScroll}
              className="flex md:grid md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-2 px-1"
            >
              {/* Card 1: FOOD DELIVERY */}
              <Link
                to="/food"
                className="group bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-[260px] sm:h-[290px] min-w-[78vw] sm:min-w-[280px] md:min-w-0 shrink-0 snap-center text-left"
              >
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    FOOD DELIVERY
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                    FROM RESTAURANTS
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#ff5200] uppercase tracking-wider mt-2.5">
                    UPTO 60% OFF
                  </p>
                </div>

                <div className="relative z-10 flex items-end justify-between mt-auto">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ff5200] group-hover:bg-[#e54900] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-md shadow-orange-500/30">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Transparent Food Platter Artwork */}
                <div className="absolute right-[-10px] bottom-[-10px] w-36 h-36 sm:w-44 sm:h-44 pointer-events-none group-hover:scale-105 transition-transform duration-300">
                  <FoodDeliveryArt />
                </div>
              </Link>

              {/* Card 2: INSTAMART */}
              <Link
                to="/instamart"
                className="group bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-[260px] sm:h-[290px] min-w-[78vw] sm:min-w-[280px] md:min-w-0 shrink-0 snap-center text-left"
              >
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    INSTAMART
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                    INSTANT GROCERY
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#ff5200] uppercase tracking-wider mt-2.5">
                    UPTO 60% OFF
                  </p>
                </div>

                <div className="relative z-10 flex items-end justify-between mt-auto">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ff5200] group-hover:bg-[#e54900] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-md shadow-orange-500/30">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Transparent Grocery Basket Artwork */}
                <div className="absolute right-[-10px] bottom-[-10px] w-36 h-36 sm:w-44 sm:h-44 pointer-events-none group-hover:scale-105 transition-transform duration-300">
                  <InstamartArt />
                </div>
              </Link>

              {/* Card 3: DINEOUT */}
              <Link
                to="/dineout"
                className="group bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-[260px] sm:h-[290px] min-w-[78vw] sm:min-w-[280px] md:min-w-0 shrink-0 snap-center text-left"
              >
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    DINEOUT
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                    EAT OUT &amp; SAVE MORE
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#ff5200] uppercase tracking-wider mt-2.5">
                    UPTO 50% OFF
                  </p>
                </div>

                <div className="relative z-10 flex items-end justify-between mt-auto">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ff5200] group-hover:bg-[#e54900] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-md shadow-orange-500/30">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Transparent Fine Dining Artwork */}
                <div className="absolute right-[-10px] bottom-[-10px] w-36 h-36 sm:w-44 sm:h-44 pointer-events-none group-hover:scale-105 transition-transform duration-300">
                  <DineoutArt />
                </div>
              </Link>
            </div>

            {/* Slider track indicator below cards */}
            <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8 text-white/80">
              <button 
                onClick={() => {
                  if (heroCardsRef.current) {
                    heroCardsRef.current.scrollBy({ left: -260, behavior: 'smooth' });
                  }
                }}
                className="p-1 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-20 sm:w-28 h-1 bg-white/30 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ 
                    width: '33.33%',
                    transform: `translateX(${activeHeroCard * 100}%)` 
                  }}
                />
              </div>
              <button 
                onClick={() => {
                  if (heroCardsRef.current) {
                    heroCardsRef.current.scrollBy({ left: 260, behavior: 'smooth' });
                  }
                }}
                className="p-1 hover:text-white transition-colors cursor-pointer"
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: FOOD CATEGORIES & CUISINES — 2 ROWS (MATCHING SCREENSHOT 3) */}
      <section className="page-container py-8 sm:py-12 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Order our best food options
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCuisinePrev}
              disabled={!canScrollCuisineLeft}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                canScrollCuisineLeft
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer shadow-xs'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleCuisineNext}
              disabled={!canScrollCuisineRight}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                canScrollCuisineRight
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer shadow-xs'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-ROW GRID CAROUSEL (8 items per row side-by-side) */}
        <div
          ref={cuisineScrollRef}
          onScroll={checkCuisineScroll}
          className="grid grid-rows-2 grid-flow-col auto-cols-max gap-x-5 sm:gap-x-7 gap-y-4 sm:gap-y-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {CUISINES.map((item) => (
            <Link
              key={item.id}
              to={`/food?cuisine=${encodeURIComponent(item.name)}`}
              className="flex flex-col items-center w-24 sm:w-28 group text-center cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-50 border border-gray-100 group-hover:scale-105 transition-all duration-200 shadow-xs">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#fc8019] transition-colors truncate max-w-full">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SECTION: SHOP GROCERIES ON INSTAMART (MATCHING SCREENSHOT 2 & 3) */}
      <section className="page-container py-8 sm:py-12 border-b border-gray-100">
        <HorizontalCarousel
          title="Shop groceries on Instamart"
          subtitle="Delivered to your doorstep in 10 minutes"
          actionText="Visit Instamart"
          onAction={() => navigate('/instamart')}
        >
          {GROCERY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/instamart?category=${cat.id}`}
              className="flex flex-col items-center shrink-0 w-28 sm:w-36 group cursor-pointer"
            >
              {/* Rounded soft card container */}
              <div className="w-full h-28 sm:h-36 rounded-2xl sm:rounded-[22px] bg-[#f2f4f7] p-3 sm:p-4 flex items-center justify-center group-hover:bg-[#ebedf0] transition-colors overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              {/* 2-line category label */}
              <span className="mt-2 text-xs sm:text-sm font-bold text-gray-900 text-center leading-tight line-clamp-2 px-1 group-hover:text-[#5a2c91] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </HorizontalCarousel>
      </section>

      {/* 4. SECTION: DISCOVER BEST RESTAURANTS ON DINEOUT (MATCHING SCREENSHOT 2) */}
      <section className="page-container py-8 sm:py-12 border-b border-gray-100">
        <HorizontalCarousel
          title="Discover best restaurants on Dineout"
          subtitle="Book tables and get up to 50% discount on food bills"
          actionText="See all dining"
          onAction={() => navigate('/dineout')}
        >
          {DINING_RESTAURANTS.map((dining) => (
            <Link
              key={dining.id}
              to={`/dineout/${dining.id}`}
              className="shrink-0 w-72 sm:w-[340px] group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
            >
              {/* Image with discount badge and name overlay */}
              <div className="relative h-44 sm:h-48 bg-gray-100 overflow-hidden">
                <img
                  src={dining.image}
                  alt={dining.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Red Discount Badge */}
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#e43b4f] text-white font-extrabold text-[11px] rounded uppercase shadow-sm">
                  {dining.discountBadge}
                </span>

                {/* Dark gradient overlay with Restaurant Name and Rating */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between p-3">
                  <h3 className="text-white font-extrabold text-sm sm:text-base drop-shadow-sm truncate pr-2">
                    {dining.name}
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#22a159] text-white font-black text-xs rounded shrink-0">
                    ★ {dining.rating}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-3.5">
                {/* Line 1: Cuisines & Cost */}
                <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
                  <span className="truncate">{dining.cuisines.join(' • ')}</span>
                  <span className="shrink-0">{dining.costForTwoString}</span>
                </div>

                {/* Line 2: Locality & Distance */}
                <div className="flex justify-between items-center text-xs text-gray-400 mt-1 font-medium">
                  <span className="truncate">{dining.area}</span>
                  <span className="shrink-0">{dining.distance || '1.8 km'}</span>
                </div>

                {/* Line 3: Bright green pre-booking offer pill */}
                <div className="mt-2.5 py-1.5 px-3 bg-[#1ba672] text-white rounded-lg flex items-center justify-between text-xs font-bold shadow-xs">
                  <span className="flex items-center gap-1.5 truncate">
                    ⚡ {dining.offerText || 'Flat 20% off on pre-booking'}
                  </span>
                  <span className="text-[11px] font-semibold opacity-90 shrink-0">
                    {dining.extraOffers || '+2 more'}
                  </span>
                </div>

                {/* Line 4: Bank offer badge */}
                <div className="mt-1.5 py-1 px-2.5 bg-[#e8f6f0] text-[#1ba672] rounded-md text-[11px] font-bold">
                  {dining.bankOffer || 'Up to 10% off with bank offers'}
                </div>

                {/* Line 5: Welcome offer */}
                <p className="mt-1.5 text-[11px] font-bold text-[#5a2c91] pl-0.5">
                  {dining.welcomeOffer || 'Get extra 10% off using WELCOME'}
                </p>
              </div>
            </Link>
          ))}
        </HorizontalCarousel>
      </section>

      {/* 5. SECTION: TOP RESTAURANT CHAINS (MATCHING SCREENSHOT 1 & 4) */}
      <section className="page-container py-8 sm:py-12 border-b border-gray-100">
        <HorizontalCarousel
          title={`Top restaurant chains in ${currentLocation.city}`}
          actionText="Explore all restaurants"
          onAction={() => navigate('/food')}
        >
          {topRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="shrink-0 w-64 sm:w-72">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </HorizontalCarousel>
      </section>

      {/* 6. SECTION: APP DOWNLOAD BANNER (MATCHING SCREENSHOT 2) */}
      <section className="page-container">
        <AppDownloadBanner />
      </section>

      {/* 7. SECTION: CITIES WITH FOOD DELIVERY (MATCHING SCREENSHOT 2) */}
      <section className="page-container py-8 sm:py-12">
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-6">
          Cities with food delivery
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 text-xs text-gray-600 font-semibold">
          {popularCities.slice(0, showMoreCities ? popularCities.length : 11).map((city) => (
            <Link
              key={city}
              to="/food"
              className="py-3.5 px-4 bg-white rounded-xl border border-gray-200/80 hover:border-[#fc8019] hover:text-[#fc8019] shadow-2xs hover:shadow-xs transition-all truncate text-center sm:text-left"
            >
              Order food online in {city}
            </Link>
          ))}

          {/* Toggle pill */}
          <button
            onClick={() => setShowMoreCities(!showMoreCities)}
            className="py-3.5 px-4 bg-white rounded-xl border border-gray-200/80 font-bold text-[#fc8019] flex items-center justify-center gap-1.5 hover:bg-orange-50/50 shadow-2xs transition-colors cursor-pointer"
          >
            <span>{showMoreCities ? 'Show Less' : 'Show More'}</span>
            {showMoreCities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </section>
    </MainLayout>
  );
};
