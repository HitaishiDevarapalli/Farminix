import React from 'react';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

const LogoCard: React.FC<{ brand: { name: string; logo: string } }> = ({ brand }) => (
  <div
    className="brand-card flex-shrink-0 flex items-center justify-center bg-white rounded-xl border border-slate-200/80 mx-3 cursor-default select-none shadow-2xs hover:shadow-xs transition-all duration-200"
    style={{
      width: 140,
      height: 70,
      padding: '8px 14px',
    }}
    title={brand.name}
  >
    <img
      src={brand.logo}
      alt={brand.name}
      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      draggable={false}
    />
  </div>
);

export const BrandMarquee: React.FC = () => {
  const { config } = useAdminConfig();
  const marquee = config.brandMarquee;

  if (!marquee.enabled) return null;

  const activeBrands = marquee.brands.filter((b) => b.enabled);
  const doubled = [...activeBrands, ...activeBrands];

  return (
    <section className="w-full bg-slate-50/80 border-b border-slate-100 py-8 select-none overflow-hidden" aria-label="Trusted Brands">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section heading */}
        <div className="mb-6 text-center">
          <p className="text-[11px] font-extrabold text-[#7C3AED] uppercase tracking-[3px] mb-1">{marquee.badgeText}</p>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{marquee.title}</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            {marquee.description}
          </p>
        </div>

        {/* Marquee track */}
        <div className="relative w-full overflow-hidden animate-marquee-paused">
          {/* Left gradient fade */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: 80,
              background: 'linear-gradient(to right, rgba(248, 250, 252, 1) 0%, transparent 100%)',
            }}
          />
          {/* Right gradient fade */}
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: 80,
              background: 'linear-gradient(to left, rgba(248, 250, 252, 1) 0%, transparent 100%)',
            }}
          />

          <div className="animate-marquee py-2">
            {doubled.map((brand, idx) => (
              <LogoCard key={`${brand.name}-${idx}`} brand={brand} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

