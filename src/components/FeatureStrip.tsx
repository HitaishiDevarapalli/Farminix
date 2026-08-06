import React from 'react';
import { Zap, ShieldCheck, IndianRupee, Lock, Headset } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeatureStrip: React.FC = () => {
  const { setIsSupportOpen } = useApp();

  const features = [
    {
      id: 1,
      icon: <Zap className="w-5 h-5 text-[#5B21B6] fill-purple-100" />,
      title: '10 Min Delivery',
      subtitle: 'Super Fast',
      bgColor: 'bg-purple-50',
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-5 h-5 text-[#15803D]" />,
      title: 'Quality Assured',
      subtitle: '100% Genuine',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 3,
      icon: <IndianRupee className="w-5 h-5 text-[#5B21B6]" />,
      title: 'Best Prices',
      subtitle: 'Direct from Brands',
      bgColor: 'bg-purple-50',
    },
    {
      id: 4,
      icon: <Lock className="w-5 h-5 text-[#15803D]" />,
      title: 'Safe & Secure',
      subtitle: 'Secure Packaging',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 5,
      icon: <Headset className="w-5 h-5 text-amber-600" />,
      title: '24/7 Support',
      subtitle: 'We are here for you',
      bgColor: 'bg-amber-50',
      action: () => setIsSupportOpen(true),
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {features.map((item) => (
          <div
            key={item.id}
            onClick={item.action}
            className={`bg-white rounded-[16px] p-4 custom-card-shadow border border-gray-100/80 flex items-center gap-3.5 hover:-translate-y-1 transition-all duration-200 ${
              item.action ? 'cursor-pointer hover:border-amber-200' : ''
            }`}
          >
            <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center shrink-0`}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-gray-900 truncate">{item.title}</div>
              <div className="text-[11px] font-medium text-gray-500 truncate">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
