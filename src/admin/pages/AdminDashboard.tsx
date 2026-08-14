import React from 'react';
import {
  ShoppingBag,
  IndianRupee,
  Layers,
  TrendingUp,
  Clock,
  CheckCircle2,
  Eye,
  Sliders,
  Palette,
  PackageCheck,
} from 'lucide-react';
import { useAdminConfig } from '../context/AdminConfigContext';

export const AdminDashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { config } = useAdminConfig();

  const totalRevenue = config.orders.reduce((sum, o) => sum + o.finalAmount, 0);
  const activeOrdersCount = config.orders.filter(
    (o) => o.status !== 'Delivered'
  ).length;
  const totalProductsCount = config.products.length;
  const totalCategoriesCount = config.categories.length;
  const enabledSectionsCount = config.sectionOrder.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6 text-left">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-purple-800/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-200 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Farminix Real-Time Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Store Performance &amp; Live Control
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
            Manage all 15+ Farminix website sections, live theme tokens, inventory catalog, customer orders, and promotional banners in real-time.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => onNavigate('theme')}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Palette className="w-4 h-4" />
              <span>Customize Colors</span>
            </button>
            <button
              onClick={() => onNavigate('sections')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-white/20"
            >
              <Sliders className="w-4 h-4" />
              <span>Section Ordering</span>
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Manage Products</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Statistics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sales</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real store transactions</span>
          </div>
        </div>

        {/* Metric 2: Active Orders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Orders</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{activeOrdersCount}</div>
          <div className="text-[11px] font-semibold text-amber-600 flex items-center gap-1 mt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Processing / Out for Delivery</span>
          </div>
        </div>

        {/* Metric 3: Products */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Catalog</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalProductsCount}</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">
            Across {totalCategoriesCount} grocery categories
          </div>
        </div>

        {/* Metric 4: Live Sections */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Sections</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {enabledSectionsCount} <span className="text-sm font-semibold text-slate-400">/ {config.sectionOrder.length}</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Live on homepage</span>
          </div>
        </div>
      </div>

      {/* Grid: Live Homepage Section Status & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Health & Visibility Hub */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Homepage Sections Status</h2>
            <button
              onClick={() => onNavigate('sections')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer"
            >
              Reorder All
            </button>
          </div>

          <div className="space-y-2.5">
            {config.sectionOrder.map((section, idx) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800 truncate">{section.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      section.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {section.enabled ? 'Active' : 'Hidden'}
                  </span>
                  <button
                    onClick={() => onNavigate(section.id)}
                    className="p-1 text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                    title="Edit Section"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Real Orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Customer Orders</h2>
              <p className="text-[11px] text-slate-500">Live order fulfillment queue</p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer"
            >
              View All Orders ({config.orders.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {config.orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 font-bold text-purple-700">{order.id}</td>
                    <td className="py-3 font-semibold text-slate-800">{order.deliveryAddress.name}</td>
                    <td className="py-3 text-slate-600">{order.items.length} item(s)</td>
                    <td className="py-3 font-extrabold text-slate-900">₹{order.finalAmount}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => onNavigate('orders')}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 cursor-pointer"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
