import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { FoodPage } from '../pages/FoodPage';
import { RestaurantDetailPage } from '../pages/RestaurantDetailPage';
import { InstamartPage } from '../pages/InstamartPage';
import { DineoutPage } from '../pages/DineoutPage';
import { DineoutDetailPage } from '../pages/DineoutDetailPage';
import { SearchPage } from '../pages/SearchPage';
import { CartPage } from '../pages/CartPage';
import { HelpPage } from '../pages/HelpPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { AccountPage } from '../pages/AccountPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/food" element={<FoodPage />} />
      <Route path="/restaurants" element={<Navigate to="/food" replace />} />
      <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/food/item/:id" element={<ProductDetailPage />} />
      <Route path="/instamart/product/:id" element={<ProductDetailPage />} />
      <Route path="/instamart" element={<InstamartPage />} />
      <Route path="/dineout" element={<DineoutPage />} />
      <Route path="/dineout/:id" element={<DineoutDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CartPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/support" element={<HelpPage />} />
      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
