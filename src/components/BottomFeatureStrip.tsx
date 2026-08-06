import React from 'react';
import { Package, RefreshCw, Headset, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomFeatureStrip: React.FC = () => {
  const { setIsSupportOpen } = useApp();

  const boxes = [
    {
      id: 1,
      icon: <Package className="w-6 h-6 text-[#15803D]" />,
      title: 'No Minimum Order',
      subtitle: 'Order any quantity',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 2,
      icon: <RefreshCw className="w-6 h-6 text-[#15803D]" />,
      title: 'Easy Returns & Refunds',
      subtitle: 'Hassle free returns',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 3,
      icon: <Headset className="w-6 h-6 text-amber-600" />,
      title: '24/7 Customer Support',
      subtitle: 'We are here for you',
      bgColor: 'bg-amber-50',
      action: () => setIsSupportOpen(true),
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-6 h-6 text-[#5B21B6]" />,
      title: '100% Quality Assured',
      subtitle: 'Genuine products only',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="w-full my-8 px-4 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {boxes.map((b) => (
          <div
            key={b.id}
            onClick={b.action}
            className={`bg-white rounded-[16px] p-4 custom-card-shadow border border-gray-100/90 flex items-center gap-4 hover:-translate-y-1 transition-all ${
              b.action ? 'cursor-pointer hover:border-amber-200' : ''
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl ${b.bgColor} flex items-center justify-center shrink-0`}>
              {b.icon}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-900 leading-snug">{b.title}</div>
              <div className="text-[11px] font-medium text-gray-500 mt-0.5">{b.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
