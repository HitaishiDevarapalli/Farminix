import React from 'react';
import { useApp } from '../context/AppContext';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

export const HeroBanner: React.FC = () => {
  const { navigate } = useApp();
  const { config } = useAdminConfig();
  const hero = config.hero;

  if (!hero.enabled) return null;

  return (
    <section className="w-full relative select-none bg-gradient-to-b from-[#F3E8FF]/40 to-white border-b border-purple-100/60">
      {/* ── Full-Width Hero Image Container ── */}
      <div className="max-w-7xl mx-auto relative w-full overflow-hidden group">
        <img 
          src={hero.bannerImage || '/hero_banner_original.jpg'} 
          alt={hero.altText || 'Farminix Fresh Groceries'} 
          className="w-full h-auto block" 
          draggable="false"
        />

        {/* Transparent absolute overlay for SHOP NOW button */}
        <button
          onClick={() => navigate(hero.shopNowUrl || '/products')}
          className="absolute left-[3%] bottom-[20%] w-[18%] h-[13%] cursor-pointer bg-transparent border-0 focus:outline-hidden"
          title="Shop Now"
        />

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

