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
      bgColor: 'bg-purple-100',
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      title: 'Quality Assured',
      subtitle: '100% Genuine',
      bgColor: 'bg-emerald-100',
    },
    {
      id: 3,
      icon: <IndianRupee className="w-5 h-5 text-[#5B21B6]" />,
      title: 'Best Prices',
      subtitle: 'Direct from Brands',
      bgColor: 'bg-purple-100',
    },
    {
      id: 4,
      icon: <Lock className="w-5 h-5 text-emerald-700" />,
      title: 'Safe & Secure',
      subtitle: 'Secure Packaging',
      bgColor: 'bg-emerald-100',
    },
    {
      id: 5,
      icon: <Headset className="w-5 h-5 text-amber-700" />,
      title: '24/7 Support',
      subtitle: 'We are here for you',
      bgColor: 'bg-amber-100',
      action: () => setIsSupportOpen(true),
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8">
      {/* Light Purple Section Wrapper */}
      <div className="bg-gradient-to-r from-purple-100/80 via-purple-50 to-indigo-100/80 p-4 sm:p-5 rounded-[24px] border border-purple-200/70 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className={`bg-white/90 backdrop-blur-xs rounded-[18px] p-3.5 border border-purple-100 shadow-xs flex items-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-200 ${
                item.action ? 'cursor-pointer hover:border-purple-300' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center shrink-0`}>
                {item.icon}
              </div>
              <div className="min-w-0 text-left">
                <div className="text-xs font-extrabold text-slate-900 truncate">{item.title}</div>
                <div className="text-[11px] font-semibold text-purple-700/80 truncate">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
