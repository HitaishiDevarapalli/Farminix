import React from 'react';
import { Package, RefreshCw, Headset, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

export const BottomFeatureStrip: React.FC = () => {
  const { setIsSupportOpen } = useApp();
  const { publishedConfig } = useAdminConfig();
  const bottomStrip = publishedConfig.bottomFeatureStrip;

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
    <section className="w-full bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-purple-100/80 p-4 md:p-6 shadow-2xs flex flex-col md:flex-row items-stretch justify-between divide-y md:divide-y-0 md:divide-x divide-purple-50 gap-4 md:gap-0">
          {activeBoxes.map((b) => {
            const hasAction = b.actionType === 'support';
            return (
              <div
                key={b.id}
                onClick={hasAction ? () => setIsSupportOpen(true) : undefined}
                className={`flex-1 flex items-center gap-4 px-4 py-3 md:py-2 justify-start md:justify-center transition-all hover:bg-purple-50/20 ${
                  hasAction ? 'cursor-pointer' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${b.bgColor} flex items-center justify-center shrink-0`}>
                  {renderIcon(b.iconName)}
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-snug">{b.title}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-0.5">{b.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

