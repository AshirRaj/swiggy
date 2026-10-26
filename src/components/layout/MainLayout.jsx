import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { LocationSelector } from '../common/LocationSelector';
import { LoginModal } from '../common/LoginModal';
import { CartConflictModal } from '../cart/CartConflictModal';
import { FloatingCartBar } from '../cart/FloatingCartBar';

export const MainLayout = ({ children, isLanding = false }) => {
  const location = useLocation();
  const isHomePage = isLanding || location.pathname === '/';

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-white text-[#02060c] selection:bg-[#fc8019] selection:text-white">
      {/* Header */}
      <Header isLanding={isHomePage} />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col w-full min-w-0">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <LocationSelector />
      <LoginModal />
      <CartConflictModal />
      <FloatingCartBar />
    </div>
  );
};
