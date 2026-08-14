import React, { useState } from 'react';
import {
  LayoutDashboard,
  Palette,
  Sliders,
  Zap,
  Search,
  Menu as MenuIcon,
  Image,
  Award,
  Grid,
  ShoppingBag,
  Sparkles,
  Clock,
  Package,
  Layers,
  Users,
  Tag,
  MessageSquare,
  ExternalLink,
  LogOut,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useAdminConfig } from './context/AdminConfigContext';

// Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { ThemeManager } from './pages/ThemeManager';
import { SectionOrderingHub } from './pages/SectionOrderingHub';
import { TopBarManager } from './pages/TopBarManager';
import { HeaderManager } from './pages/HeaderManager';
import { NavbarManager } from './pages/NavbarManager';
import { HeroManager } from './pages/HeroManager';
import { BrandMarqueeManager } from './pages/BrandMarqueeManager';
import { FeatureStripManager } from './pages/FeatureStripManager';
import { CategoryManager } from './pages/CategoryManager';
import { PopularProductsManager } from './pages/PopularProductsManager';
import { EpicDealsManager } from './pages/EpicDealsManager';
import { FutureArrivalsManager } from './pages/FutureArrivalsManager';
import { BottomFeatureStripManager } from './pages/BottomFeatureStripManager';
import { FooterManager } from './pages/FooterManager';
import { ProductManager } from './pages/ProductManager';
import { OrderManager } from './pages/OrderManager';
import { CustomerManager } from './pages/CustomerManager';
import { OffersManager } from './pages/OffersManager';
import { SupportManager } from './pages/SupportManager';
import { MediaLibrary } from './pages/MediaLibrary';

interface NavSection {
  title: string;
  items: { id: string; label: string; icon: React.ReactNode; badge?: string }[];
}

export const AdminLayout: React.FC<{ onReturnToStore: () => void }> = ({ onReturnToStore }) => {
  const { adminLogout, resetToDefaults } = useAdminConfig();
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navigationSections: NavSection[] = [
    {
      title: 'Overview',
      items: [{ id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> }],
    },
    {
      title: 'Design & Appearance',
      items: [
        { id: 'theme', label: 'Theme & Color Tokens', icon: <Palette className="w-4 h-4" />, badge: 'LIVE' },
        { id: 'sections', label: 'Section Sequence Hub', icon: <Sliders className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Header & Navigation',
      items: [
        { id: 'topOfferBar', label: 'Top Offer Bar', icon: <Zap className="w-4 h-4" /> },
        { id: 'header', label: 'Main Header & Search', icon: <Search className="w-4 h-4" /> },
        { id: 'navbar', label: 'Navigation Bar Links', icon: <MenuIcon className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Homepage Sections',
      items: [
        { id: 'hero', label: 'Hero Banner', icon: <Image className="w-4 h-4" /> },
        { id: 'brandMarquee', label: 'Brand Partners Marquee', icon: <Award className="w-4 h-4" /> },
        { id: 'featureStrip', label: 'Top 5 Feature Strip', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'categorySection', label: 'Shop by Category', icon: <Grid className="w-4 h-4" /> },
        { id: 'popularProducts', label: 'Popular Today ⚡', icon: <Zap className="w-4 h-4" /> },
        { id: 'epicDeals', label: 'Epic Deals All Day', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'futureArrivals', label: 'Future Arrivals', icon: <Clock className="w-4 h-4" /> },
        { id: 'bottomFeatureStrip', label: 'Bottom Benefits Strip', icon: <Package className="w-4 h-4" /> },
        { id: 'footer', label: 'Store Footer', icon: <Layers className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Store Operations',
      items: [
        { id: 'products', label: 'Product Inventory', icon: <Package className="w-4 h-4" /> },
        { id: 'categoriesCrud', label: 'Category Department CRUD', icon: <Grid className="w-4 h-4" /> },
        { id: 'orders', label: 'Orders & Fulfillment', icon: <ShoppingBag className="w-4 h-4" /> },
        { id: 'customers', label: 'Customer Wallets & Pts', icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Campaigns & Care',
      items: [
        { id: 'offers', label: 'Promotional Offers Page', icon: <Tag className="w-4 h-4" /> },
        { id: 'support', label: 'Support Desk Tickets', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'media', label: 'Digital Media Library', icon: <Image className="w-4 h-4" /> },
      ],
    },
  ];

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={(p) => setActivePage(p)} />;
      case 'theme':
        return <ThemeManager />;
      case 'sections':
        return <SectionOrderingHub onNavigateToSection={(id) => setActivePage(id)} />;
      case 'topOfferBar':
        return <TopBarManager />;
      case 'header':
        return <HeaderManager />;
      case 'navbar':
        return <NavbarManager />;
      case 'hero':
        return <HeroManager />;
      case 'brandMarquee':
        return <BrandMarqueeManager />;
      case 'featureStrip':
        return <FeatureStripManager />;
      case 'categorySection':
      case 'categoriesCrud':
        return <CategoryManager />;
      case 'popularProducts':
        return <PopularProductsManager />;
      case 'epicDeals':
        return <EpicDealsManager />;
      case 'futureArrivals':
        return <FutureArrivalsManager />;
      case 'bottomFeatureStrip':
        return <BottomFeatureStripManager />;
      case 'footer':
        return <FooterManager />;
      case 'products':
        return <ProductManager />;
      case 'orders':
        return <OrderManager />;
      case 'customers':
        return <CustomerManager />;
      case 'offers':
        return <OffersManager />;
      case 'support':
        return <SupportManager />;
      case 'media':
        return <MediaLibrary />;
      default:
        return <AdminDashboard onNavigate={(p) => setActivePage(p)} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex font-sans select-none antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-72 bg-slate-950 text-slate-300 flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="flex flex-col h-full">
          {/* Admin Header / Logo */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/farminix_logo.png" alt="Farminix" className="h-8 w-auto object-contain brightness-110" />
              <div>
                <div className="text-xs font-black text-white tracking-wide">FARMINIX CRM</div>
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Control Panel</div>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-left">
            {navigationSections.map((sec) => (
              <div key={sec.title} className="space-y-1">
                <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-1">
                  {sec.title}
                </div>
                {sec.items.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* User Profile & Actions Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 space-y-2">
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">
                  A
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-none">Admin Storekeeper</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-medium">admin@farminix.com</div>
                </div>
              </div>
              <button
                onClick={adminLogout}
                className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Floating App Bar */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Live Store Synchronization Active
              </span>
            </div>
          </div>

          {/* Quick External Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToStore}
              className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Storefront</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset all site customizations to original production defaults?')) {
                  resetToDefaults();
                }
              }}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset System Config"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};
