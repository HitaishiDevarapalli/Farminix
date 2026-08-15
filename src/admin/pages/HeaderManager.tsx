import React, { useState } from 'react';
import { Search, Check, Plus, Trash2 } from 'lucide-react';
import { useAdminConfig } from '../context/AdminConfigContext';
import { AdminImageUpload } from '../components/AdminImageUpload';
import type { HeaderConfig } from '../types';

export const HeaderManager: React.FC = () => {
  const { config, updateHeader } = useAdminConfig();
  const [formData, setFormData] = useState<HeaderConfig>(config.header);
  const [newPlaceholder, setNewPlaceholder] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof HeaderConfig, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateHeader({ [field]: value });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddPlaceholder = () => {
    if (!newPlaceholder.trim()) return;
    const updatedList = [...formData.searchPlaceholders, newPlaceholder.trim()];
    handleChange('searchPlaceholders', updatedList);
    setNewPlaceholder('');
  };

  const handleRemovePlaceholder = (index: number) => {
    const updatedList = formData.searchPlaceholders.filter((_, i) => i !== index);
    handleChange('searchPlaceholders', updatedList);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Search className="w-4 h-4" />
            <span>Store Navigation Element</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Main Header &amp; Search Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Configure the store logo, location selector title, animated search placeholders, and primary header buttons.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <Check className="w-4 h-4" />
            <span>Live Saved</span>
          </span>
        )}
      </div>

      {/* Header Logo & Buttons Configuration */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Brand Logo &amp; Delivery Header
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <AdminImageUpload
              value={formData.logoUrl}
              onChange={(val) => handleChange('logoUrl', val)}
              label="Header Logo Image"
              aspectRatio="auto"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Logo Alt Text</label>
            <input
              type="text"
              value={formData.logoAlt}
              onChange={(e) => handleChange('logoAlt', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Location Selector Label</label>
            <input
              type="text"
              value={formData.deliveryLabel}
              onChange={(e) => handleChange('deliveryLabel', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Login Button Text</label>
            <input
              type="text"
              value={formData.loginButtonText}
              onChange={(e) => handleChange('loginButtonText', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Animated Search Bar Placeholders */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">2. Dynamic Search Bar Animated Placeholders</h2>
            <p className="text-[11px] text-slate-500">Cycles automatically on the main search input to guide shoppers</p>
          </div>
        </div>

        {/* Add new placeholder */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newPlaceholder}
            onChange={(e) => setNewPlaceholder(e.target.value)}
            placeholder="E.g., Try 'Organic Farm Honey'..."
            className="flex-1 h-10 px-3.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddPlaceholder();
            }}
          />
          <button
            onClick={handleAddPlaceholder}
            className="px-4 h-10 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Keyword</span>
          </button>
        </div>

        {/* List of existing placeholders */}
        <div className="space-y-2">
          {formData.searchPlaceholders.map((text, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-800">"{text}"</span>
              </div>
              <button
                onClick={() => handleRemovePlaceholder(idx)}
                className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
