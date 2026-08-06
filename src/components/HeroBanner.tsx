import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandMarquee } from './BrandMarquee';

export const HeroBanner: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="w-full mt-8 max-w-[1440px] mx-auto select-none">
      
      {/* ── Main Hero Image Container ── */}
      <div className="relative w-full px-4 sm:px-8">
        <div className="relative w-full rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 group">
          <img 
            src="/hero_banner_original.jpg" 
            alt="Farminix Fresh Groceries" 
            className="w-full h-auto block" 
            draggable="false"
          />

          {/* Transparent absolute overlay for SHOP NOW button */}
          <button
            onClick={() => navigate('/products')}
            className="absolute left-[3%] bottom-[20%] w-[18%] h-[13%] cursor-pointer bg-transparent border-0 focus:outline-hidden"
            title="Shop Now"
          />

          {/* Transparent absolute overlay for logo home navigation */}
          <button
            onClick={() => navigate('/')}
            className="absolute left-[4.5%] top-[5%] w-[13.5%] h-[10%] cursor-pointer bg-transparent border-0 focus:outline-hidden"
            title="Home"
          />
        </div>
      </div>

      {/* ── BOTTOM: Premium Brand Marquee ── */}
      <div className="mt-8">
        <BrandMarquee />
      </div>

    </div>
  );
};
