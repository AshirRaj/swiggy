import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const CART_STORAGE_KEY = 'swiggy_cart_state';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState(() => {
    return getStorageItem(CART_STORAGE_KEY, {
      items: [],
      restaurant: null, // { id, name, area, image }
      coupon: null,
      tip: 0,
      cutleryNeeded: false,
      cookingInstructions: '',
    });
  });

  // Modal for restaurant conflict (e.g., trying to add from another restaurant)
  const [conflictModalData, setConflictModalData] = useState(null);

  useEffect(() => {
    setStorageItem(CART_STORAGE_KEY, cartState);
  }, [cartState]);

  // Add Item to cart
  const addItem = (item, restaurant = null) => {
    // Check if adding food item from different restaurant
    if (item.restaurantId && cartState.restaurant && cartState.restaurant.id !== item.restaurantId && cartState.items.length > 0) {
      setConflictModalData({
        pendingItem: item,
        pendingRestaurant: restaurant,
      });
      return false;
    }

    setCartState((prev) => {
      const existingIndex = prev.items.findIndex((i) => i.id === item.id);
      let updatedItems = [];

      if (existingIndex > -1) {
        updatedItems = prev.items.map((i, index) =>
          index === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedItems = [...prev.items, { ...item, quantity: 1 }];
      }

      return {
        ...prev,
        restaurant: restaurant || prev.restaurant || (item.restaurantId ? { id: item.restaurantId, name: item.restaurantName || 'Restaurant' } : null),
        items: updatedItems,
      };
    });
    return true;
  };

  // Decrement or Remove Item
  const removeItem = (itemId) => {
    setCartState((prev) => {
      const existing = prev.items.find((i) => i.id === itemId);
      if (!existing) return prev;

      let updatedItems = [];
      if (existing.quantity > 1) {
        updatedItems = prev.items.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        updatedItems = prev.items.filter((i) => i.id !== itemId);
      }

      return {
        ...prev,
        items: updatedItems,
        restaurant: updatedItems.length === 0 ? null : prev.restaurant,
        coupon: updatedItems.length === 0 ? null : prev.coupon,
      };
    });
  };

  const setItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setCartState((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    }));
  };

  const clearCart = () => {
    setCartState({
      items: [],
      restaurant: null,
      coupon: null,
      tip: 0,
      cutleryNeeded: false,
      cookingInstructions: '',
    });
    setConflictModalData(null);
  };

  const resolveConflictReplace = () => {
    if (!conflictModalData) return;
    const { pendingItem, pendingRestaurant } = conflictModalData;
    setCartState({
      items: [{ ...pendingItem, quantity: 1 }],
      restaurant: pendingRestaurant || { id: pendingItem.restaurantId, name: pendingItem.restaurantName || 'Restaurant' },
      coupon: null,
      tip: 0,
      cutleryNeeded: false,
      cookingInstructions: '',
    });
    setConflictModalData(null);
  };

  const cancelConflict = () => {
    setConflictModalData(null);
  };

  const applyCoupon = (couponData) => {
    setCartState((prev) => ({ ...prev, coupon: couponData }));
  };

  const removeCoupon = () => {
    setCartState((prev) => ({ ...prev, coupon: null }));
  };

  const setTip = (amount) => {
    setCartState((prev) => ({ ...prev, tip: amount }));
  };

  const toggleCutlery = () => {
    setCartState((prev) => ({ ...prev, cutleryNeeded: !prev.cutleryNeeded }));
  };

  const setInstructions = (text) => {
    setCartState((prev) => ({ ...prev, cookingInstructions: text }));
  };

  // Calculations
  const calculations = useMemo(() => {
    const totalCount = cartState.items.reduce((acc, item) => acc + item.quantity, 0);
    const itemTotal = cartState.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const isFreeDelivery = itemTotal >= 399 || (cartState.coupon && cartState.coupon.coupon?.freeDelivery);
    const deliveryFee = itemTotal === 0 ? 0 : isFreeDelivery ? 0 : 35;
    const platformFee = itemTotal === 0 ? 0 : 6;
    const gstAndGovCharges = itemTotal === 0 ? 0 : Math.round(itemTotal * 0.05);

    let discountAmount = 0;
    if (cartState.coupon && cartState.coupon.discountAmount) {
      discountAmount = cartState.coupon.discountAmount;
    }

    const toPay = Math.max(0, itemTotal - discountAmount + deliveryFee + platformFee + gstAndGovCharges + (cartState.tip || 0));

    return {
      totalCount,
      itemTotal,
      deliveryFee,
      isFreeDelivery,
      platformFee,
      gstAndGovCharges,
      discountAmount,
      toPay,
    };
  }, [cartState]);

  const getItemQuantity = (itemId) => {
    const found = cartState.items.find((i) => i.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        restaurant: cartState.restaurant,
        coupon: cartState.coupon,
        tip: cartState.tip,
        cutleryNeeded: cartState.cutleryNeeded,
        cookingInstructions: cartState.cookingInstructions,
        ...calculations,
        addItem,
        removeItem,
        setItemQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setTip,
        toggleCutlery,
        setInstructions,
        getItemQuantity,
        conflictModalData,
        resolveConflictReplace,
        cancelConflict,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
