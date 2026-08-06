import { AppProvider } from './context/AppContext';
import { MainHeader } from './components/MainHeader';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
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

    if (isSearchPage) {
      return <ProductListingPage />;
    }

    if (isDetailPage) {
      return <ProductDetailPage />;
    }

    return (
      <>
        {/* HERO BANNER */}
        <HeroBanner />

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
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex flex-col items-center">
      {/* Maximum Width Center Aligned Container */}
      <div className="w-full max-w-[1440px] bg-white shadow-xl min-h-screen flex flex-col my-0 sm:my-2 sm:rounded-[24px] overflow-hidden border border-gray-100/60">
        
        {/* MAIN HEADER (80px) */}
        <MainHeader />

        {/* NAVIGATION (60px) */}
        <Navbar />

        {/* MAIN CONTENT BODY */}
        <main className="flex-1">
          {renderMainContent()}
        </main>

        {/* FOOTER */}
        <Footer />
      </div>

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
