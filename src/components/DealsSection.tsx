import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { epicDeals } from '../data/products';
import { useApp } from '../context/AppContext';

export const DealsSection: React.FC = () => {
  const { navigate } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 relative select-none overflow-hidden py-4">

      {/* Banner Badge Header: EPIC DEALS ALL DAY (3D Neon Floating Pill) */}
      <div className="flex flex-col items-center justify-center mb-7 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[11px] font-extrabold tracking-widest uppercase mb-2 border border-purple-200 shadow-xs">
          <Zap className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
          <span>ZERO GRAVITY SAVINGS</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        <div className="relative bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#5B21B6] text-white px-9 py-3 rounded-2xl shadow-[0_10px_30px_rgba(124,58,237,0.35)] border-2 border-purple-300/40 text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-xl sm:text-2xl font-black tracking-wider uppercase drop-shadow-md">
            EPIC DEALS
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-yellow-300 tracking-widest uppercase mt-0.5">
            ALL DAY
          </div>
        </div>
      </div>

      {/* Container with Side Navigation Arrows */}
      <div className="relative group z-10">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-purple-100 flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:scale-110 active:scale-95 z-20 transition-all cursor-pointer"
          aria-label="Previous Deals"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-purple-100 flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:scale-110 active:scale-95 z-20 transition-all cursor-pointer"
          aria-label="Next Deals"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Deal Cards Row */}
        <div
          ref={scrollRef}
          className="flex items-center gap-5 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1"
        >
          {epicDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => {
                const dealCategoryMap: Record<string, string> = {
                  d1: 'Rice & Grains',
                  d2: 'Oils & Ghee',
                  d3: 'Dals & Pulses',
                  d4: 'Masala & Spices',
                  d5: 'Snacks & Beverages',
                  d6: 'Household Essentials',
                };
                const catName = dealCategoryMap[deal.id];
                if (catName) {
                  navigate('/products', `category=${encodeURIComponent(catName)}`);
                } else {
                  navigate('/products');
                }
              }}
              className="min-w-[220px] sm:min-w-[245px] max-w-[250px] bg-white rounded-[22px] overflow-hidden border border-purple-100/80 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(124,58,237,0.22)] flex-shrink-0 cursor-pointer transform hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between group/card"
            >
              {/* 3D Zero-Gravity Category Image Banner */}
              <div className="relative w-full h-44 bg-slate-950 p-3 flex items-center justify-center overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.categoryName}
                  className="w-full h-full object-cover absolute inset-0 opacity-90 group-hover/card:scale-110 transition-transform duration-500"
                />

                {/* 3D Soft Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20" />

                {/* Glowing Neon Discount Floating Badge */}
                <div className="absolute bottom-3 left-0 right-0 mx-auto w-[92%] bg-slate-950/80 backdrop-blur-md text-white text-center py-2 px-2.5 rounded-2xl border border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.25)] group-hover/card:border-yellow-400 group-hover/card:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all">
                  <div className="text-[11px] font-black text-yellow-300 uppercase tracking-widest flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400 shrink-0" />
                    <span>{deal.discountBadge}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-200 truncate mt-0.5">
                    {deal.categoryName}
                  </div>
                </div>
              </div>

              {/* Brand Logos Footer Area */}
              <div className="p-3.5 bg-white border-t border-slate-100 flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-2 w-full">
                  {deal.brands.map((b) => (
                    <div
                      key={b.name}
                      className="h-8 px-2.5 border border-slate-200 rounded-xl flex items-center justify-center bg-white shrink-0 shadow-2xs hover:border-purple-300 transition-colors"
                    >
                      <img src={b.logo} alt={b.name} className="h-4.5 max-w-[70px] object-contain" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-extrabold text-purple-600 bg-purple-50 border border-purple-100 rounded-full px-3 py-0.5">
                  &amp; More Brands
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
