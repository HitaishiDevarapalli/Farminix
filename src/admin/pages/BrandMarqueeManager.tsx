import React, { useState } from 'react';
import { Award, Plus, Trash2, Check, Eye, EyeOff } from 'lucide-react';
import { useAdminConfig } from '../context/AdminConfigContext';
import type { PartnerBrand } from '../types';

export const BrandMarqueeManager: React.FC = () => {
  const { config, updateBrandMarquee } = useAdminConfig();
  const [formData, setFormData] = useState(config.brandMarquee);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateField = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateBrandMarquee({ [field]: value });
    notifySaved();
  };

  const handleToggleBrand = (id: string) => {
    const updatedBrands = formData.brands.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b));
    handleUpdateField('brands', updatedBrands);
  };

  const handleDeleteBrand = (id: string) => {
    const updatedBrands = formData.brands.filter((b) => b.id !== id);
    handleUpdateField('brands', updatedBrands);
  };

  const handleAddBrand = () => {
    if (!newBrandName.trim()) return;
    const newBrand: PartnerBrand = {
      id: `b-${Date.now()}`,
      name: newBrandName.trim(),
      logo: newBrandLogo.trim() || '/farminix_logo.png',
      enabled: true,
      order: formData.brands.length + 1,
    };
    const updatedBrands = [...formData.brands, newBrand];
    handleUpdateField('brands', updatedBrands);
    setNewBrandName('');
    setNewBrandLogo('');
  };

  const notifySaved = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Partnership Showcase</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Brand Partners Marquee
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage the continuous infinite partner brand marquee strip, logos, titles, and partner additions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleUpdateField('enabled', !formData.enabled)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              formData.enabled
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {formData.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{formData.enabled ? 'Marquee Visible' : 'Marquee Hidden'}</span>
          </button>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Live Saved</span>
            </span>
          )}
        </div>
      </div>

      {/* Section Headings */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Section Titles &amp; Copy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Top Badge Text</label>
            <input
              type="text"
              value={formData.badgeText}
              onChange={(e) => handleUpdateField('badgeText', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Main Section Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleUpdateField('title', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Subtitle Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleUpdateField('description', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Add New Brand */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Add Partner Brand Logo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Brand Name</label>
            <input
              type="text"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="E.g., Nestle, Mother Dairy..."
              className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Logo SVG or Image URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newBrandLogo}
                onChange={(e) => setNewBrandLogo(e.target.value)}
                placeholder="data:image/svg+xml... or /image.png"
                className="flex-1 h-10 px-3.5 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddBrand}
                className="h-10 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Brand</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Brands Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          3. Existing Brands in Marquee ({formData.brands.length})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {formData.brands.map((brand) => (
            <div
              key={brand.id}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-between text-center gap-2 transition-all ${
                brand.enabled ? 'bg-white border-slate-200 shadow-2xs' : 'bg-slate-50 border-slate-200/50 opacity-60'
              }`}
            >
              <div className="w-full h-12 bg-slate-50 rounded-xl flex items-center justify-center p-1 border border-slate-100">
                <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="text-xs font-bold text-slate-900 truncate w-full">{brand.name}</div>
              <div className="flex items-center gap-1 w-full justify-center">
                <button
                  onClick={() => handleToggleBrand(brand.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    brand.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {brand.enabled ? 'Visible' : 'Hidden'}
                </button>
                <button
                  onClick={() => handleDeleteBrand(brand.id)}
                  className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
