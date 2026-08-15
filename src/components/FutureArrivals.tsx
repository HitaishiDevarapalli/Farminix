import React from 'react';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

export const FutureArrivals: React.FC = () => {
  const { publishedConfig } = useAdminConfig();
  const futureConfig = publishedConfig.futureArrivals;

  if (!futureConfig.enabled) return null;

  const activeItems = futureConfig.items.filter((i) => i.enabled);
  const doubledItems = [...activeItems, ...activeItems, ...activeItems];

  return (
    <section className="w-full py-8 border-b border-slate-100 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-6 text-left">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {futureConfig.title || 'Future Arrivals'}
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            {futureConfig.subtitle || 'Premium choices coming soon to Farminix'}
          </p>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden py-2 flex items-center animate-marquee-paused">
          <div className="animate-marquee flex gap-4">
            {doubledItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[170px] sm:w-[190px] bg-white rounded-2xl p-3.5 border border-slate-150 flex flex-col items-center gap-2.5 relative flex-shrink-0 shadow-2xs"
              >
                {/* Coming Soon Badge */}
                <span className="absolute top-2.5 right-2.5 bg-purple-50 border border-purple-100 text-[#7C3AED] text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badgeText || 'Coming Soon'}
                </span>

                {/* Square Image container */}
                <div className="w-full aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                {/* Name */}
                <div className="text-xs font-bold text-slate-800 tracking-tight leading-snug text-center">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

