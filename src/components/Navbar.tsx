import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';

export const Navbar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', catId: null },
    { label: 'Dals & Pulses', catId: 'dals' },
    { label: 'Rice & Grains', catId: 'rice' },
    { label: 'Atta & Flours', catId: 'atta' },
    { label: 'Oils & Ghee', catId: 'oils' },
    { label: 'Masala & Spices', catId: 'masala' },
    { label: 'Snacks & Beverages', catId: 'snacks' },
    { label: 'Household', catId: 'household' },
    { label: 'Offers', catId: 'offers', badge: 'HOT' },
  ];

  return (
    <nav className="w-full h-[60px] bg-[#EDE9FE] px-4 sm:px-8 flex items-center gap-6 select-none relative z-20 shadow-xs border-b border-[#DDD6FE]/60">
      {/* Yellow Categories Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] text-xs font-extrabold rounded-[10px] transition-all shadow-2xs cursor-pointer"
        >
          <Menu className="w-4 h-4 stroke-[2.5]" />
          <span>Categories</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Category Dropdown Modal Menu */}
        {isCategoryMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">All Categories</div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsCategoryMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors text-left ${
                  selectedCategory === cat.id ? 'bg-purple-50 text-[#7C3AED] font-semibold' : 'text-gray-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={cat.image} alt={cat.name} className="w-6 h-6 rounded-full object-cover" />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.itemCount}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav Menu Items */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
        {navItems.map((item) => {
          const isActive = selectedCategory === item.catId || (item.catId === null && selectedCategory === null);
          return (
            <button
              key={item.label}
              onClick={() => setSelectedCategory(item.catId)}
              className={`relative px-3.5 py-4 text-xs font-extrabold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive ? 'text-[#6D28D9]' : 'text-purple-800/80 hover:text-[#6D28D9]'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-[#EA580C] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                  {item.badge}
                </span>
              )}

              {/* White Underline indicator for active nav item */}
              {isActive && (
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[3px] bg-[#6D28D9] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
