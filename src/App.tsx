import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminConfigProvider, useAdminConfig } from './admin/context/AdminConfigContext';
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

// Pages
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { OffersPage } from './components/OffersPage';
import { AccountDashboard } from './components/AccountDashboard';
import { CheckoutPage } from './components/CheckoutPage';

// Admin CRM Components
import { AdminLayout } from './admin/AdminLayout';
import { AdminAuth } from './admin/AdminAuth';

// Modals
import { CartDrawer } from './modals/CartDrawer';
import { CheckoutModal } from './modals/CheckoutModal';
import { LocationModal } from './modals/LocationModal';
import { AuthModal } from './modals/AuthModal';
import { ProductModal } from './modals/ProductModal';
import { TrackOrderModal } from './modals/TrackOrderModal';
import { SupportModal } from './modals/SupportModal';

import { Shield } from 'lucide-react';

export function AppContent() {
  const { currentRoute, navigate } = useApp();
  const { config, isAdminLoggedIn } = useAdminConfig();

  // Handle Admin CRM Route
  if (currentRoute.pathname === '/admin') {
    if (!isAdminLoggedIn) {
      return <AdminAuth onBackToStore={() => navigate('/')} />;
    }
    return <AdminLayout onReturnToStore={() => navigate('/')} />;
  }

  const renderDynamicHomepageSections = () => {
    const sortedSections = [...config.sectionOrder]
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order);

    const sectionComponentMap: Record<string, React.ReactNode> = {
      hero: <HeroBanner key="hero" />,
      brandMarquee: <BrandMarquee key="brandMarquee" />,
      featureStrip: <FeatureStrip key="featureStrip" />,
      categorySection: <CategorySection key="categorySection" />,
      popularProducts: <PopularProducts key="popularProducts" />,
      epicDeals: <DealsSection key="epicDeals" />,
      futureArrivals: <FutureArrivals key="futureArrivals" />,
      bottomFeatureStrip: <BottomFeatureStrip key="bottomFeatureStrip" />,
    };

    return (
      <div className="flex flex-col gap-0 pb-8">
        {sortedSections.map((sec) => sectionComponentMap[sec.id] || null)}
      </div>
    );
  };

  const renderMainContent = () => {
    const isSearchPage = currentRoute.pathname === '/products' || currentRoute.searchParams.has('search') || currentRoute.searchParams.has('category');
    const isDetailPage = currentRoute.pathname.startsWith('/product/');
    const isOffersPage = currentRoute.pathname === '/offers';
    const isAccountPage = currentRoute.pathname === '/account';
    const isCheckoutPage = currentRoute.pathname === '/checkout';

    if (isCheckoutPage) {
      return <CheckoutPage />;
    }

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

    return renderDynamicHomepageSections();
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col relative">
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

      {/* Floating Admin CRM Access Pill */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => navigate('/admin')}
          className="group flex items-center gap-2 bg-slate-950/90 hover:bg-slate-900 text-white px-3.5 py-2 rounded-full shadow-lg border border-slate-700/80 backdrop-blur-md text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Farminix Admin CRM"
        >
          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white">
            <Shield className="w-3 h-3" />
          </div>
          <span className="tracking-wide">Admin CRM</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AdminConfigProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AdminConfigProvider>
  );
}

