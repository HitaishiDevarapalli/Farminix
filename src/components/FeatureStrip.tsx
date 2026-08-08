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
    <section className="w-full bg-gradient-to-r from-purple-50/80 via-indigo-50/40 to-purple-50/80 border-b border-purple-100/60 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className={`bg-white rounded-xl p-3.5 border border-purple-100/80 shadow-2xs flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ${
                item.action ? 'cursor-pointer hover:border-purple-300' : ''
              }`}
            >
              <div className={`w-9 h-9 rounded-full ${item.bgColor} flex items-center justify-center shrink-0`}>
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
    </section>
  );
};
