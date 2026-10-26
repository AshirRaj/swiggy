import { RESTAURANTS } from '../data/restaurants';
import { FOOD_ITEMS } from '../data/foodItems';
import { GROCERY_CATEGORIES, GROCERY_PRODUCTS } from '../data/groceryProducts';
import { DINING_RESTAURANTS } from '../data/diningRestaurants';
import { OFFERS } from '../data/offers';
import { CUISINES } from '../data/cuisines';
import { CITIES, POPULAR_LOCATIONS } from '../data/cities';
import { getStorageItem, setStorageItem } from '../utils/storage';

const ORDERS_KEY = 'swiggy_orders_history';
const BOOKINGS_KEY = 'swiggy_dineout_bookings';
const ADDRESSES_KEY = 'swiggy_saved_addresses';

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    type: 'Home',
    tag: 'Home',
    addressLine: 'Flat 402, Green Glen Apartments, 100ft Road',
    area: 'Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    isDefault: true,
  },
  {
    id: 'addr-2',
    type: 'Work',
    tag: 'Work',
    addressLine: 'Floor 5, Tower B, Helios Business Park, Outer Ring Road',
    area: 'Kadubeesanahalli',
    city: 'Bengaluru',
    pincode: '560103',
    isDefault: false,
  },
];

export const mockApi = {
  // --- RESTAURANTS ---
  async getRestaurants({ sortBy, pureVeg, fastDelivery, rating4Plus, cuisine, search } = {}) {
    await new Promise((res) => setTimeout(res, 80));
    let list = [...RESTAURANTS];

    if (pureVeg) {
      list = list.filter((r) => r.pureVeg);
    }
    if (fastDelivery) {
      list = list.filter((r) => r.isFastDelivery);
    }
    if (rating4Plus) {
      list = list.filter((r) => r.rating >= 4.0);
    }
    if (cuisine) {
      list = list.filter((r) =>
        r.cuisines.some((c) => c.toLowerCase().includes(cuisine.toLowerCase()))
      );
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
          r.area.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      list.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    } else if (sortBy === 'costLowToHigh') {
      list.sort((a, b) => a.costForTwo - b.costForTwo);
    } else if (sortBy === 'costHighToLow') {
      list.sort((a, b) => b.costForTwo - a.costForTwo);
    }

    return list;
  },

  async getRestaurantById(id) {
    await new Promise((res) => setTimeout(res, 50));
    return RESTAURANTS.find((r) => r.id === id) || null;
  },

  async getFoodItems(restaurantId, { isVegOnly, search } = {}) {
    await new Promise((res) => setTimeout(res, 50));
    let items = FOOD_ITEMS.filter((item) => item.restaurantId === restaurantId);

    // If a restaurant doesn't have custom items, generate menu from similar template
    if (items.length === 0) {
      items = FOOD_ITEMS.slice(0, 5).map((it, idx) => ({
        ...it,
        id: `${restaurantId}-gen-${idx}`,
        restaurantId,
      }));
    }

    if (isVegOnly) {
      items = items.filter((item) => item.isVeg);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    return items;
  },

  async getProductById(id) {
    await new Promise((res) => setTimeout(res, 40));
    // Check in food items
    const foodItem = FOOD_ITEMS.find((f) => f.id === id);
    if (foodItem) {
      const restaurant = RESTAURANTS.find((r) => r.id === foodItem.restaurantId) || null;
      const related = FOOD_ITEMS.filter(
        (f) => f.restaurantId === foodItem.restaurantId && f.id !== id
      ).slice(0, 6);
      return {
        ...foodItem,
        type: 'food',
        restaurant,
        related,
      };
    }
    // Check in grocery products
    const grocery = GROCERY_PRODUCTS.find((g) => g.id === id);
    if (grocery) {
      const related = GROCERY_PRODUCTS.filter(
        (g) => g.category === grocery.category && g.id !== id
      ).slice(0, 6);
      return {
        ...grocery,
        type: 'grocery',
        related,
      };
    }
    return null;
  },

  async getCuisines() {
    return CUISINES;
  },

  async getCities() {
    return { cities: CITIES, popularLocations: POPULAR_LOCATIONS };
  },

  // --- INSTAMART ---
  async getGroceryCategories() {
    return GROCERY_CATEGORIES;
  },

  async getGroceryProducts({ categoryId, search, sortBy } = {}) {
    await new Promise((res) => setTimeout(res, 80));
    let list = [...GROCERY_PRODUCTS];

    if (categoryId && categoryId !== 'all') {
      list = list.filter((p) => p.category === categoryId);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.weight.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'priceLow') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => b.discountPercent - a.discountPercent);
    }

    return list;
  },

  // --- DINEOUT ---
  async getDiningRestaurants({ filter, search, pureVeg } = {}) {
    await new Promise((res) => setTimeout(res, 60));
    let list = [...DINING_RESTAURANTS];

    if (pureVeg) {
      list = list.filter((r) => r.isPureVeg);
    }
    if (filter === 'rooftop') {
      list = list.filter((r) => r.isRooftop);
    } else if (filter === 'buffet') {
      list = list.filter((r) => r.hasBuffet);
    } else if (filter === 'outdoor') {
      list = list.filter((r) => r.hasOutdoorSeating);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.area.toLowerCase().includes(q) ||
          r.cuisines.some((c) => c.toLowerCase().includes(q))
      );
    }

    return list;
  },

  async getDiningRestaurantById(id) {
    await new Promise((res) => setTimeout(res, 50));
    return DINING_RESTAURANTS.find((r) => r.id === id) || null;
  },

  async bookDiningTable(bookingData) {
    await new Promise((res) => setTimeout(res, 200));
    const booking = {
      id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      ...bookingData,
    };
    const bookings = getStorageItem(BOOKINGS_KEY, []);
    setStorageItem(BOOKINGS_KEY, [booking, ...bookings]);
    return booking;
  },

  async getDiningBookings() {
    return getStorageItem(BOOKINGS_KEY, []);
  },

  // --- UNIFIED SEARCH ---
  async searchAll(query) {
    if (!query || !query.trim()) {
      return { restaurants: [], dishes: [], groceries: [], dining: [] };
    }
    const q = query.trim().toLowerCase();

    const matchedRestaurants = RESTAURANTS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
        r.area.toLowerCase().includes(q)
    );

    const matchedDishes = FOOD_ITEMS.filter(
      (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );

    const matchedGroceries = GROCERY_PRODUCTS.filter(
      (item) => item.name.toLowerCase().includes(q) || item.categoryName.toLowerCase().includes(q)
    );

    const matchedDining = DINING_RESTAURANTS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
        r.area.toLowerCase().includes(q)
    );

    return {
      restaurants: matchedRestaurants,
      dishes: matchedDishes,
      groceries: matchedGroceries,
      dining: matchedDining,
    };
  },

  // --- OFFERS ---
  async getOffers() {
    return OFFERS;
  },

  async validateCoupon(code, cartTotal) {
    await new Promise((res) => setTimeout(res, 80));
    if (!code) return { valid: false, message: 'Please enter a coupon code' };
    const coupon = OFFERS.find((o) => o.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code. Try SWIGGY50, TRYNEW or JUMBO150' };
    }
    if (cartTotal < coupon.minOrder) {
      return {
        valid: false,
        message: `Add items worth ₹${coupon.minOrder - cartTotal} more to apply this coupon`,
      };
    }

    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = Math.min((cartTotal * coupon.discountPercent) / 100, coupon.maxDiscount);
    } else if (coupon.type === 'flat') {
      discountAmount = coupon.flatDiscount;
    } else if (coupon.type === 'delivery') {
      discountAmount = 40; // Delivery fee waived
    }

    return {
      valid: true,
      coupon,
      discountAmount,
      message: `Coupon ${coupon.code} applied successfully! You saved ₹${discountAmount}`,
    };
  },

  // --- ORDERS ---
  async placeOrder(orderData) {
    await new Promise((res) => setTimeout(res, 250));
    const order = {
      orderId: 'SWIGGY-' + Math.floor(10000000 + Math.random() * 90000000),
      placedAt: new Date().toISOString(),
      status: 'Order Placed & Confirmed',
      estimatedDelivery: '25-30 mins',
      ...orderData,
    };
    const orders = getStorageItem(ORDERS_KEY, []);
    setStorageItem(ORDERS_KEY, [order, ...orders]);
    return order;
  },

  async getOrders() {
    return getStorageItem(ORDERS_KEY, []);
  },

  // --- ADDRESSES ---
  async getAddresses() {
    const list = getStorageItem(ADDRESSES_KEY, null);
    if (!list) {
      setStorageItem(ADDRESSES_KEY, DEFAULT_ADDRESSES);
      return DEFAULT_ADDRESSES;
    }
    return list;
  },

  async saveAddress(address) {
    const addresses = await this.getAddresses();
    const newAddress = {
      id: 'addr-' + Date.now(),
      isDefault: addresses.length === 0,
      ...address,
    };
    const updated = [newAddress, ...addresses];
    setStorageItem(ADDRESSES_KEY, updated);
    return newAddress;
  },
};
