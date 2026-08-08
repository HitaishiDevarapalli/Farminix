import React from 'react';
import { Package, RefreshCw, Headset, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomFeatureStrip: React.FC = () => {
  const { setIsSupportOpen } = useApp();

  const boxes = [
    {
      id: 1,
      icon: <Package className="w-5 h-5 text-emerald-700" />,
      title: 'No Minimum Order',
      subtitle: 'Order any quantity',
      bgColor: 'bg-emerald-100',
    },
    {
      id: 2,
      icon: <RefreshCw className="w-5 h-5 text-emerald-700" />,
      title: 'Easy Returns & Refunds',
      subtitle: 'Hassle free returns',
      bgColor: 'bg-emerald-100',
    },
    {
      id: 3,
      icon: <Headset className="w-5 h-5 text-amber-700" />,
      title: '24/7 Customer Support',
      subtitle: 'We are here for you',
      bgColor: 'bg-amber-100',
      action: () => setIsSupportOpen(true),
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-5 h-5 text-[#5B21B6]" />,
      title: '100% Quality Assured',
      subtitle: 'Genuine products only',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-purple-50/60 via-indigo-50/30 to-purple-50/60 border-b border-purple-100/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {boxes.map((b) => (
            <div
              key={b.id}
              onClick={b.action}
              className={`bg-white rounded-xl p-4 border border-purple-100/80 shadow-2xs flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-xs transition-all ${
                b.action ? 'cursor-pointer hover:border-purple-300' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${b.bgColor} flex items-center justify-center shrink-0`}>
                {b.icon}
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900 leading-snug">{b.title}</div>
                <div className="text-[11px] font-semibold text-purple-700/80 mt-0.5">{b.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
