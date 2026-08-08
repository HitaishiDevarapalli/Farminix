import { AppProvider } from './context/AppContext';
import { MainHeader } from './components/MainHeader';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { BrandMarquee } from './components/BrandMarquee';
import { FeatureStrip } from './components/FeatureStrip';
import { CategorySection } from './components/CategorySection';
import { CategoryPage } from './components/CategoryPage';
import { PopularProducts } from './components/PopularProducts';
import { DealsSection } from './components/DealsSection';
import { FutureArrivals } from './components/FutureArrivals';
import { BottomFeatureStrip } from './components/BottomFeatureStrip';
import { Footer } from './components/Footer';

import { useApp } from './context/AppContext';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { OffersPage } from './components/OffersPage';
import { AccountDashboard } from './components/AccountDashboard';

// Modals
import { CartDrawer } from './modals/CartDrawer';
import { CheckoutModal } from './modals/CheckoutModal';
import { LocationModal } from './modals/LocationModal';
import { AuthModal } from './modals/AuthModal';
import { ProductModal } from './modals/ProductModal';
import { TrackOrderModal } from './modals/TrackOrderModal';
import { SupportModal } from './modals/SupportModal';

export function AppContent() {
  const { currentRoute } = useApp();

  const renderMainContent = () => {
    const isSearchPage = currentRoute.pathname === '/products' || currentRoute.searchParams.has('search') || currentRoute.searchParams.has('category');
    const isDetailPage = currentRoute.pathname.startsWith('/product/');
    const isOffersPage = currentRoute.pathname === '/offers';
    const isAccountPage = currentRoute.pathname === '/account';

    if (isAccountPage) {
      return <AccountDashboard />;
    }

    if (isOffersPage) {
      return <OffersPage />;
    }

    if (isSearchPage) {
      return <ProductListingPage />;
    }

    if (isDetailPage) {
      return <ProductDetailPage />;
    }

    return (
      <div className="flex flex-col gap-0 pb-8">
        {/* HERO BANNER */}
        <HeroBanner />

        {/* TRUSTED BRANDS MARQUEE */}
        <BrandMarquee />

        {/* FEATURE STRIP (5 cards) */}
        <FeatureStrip />

        {/* SHOP BY CATEGORY */}
        <CategorySection />

        {/* POPULAR TODAY ⚡ */}
        <PopularProducts />

        {/* EPIC DEALS ALL DAY */}
        <DealsSection />

        {/* FUTURE ARRIVALS AUTO SLIDER */}
        <FutureArrivals />

        {/* BOTTOM FEATURE STRIP (4 boxes) */}
        <BottomFeatureStrip />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* MAIN HEADER */}
      <MainHeader />

      {/* NAVIGATION */}
      <Navbar />

      {/* MAIN CONTENT BODY */}
      <main className="flex-1 w-full">
        {renderMainContent()}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS & DRAWERS */}
      <CartDrawer />
      <CheckoutModal />
      <LocationModal />
      <AuthModal />
      <ProductModal />
      <TrackOrderModal />
      <SupportModal />
      <CategoryPage />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
