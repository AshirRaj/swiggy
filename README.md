# Complete Swiggy Frontend Clone (React + Vite + Tailwind CSS)

A pixel-perfect, production-grade frontend recreation of the official [Swiggy](https://www.swiggy.com/) platform built with modern component-based architecture in React, Vite, Tailwind CSS v4, Lucide React, and React Router.

Reverse-engineered directly from live website inspection of **Swiggy Homepage**, **Food Delivery**, **Restaurant Menu**, **Instamart (Instant Grocery)**, **Dineout (Table Reservations)**, **Checkout Flow**, **Unified Search**, **Account Management**, and **Help & Support**.

---

## 🚀 Live Demo & Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Launch

```bash
# 1. Navigate into project directory
cd swiggy

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the Vite local development server
npm run dev

# 4. Open in your browser
# URL: http://localhost:5173/
```

### Production Build & Preview

```bash
# Build production bundle (optimized & minified)
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 Implemented Routes & User Journeys

| Route | Page | Key Features & Interactions |
|---|---|---|
| `/` | **Swiggy Homepage** | Vibrant `#ff5200` hero, location selector pill, global search, 3 prominent service cards (Food Delivery, Instamart, Dineout), "Order our best food options" cuisine carousel, Instamart groceries carousel, Dineout restaurants carousel, top chains, and full Swiggy footer. |
| `/food` | **Food Delivery** | Internal header with sticky location picker, "What's on your mind?" circular carousel, "Top restaurant chains" carousel, interactive filter chips bar (Sort By, Fast Delivery, Ratings 4.0+, Pure Veg, Offers), 12+ restaurant cards with image discount banners. |
| `/restaurant/:id` | **Restaurant Detail & Menu** | Breadcrumb navigation, restaurant header card with ratings, outlet info, and delivery estimate; "Deals For You" coupon copy carousel; search in menu; Veg / Non-Veg / Bestseller toggles; collapsible menu categories (Recommended, Starters, Mains, Desserts); food dish cards with Veg/Non-veg badges, pricing, descriptions, and floating `ADD` buttons that transform into `- 1 +` quantity counters; bottom sticky cart bar; restaurant FAQs. |
| `/instamart` | **Swiggy Instamart** | Custom purple Instamart header with "⚡ 4 Mins Delivery" pill; grocery promotional banners; category navigation (Fresh Veggies, Fruits, Dairy, Munchies, Drinks); grocery product cards with discount badges (`50% OFF`), `4 MINS` tag, weights, prices with strike-through MRP, and instant quantity selectors. |
| `/dineout` | **Swiggy Dineout** | Dark hero banner with skyline ambiance; category filters (Rooftop, Buffet, Outdoor, Pure Veg); dining venue cards with discount badges (`FLAT 25% OFF`, `BUFFET AT ₹699`); "Book Table" action opening the interactive reservation modal. |
| `/dineout/:id` | **Dineout Venue Detail** | Large venue photo banner; address, star ratings, and review count; venue highlights (Valet, Live Music, Full Bar); list of Dineout Pay offers; sticky table reservation card. |
| `/search` | **Unified Global Search** | Search input with clear button; popular searches pills (Biryani, Pizza, Burger, Milk, etc.); tab switcher (All, Dishes, Restaurants, Instamart, Dineout); live instant search across 4 datasets with highlighted matches. |
| `/cart` or `/checkout` | **Cart & Checkout Flow** | Saved delivery addresses (Home, Work, Other) with "+ Add New Address" form modal; simulated payment method picker (UPI, Cards, Cash on Delivery); Cart Summary with restaurant header, item list, cooking instructions note, cutlery toggle; "Savings Corner" with working promo codes (`SWIGGY50`, `TRYNEW`, `JUMBO150`) with instant mathematical deductions; delivery partner tips; complete bill details; and live simulated order status tracker. |
| `/account` | **My Account** | User profile with avatar and "Swiggy One Active" gold badge; tabbed interface: Past Orders history, Dineout Bookings vouchers, Saved Addresses, and Swiggy One membership benefits; simulated logout. |
| `/help` or `/support` | **Help & Support** | Dark header; categorized FAQs (General, Partner Onboarding, Legal, Instamart); interactive accordions; "Live Chat" and "Email Us" action buttons with simulated support agent response toasts. |

---

## 🏗️ Component-Based Architecture

```
swiggy/
├── index.html                  # Swiggy meta tags, Google Fonts (Plus Jakarta Sans, Inter), Favicon
├── vite.config.js              # Vite 8 with @tailwindcss/vite plugin
├── package.json
├── src/
│   ├── main.jsx                # React 19 entry point
│   ├── App.jsx                 # Provider hierarchy, ScrollToTop, Router
│   ├── index.css               # Tailwind CSS v4, custom scrollbars, animations
│   ├── routes/
│   │   └── AppRoutes.jsx       # Route definitions connecting all pages
│   ├── context/
│   │   ├── CartContext.jsx     # Shared cart state, item quantities, totals, conflict handling
│   │   ├── LocationContext.jsx # Active location, GPS detection simulation, modal state
│   │   ├── AuthContext.jsx     # Simulated Phone OTP authentication, profile, Swiggy One
│   │   └── ToastContext.jsx    # Success, error, and info toast notifications
│   ├── services/
│   │   └── mockApi.js          # Centralized service layer (ready for MERN backend connection)
│   ├── data/
│   │   ├── restaurants.js      # 12+ restaurants with ratings, cuisines, outlets, offers
│   │   ├── foodItems.js        # Categorized menu items (Pizzas, Biryanis, Starters, Desserts)
│   │   ├── groceryProducts.js  # Instamart categories and grocery items with discounts
│   │   ├── diningRestaurants.js# Dineout venues with time slots and discounts
│   │   ├── offers.js           # Working coupon codes (SWIGGY50, TRYNEW, JUMBO150)
│   │   ├── cuisines.js         # Circular cuisine options with images
│   │   └── cities.js           # Indian metro cities and popular delivery areas
│   ├── utils/
│   │   ├── currency.js         # INR currency formatting (₹)
│   │   └── storage.js          # LocalStorage wrapper with safe JSON serialization
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.jsx            # Swiggy SVG Logo (Default, White, Instamart, Dineout)
│   │   │   ├── Header.jsx          # Dual-mode header (Landing Orange vs Internal White)
│   │   │   ├── Footer.jsx          # Comprehensive footer with 685 cities, legal, social, apps
│   │   │   ├── LocationSelector.jsx# Location modal with GPS detect & area search
│   │   │   ├── LoginModal.jsx      # Slide-in right drawer for Phone + Demo OTP (1234)
│   │   │   ├── SearchBar.jsx       # Reusable search input with clear trigger
│   │   │   ├── LoadingSkeleton.jsx # Pulse skeleton cards for food and groceries
│   │   │   └── EmptyState.jsx      # Reusable empty cart, search, and orders states
│   │   ├── layout/
│   │   │   └── MainLayout.jsx      # Root layout wrapping Header, Modals, Footer, Cart Float
│   │   ├── food/
│   │   │   ├── RestaurantCard.jsx  # Restaurant card with discount banner & rating badge
│   │   │   ├── RestaurantGrid.jsx  # Responsive grid with skeletons & empty state
│   │   │   ├── CuisineCarousel.jsx # "What's on your mind?" circular carousel
│   │   │   ├── MenuCategory.jsx    # Collapsible menu category accordion
│   │   │   └── FoodItemCard.jsx    # Food item with Veg/Non-veg dot & ADD selector
│   │   ├── instamart/
│   │   │   ├── InstamartHeader.jsx # Instamart branding, 4-min delivery, grocery search
│   │   │   ├── GroceryCategoryGrid.jsx # Category filter pill bar
│   │   │   └── GroceryProductCard.jsx  # Product card with 4 MINS, discount tag, price
│   │   ├── dineout/
│   │   │   ├── DiningRestaurantCard.jsx# Dining card with discount badge & book button
│   │   │   └── TableBookingForm.jsx    # Reservation modal with date, time, guests, voucher
│   │   ├── cart/
│   │   │   ├── CartItem.jsx        # Cart line item with quantity controller
│   │   │   ├── CartSummary.jsx     # Bill breakdown, coupon validation, tip, cutlery
│   │   │   ├── CartConflictModal.jsx# Prompt when adding from a different restaurant
│   │   │   └── FloatingCartBar.jsx # Sticky bottom green bar with active items & total
│   │   └── shared/
│   │       ├── SectionHeading.jsx  # Title, subtitle, and navigation arrows
│   │       ├── HorizontalCarousel.jsx # Smooth scrollable container with arrows
│   │       ├── FilterChips.jsx     # Sort By dropdown, Pure Veg, Ratings 4.0+
│   │       ├── QuantitySelector.jsx# Classic ADD button / - 1 + counter
│   │       └── PriceDisplay.jsx    # Price with strikethrough MRP
│   └── pages/
│       ├── HomePage.jsx
│       ├── FoodPage.jsx
│       ├── RestaurantDetailPage.jsx
│       ├── InstamartPage.jsx
│       ├── DineoutPage.jsx
│       ├── DineoutDetailPage.jsx
│       ├── SearchPage.jsx
│       ├── CartPage.jsx
│       ├── AccountPage.jsx
│       └── HelpPage.jsx
```

---

## 🔌 Future Backend Integration (MERN Stack Ready)

All data access is decoupled into `src/services/mockApi.js`. When you are ready to connect your Node.js / Express / MongoDB backend:

1. Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
2. In `src/services/mockApi.js`, replace the mock promises with `fetch` or `axios` calls pointing to your backend endpoints:
   ```javascript
   const API_BASE = import.meta.env.VITE_API_BASE_URL;

   // Example:
   export const mockApi = {
     async getRestaurants(params) {
       const res = await fetch(`${API_BASE}/restaurants?${new URLSearchParams(params)}`);
       return res.json();
     },
     async placeOrder(orderData) {
       const res = await fetch(`${API_BASE}/orders`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(orderData),
       });
       return res.json();
     },
     // ...
   };
   ```
3. None of your UI components or pages need to change because they consume the centralized service methods!
