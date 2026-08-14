import React from 'react';
import { Package, RefreshCw, Headset, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

export const BottomFeatureStrip: React.FC = () => {
  const { setIsSupportOpen } = useApp();
  const { config } = useAdminConfig();
  const bottomStrip = config.bottomFeatureStrip;

  if (!bottomStrip.enabled) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package':
        return <Package className="w-5 h-5 text-emerald-700" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-emerald-700" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#5B21B6]" />;
      case 'Headset':
      default:
        return <Headset className="w-5 h-5 text-amber-700" />;
    }
  };

  const activeBoxes = bottomStrip.boxes.filter((b) => b.enabled);

  return (
    <section className="w-full bg-gradient-to-r from-purple-50/60 via-indigo-50/30 to-purple-50/60 border-b border-purple-100/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeBoxes.map((b) => {
            const hasAction = b.actionType === 'support';
            return (
              <div
                key={b.id}
                onClick={hasAction ? () => setIsSupportOpen(true) : undefined}
                className={`bg-white rounded-xl p-4 border border-purple-100/80 shadow-2xs flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-xs transition-all ${
                  hasAction ? 'cursor-pointer hover:border-purple-300' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${b.bgColor} flex items-center justify-center shrink-0`}>
                  {renderIcon(b.iconName)}
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-slate-900 leading-snug">{b.title}</div>
                  <div className="text-[11px] font-semibold text-purple-700/80 mt-0.5">{b.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

