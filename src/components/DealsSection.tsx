import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { epicDeals } from '../data/products';
import { useApp } from '../context/AppContext';

export const DealsSection: React.FC = () => {
  const { setActiveCategoryPage } = useApp();
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
    <div className="w-full my-10 px-4 sm:px-8 relative select-none">
      {/* Banner Badge Header: EPIC DEALS ALL DAY */}
      <div className="flex justify-center mb-6">
        <div className="relative bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#6D28D9] text-white px-8 py-2.5 rounded-2xl shadow-lg border-2 border-purple-400/40 text-center transform hover:scale-105 transition-transform">
          <div className="text-xl sm:text-2xl font-black tracking-wider uppercase drop-shadow-xs">
            EPIC DEALS
          </div>
          <div className="text-xs sm:text-sm font-bold text-yellow-300 tracking-widest uppercase">
            ALL DAY
          </div>
        </div>
      </div>

      {/* Container with Side Navigation Arrows */}
      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#7C3AED] hover:scale-110 z-20 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#7C3AED] hover:scale-110 z-20 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Deal Cards Row */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {epicDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => setActiveCategoryPage(deal.id)}
              className="min-w-[200px] sm:min-w-[215px] max-w-[220px] bg-white rounded-[16px] overflow-hidden custom-card-shadow border border-gray-200/90 flex-shrink-0 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Category Image Banner Area */}
              <div className="relative w-full h-36 bg-gradient-to-b from-slate-100 to-purple-50/40 p-3 flex items-center justify-center overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.categoryName}
                  className="w-full h-full object-cover absolute inset-0 opacity-80"
                />

                {/* Offer Discount Overlay Badge */}
                <div className="absolute bottom-2 left-0 right-0 mx-auto w-[90%] bg-black/75 backdrop-blur-xs text-white text-center py-1.5 px-2 rounded-xl">
                  <div className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider">
                    {deal.discountBadge}
                  </div>
                  <div className="text-[10px] font-medium text-gray-200 truncate">
                    {deal.categoryName}
                  </div>
                </div>
              </div>

              {/* Brand Logos Footer Area */}
              <div className="p-3 bg-white border-t border-gray-100 flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-2 w-full">
                  {deal.brands.map((b) => (
                    <div
                      key={b.name}
                      className="h-7 px-2 border border-gray-200 rounded-lg flex items-center justify-center bg-white shrink-0"
                    >
                      <img src={b.logo} alt={b.name} className="h-4 max-w-[65px] object-contain" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-semibold text-gray-400 border border-gray-200 rounded-full px-2 py-0.5 bg-slate-50">
                  &amp; More
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
