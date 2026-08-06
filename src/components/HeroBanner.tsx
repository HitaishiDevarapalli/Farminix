import React from 'react';
import { useApp } from '../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="w-full my-8 px-4 sm:px-8 max-w-[1440px] mx-auto select-none">
      
      {/* ── Main Hero Image Container using the Authentic Image ── */}
      <div className="relative w-full rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 group">
        <img 
          src="/hero_banner_original.jpg" 
          alt="Farminix Fresh Groceries" 
          className="w-full h-auto block" 
          draggable="false"
        />

        {/* Transparent absolute overlay for SHOP NOW button */}
        <button
          onClick={() => navigate('/products', 'filter=popular')}
          className="absolute left-[4.5%] bottom-[24%] w-[14%] h-[10.5%] cursor-pointer bg-transparent border-0 focus:outline-hidden"
          title="Shop Now"
        />

        {/* Transparent absolute overlay for logo home navigation */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-[4.5%] top-[5%] w-[13.5%] h-[10%] cursor-pointer bg-transparent border-0 focus:outline-hidden"
          title="Home"
        />
      </div>

      {/* ── BOTTOM OUTSIDE: Carousel Brand Strip (infinite scroll marquee) ── */}
      <div className="w-full mt-6 overflow-hidden">
        <div className="relative w-full bg-white rounded-[24px] p-4 border border-slate-100 shadow-[0_6px_24px_rgba(0,0,0,0.03)] flex items-center overflow-hidden animate-marquee-paused">
          <div className="animate-marquee flex gap-0 items-center">
            <img src="/original_brand_logos.png" className="h-14 w-auto object-contain max-w-none" draggable="false" />
            <img src="/original_brand_logos.png" className="h-14 w-auto object-contain max-w-none" draggable="false" />
          </div>
        </div>
      </div>

    </div>
  );
};
