import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  MapPin, 
  Tag, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  Check,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { QuantitySelector } from '../components/shared/QuantitySelector';
import { HorizontalCarousel } from '../components/shared/HorizontalCarousel';
import { formatCurrency } from '../utils/currency';
import { mockApi } from '../services/mockApi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { OFFERS } from '../data/offers';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, removeItem, getItemQuantity } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    mockApi.getProductById(id).then((data) => {
      if (!isMounted) return;
      setProduct(data);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="page-container py-8 max-w-5xl">
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full aspect-square bg-gray-200 rounded-3xl animate-pulse"></div>
            <div className="space-y-4">
              <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/2 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="page-container py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-[#fc8019] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Product not found</h2>
          <p className="text-sm text-gray-500 mt-2">
            The item you are looking for is currently unavailable or does not exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#fc8019] text-white font-bold rounded-xl text-sm shadow-md hover:bg-[#e56d05] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </MainLayout>
    );
  }

  const quantity = getItemQuantity(product.id);

  const handleAdd = () => {
    const success = addItem(product, product.restaurant);
    if (success) {
      showToast(`Added ${product.name} to cart`);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  const isFood = product.type === 'food';
  const isGrocery = product.type === 'grocery';

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discountPercent || 0;

  return (
    <MainLayout>
      <div className="page-container py-6 sm:py-8 max-w-5xl w-full min-w-0">
        {/* Top Breadcrumb & Back Action */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-[#fc8019] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            {isFood && (
              <>
                <Link to="/food" className="hover:text-[#fc8019] transition-colors">Food Delivery</Link>
                {product.restaurant && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    <Link to={`/restaurant/${product.restaurant.id}`} className="hover:text-[#fc8019] transition-colors truncate max-w-[150px]">
                      {product.restaurant.name}
                    </Link>
                  </>
                )}
              </>
            )}
            {isGrocery && (
              <>
                <Link to="/instamart" className="hover:text-[#fc8019] transition-colors">Instamart</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-700">{product.categoryName || 'Grocery'}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-bold truncate max-w-[180px] sm:max-w-none">{product.name}</span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
              } else {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Link copied to clipboard!');
              }
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 text-gray-600 text-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Product Hero Layout: 2 Columns on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-8 shadow-xs">
          {/* Left: Product Image & Badges */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[420px] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />

              {/* Discount Badge */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#ff5200] text-white font-black text-xs rounded-lg uppercase tracking-wider shadow-md">
                  {discountPercent}% OFF
                </div>
              )}

              {/* Veg / Non-Veg badge for food */}
              {isFood && (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg shadow-sm border border-gray-200">
                  <div
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                      product.isVeg ? 'border-[#0f8a65]' : 'border-[#e43b4f]'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.isVeg ? 'bg-[#0f8a65]' : 'bg-[#e43b4f]'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quality Guarantee Badges */}
            <div className="w-full max-w-[420px] grid grid-cols-2 gap-3 mt-4 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">Quality Assured</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <Zap className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="truncate">{isGrocery ? '10 Mins Delivery' : 'Fast Delivery'}</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Add to Cart */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category / Restaurant Tag */}
              <div className="flex items-center gap-2 mb-2">
                {isFood && product.restaurant && (
                  <Link
                    to={`/restaurant/${product.restaurant.id}`}
                    className="text-xs font-bold text-[#fc8019] hover:underline uppercase tracking-wider"
                  >
                    From {product.restaurant.name}
                  </Link>
                )}
                {isGrocery && (
                  <span className="text-xs font-bold text-[#5a2c91] uppercase tracking-wider">
                    {product.categoryName || 'Instamart Grocery'}
                  </span>
                )}
                {product.isBestseller && (
                  <span className="text-[10px] font-black tracking-wide text-[#ee5a36] bg-orange-50 px-2 py-0.5 rounded-full uppercase">
                    ★ Bestseller
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Weight / Pack size for groceries */}
              {product.weight && (
                <p className="text-sm font-semibold text-gray-500 mt-1">
                  Net Qty: {product.weight}
                </p>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#22a159] text-white text-xs font-black rounded-lg shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    ({product.reviewsCount || product.ratingCount || '500+'} reviews)
                  </span>
                </div>
              )}

              <hr className="my-5 border-gray-100" />

              {/* Price Row */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-gray-400 line-through font-medium">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-extrabold text-[#0f8a65] bg-emerald-50 px-2 py-1 rounded-md">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Delivery ETA Pill */}
              <div className="mt-4 p-3 bg-orange-50/60 border border-orange-100 rounded-2xl flex items-center gap-2.5 text-xs font-semibold text-gray-800">
                <div className="w-7 h-7 rounded-full bg-[#ff5200] text-white flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-gray-900 font-bold">
                    {isGrocery ? 'Superfast Delivery in 10 mins' : `Doorstep Delivery in ${product.restaurant?.deliveryTime || '20-25 mins'}`}
                  </p>
                  <p className="text-[11px] text-gray-500 font-normal">
                    Directly delivered to your current location.
                  </p>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Description
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            {/* Action Bar / Add to Cart */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Total Price</p>
                <p className="text-xl font-black text-gray-900">
                  {formatCurrency(product.price * (quantity || 1))}
                </p>
              </div>

              <div className="shrink-0">
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={handleAdd}
                  onDecrement={handleRemove}
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Applicable Offers Section */}
        <div className="mt-8 bg-gray-50/80 rounded-3xl p-5 sm:p-7 border border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-[#fc8019]" />
            <span>Offers Applicable on this order</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {OFFERS.slice(0, 3).map((deal) => (
              <div
                key={deal.code}
                onClick={() => {
                  navigator.clipboard?.writeText(deal.code);
                  showToast(`Coupon code ${deal.code} copied!`);
                }}
                className="p-3 bg-white border border-gray-200 rounded-2xl flex items-center gap-3 hover:border-[#fc8019] transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-orange-100 text-[#fc8019] font-black text-xs flex items-center justify-center shrink-0">
                  %
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{deal.title}</p>
                  <p className="text-[10px] text-gray-400 font-semibold">USE {deal.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel */}
        {product.related && product.related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <HorizontalCarousel
              title={isFood ? "More items from this restaurant" : "Similar items you might like"}
              subtitle="Handpicked recommendations based on your selection"
            >
              {product.related.map((rel) => (
                <div
                  key={rel.id}
                  className="shrink-0 w-52 sm:w-60 bg-white rounded-2xl border border-gray-200/80 p-3 flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <Link to={`/product/${rel.id}`} className="block">
                    <div className="w-full h-32 rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center mb-2">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover:text-[#fc8019] transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs font-bold text-gray-800 mt-1">
                      {formatCurrency(rel.price)}
                    </p>
                  </Link>

                  <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
                    <Link
                      to={`/product/${rel.id}`}
                      className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-[#fc8019] font-bold text-xs rounded-xl transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </HorizontalCarousel>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
