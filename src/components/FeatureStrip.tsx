import React from 'react';
import { Zap, ShieldCheck, IndianRupee, Lock, Headset } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAdminConfig } from '../admin/context/AdminConfigContext';

export const FeatureStrip: React.FC = () => {
  const { setIsSupportOpen } = useApp();
  const { config } = useAdminConfig();
  const strip = config.featureStrip;

  if (!strip.enabled) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#5B21B6] fill-purple-100" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case 'IndianRupee':
        return <IndianRupee className="w-5 h-5 text-[#5B21B6]" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-emerald-700" />;
      case 'Headset':
      default:
        return <Headset className="w-5 h-5 text-amber-700" />;
    }
  };

  const activeFeatures = strip.features.filter((f) => f.enabled);

  return (
    <section className="w-full bg-gradient-to-r from-purple-50/80 via-indigo-50/40 to-purple-50/80 border-b border-purple-100/60 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {activeFeatures.map((item) => {
            const hasAction = item.actionType === 'support';
            return (
              <div
                key={item.id}
                onClick={hasAction ? () => setIsSupportOpen(true) : undefined}
                className={`bg-white rounded-xl p-3.5 border border-purple-100/80 shadow-2xs flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ${
                  hasAction ? 'cursor-pointer hover:border-purple-300' : ''
                }`}
              >
                <div className={`w-9 h-9 rounded-full ${item.bgColor} flex items-center justify-center shrink-0`}>
                  {renderIcon(item.iconName)}
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-xs font-extrabold text-slate-900 truncate">{item.title}</div>
                  <div className="text-[11px] font-semibold text-purple-700/80 truncate">{item.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

