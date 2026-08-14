import React from 'react';
import { Smartphone, Target, HelpCircle, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

export const TopOfferBar: React.FC = () => {
  const { setIsTrackOrderOpen, setIsSupportOpen } = useApp();
  const { config } = useAdminConfig();
  const bar = config.topOfferBar;

  if (!bar.enabled) return null;

  return (
    <div className="w-full h-10 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 text-xs font-medium text-gray-700 select-none">
      {/* Left: Offer text */}
      <div className="flex items-center gap-1.5">
        <Zap className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
        <span>
          <strong className="text-gray-900">{bar.discountHighlight}</strong>{bar.leftTextSuffix}{' '}
          <span className="text-[#EA580C] font-bold tracking-wider bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">{bar.promoCode}</span>
        </span>
      </div>

      {/* Right: Quick Links */}
      <div className="hidden md:flex items-center gap-6 text-gray-600">
        <button 
          onClick={() => alert(bar.appStoreAlertMessage || "Farminix Mobile App available on iOS App Store & Google Play Store!")}
          className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>{bar.downloadAppText}</span>
        </button>

        <button 
          onClick={() => setIsTrackOrderOpen(true)}
          className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors cursor-pointer"
        >
          <Target className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>{bar.trackOrderText}</span>
        </button>

        <button 
          onClick={() => setIsSupportOpen(true)}
          className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>{bar.helpText}</span>
        </button>
      </div>
    </div>
  );
};

