import React from 'react';
import { Smartphone, Target, HelpCircle, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopOfferBar: React.FC = () => {
  const { setIsTrackOrderOpen, setIsSupportOpen } = useApp();

  return (
    <div className="w-full h-10 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 text-xs font-medium text-gray-700 select-none">
      {/* Left: Offer text */}
      <div className="flex items-center gap-1.5">
        <Zap className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
        <span>
          <strong className="text-gray-900">10% OFF</strong> on your first order <span className="text-gray-400">|</span> Use code:{' '}
          <span className="text-[#EA580C] font-bold tracking-wider bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">FARM10</span>
        </span>
      </div>

      {/* Right: Quick Links */}
      <div className="hidden md:flex items-center gap-6 text-gray-600">
        <button 
          onClick={() => alert("Farminix Mobile App available on iOS App Store & Google Play Store!")}
          className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors"
        >
          <Smartphone className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Download App</span>
        </button>

        <button 
          onClick={() => setIsTrackOrderOpen(true)}
          className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors"
        >
          <Target className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Track Order</span>
        </button>

        <button 
          onClick={() => setIsSupportOpen(true)}
          className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Help</span>
        </button>
      </div>
    </div>
  );
};
