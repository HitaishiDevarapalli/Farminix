import React from 'react';
import { useApp } from '../context/AppContext';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

export const HeroBanner: React.FC = () => {
  const { navigate } = useApp();
  const { publishedConfig } = useAdminConfig();
  const hero = publishedConfig.hero;

  if (!hero.enabled) return null;

  return (
    <section className="w-full relative select-none bg-gradient-to-b from-[#F3E8FF]/40 to-white border-b border-purple-100/60">
      {/* ── Full-Width Hero Image Container ── */}
      <div className="relative w-full overflow-hidden group">
        <img 
          src={hero.bannerImage || '/hero_banner_original.jpg'} 
          alt={hero.altText || 'Farminix Fresh Groceries'} 
          className="w-full h-auto block" 
          draggable="false"
        />

        {/* Seamless background cover to completely conceal any background printed button */}
        <div 
          className="absolute pointer-events-none rounded-full"
          style={{
            left: '4.0%',
            top: '73.0%',
            width: '15.2%',
            height: '9.0%',
            background: 'linear-gradient(180deg, #FAF8F5 0%, #F5EDE0 28%, #E4CEB2 62%, #D5B995 100%)',
            boxShadow: '0 0 3px rgba(220, 190, 155, 0.4)',
          }}
        />

        {/* Sleek, Reduced-Size, Interactive HTML SHOP NOW button */}
        <div 
          className="absolute flex items-center justify-center z-10"
          style={{
            left: '4.8%',
            top: '74.0%',
            width: '13.4%',
            height: '7.0%',
          }}
        >
          <button
            onClick={() => navigate(hero.shopNowUrl || '/products')}
            className="w-full h-full bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-bold tracking-wider text-[0.88vw] uppercase rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 md:gap-2 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] border-0 focus:outline-hidden"
          >
            <span>SHOP NOW</span>
            <svg className="w-[1.05vw] h-[1.05vw] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Transparent absolute overlay for logo home navigation */}
        <button
          onClick={() => navigate(hero.homeUrl || '/')}
          className="absolute left-[4.5%] top-[5%] w-[13.5%] h-[10%] cursor-pointer bg-transparent border-0 focus:outline-hidden"
          title="Home"
        />
      </div>
    </section>
  );
};


