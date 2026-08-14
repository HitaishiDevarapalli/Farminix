import React, { useState } from 'react';
import { Clock, Plus, Trash2, Check, Eye, EyeOff } from 'lucide-react';
import { useAdminConfig } from '../context/AdminConfigContext';
import type { FutureItemConfig } from '../types';

export const FutureArrivalsManager: React.FC = () => {
  const { config, updateFutureArrivals } = useAdminConfig();
  const [formData, setFormData] = useState(config.futureArrivals);
  const [newItemName, setNewItemName] = useState('');
  const [newItemImage, setNewItemImage] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateField = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateFutureArrivals({ [field]: value });
    notifySaved();
  };

  const handleToggleItem = (id: number) => {
    const updatedItems = formData.items.map((it) => (it.id === id ? { ...it, enabled: !it.enabled } : it));
    handleUpdateField('items', updatedItems);
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = formData.items.filter((it) => it.id !== id);
    handleUpdateField('items', updatedItems);
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem: FutureItemConfig = {
      id: Date.now(),
      name: newItemName.trim(),
      image: newItemImage.trim() || 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=300',
      badgeText: 'Coming Soon',
      enabled: true,
      order: formData.items.length + 1,
    };
    const updatedItems = [...formData.items, newItem];
    handleUpdateField('items', updatedItems);
    setNewItemName('');
    setNewItemImage('');
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
            <Clock className="w-4 h-4" />
            <span>Upcoming Lineup</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Future Arrivals Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage upcoming categories and future grocery arrivals in the infinite slider.
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
            <span>{formData.enabled ? 'Section Visible' : 'Section Hidden'}</span>
          </button>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Live Saved</span>
            </span>
          )}
        </div>
      </div>

      {/* Copy Settings */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Section Header Copy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Section Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleUpdateField('title', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleUpdateField('subtitle', e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Add New Future Item */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Add Upcoming Item
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Item Name</label>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="E.g., Artisanal Breads"
              className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Image URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newItemImage}
                onChange={(e) => setNewItemImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 h-10 px-3.5 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddItem}
                className="h-10 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          3. Upcoming Items in Carousel ({formData.items.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formData.items.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all ${
                item.enabled ? 'bg-white border-slate-200 shadow-2xs' : 'bg-slate-50 border-slate-200/50 opacity-60'
              }`}
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[9px] font-extrabold uppercase">
                  {item.badgeText}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-900">{item.name}</div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleToggleItem(item.id)}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    item.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.enabled ? 'Active' : 'Hidden'}
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
