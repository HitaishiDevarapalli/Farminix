import React, { useState } from 'react';
import { Grid, Plus, Trash2, Check, Eye, EyeOff } from 'lucide-react';
import { useAdminConfig } from '../context/AdminConfigContext';
import { AdminImageUpload } from '../components/AdminImageUpload';
import type { Category } from '../../types';

export const CategoryManager: React.FC = () => {
  const { config, updateCategories, updateCategorySection } = useAdminConfig();
  const [sectionConfig, setSectionConfig] = useState(config.categorySection);
  const [categoriesList, setCategoriesList] = useState<Category[]>(config.categories);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New category form
  const [newCatName, setNewCatName] = useState('');
  const [newCatImage, setNewCatImage] = useState('');
  const [newCatItemCount, setNewCatItemCount] = useState(30);

  const handleUpdateSectionTitle = (title: string) => {
    setSectionConfig({ ...sectionConfig, title });
    updateCategorySection({ title });
    notifySaved();
  };

  const handleToggleSection = () => {
    const updated = { ...sectionConfig, enabled: !sectionConfig.enabled };
    setSectionConfig(updated);
    updateCategorySection(updated);
    notifySaved();
  };

  const handleAddCategory = () => {
    const finalName = newCatName.trim() || `New Category ${categoriesList.length + 1}`;
    const newCategory: Category = {
      id: finalName.toLowerCase().replace(/[^a-z0-9]/g, ''),
      name: finalName,
      image: newCatImage.trim() || '/cat_dals.jpg',
      itemCount: Number(newCatItemCount) || 1,
      enabled: true, // Enabled by default
    };
    const updated = [...categoriesList, newCategory];
    setCategoriesList(updated);
    updateCategories(updated);
    setNewCatName('');
    setNewCatImage('');
    setNewCatItemCount(30);
    notifySaved();
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      const updated = categoriesList.filter((c) => c.id !== id);
      setCategoriesList(updated);
      updateCategories(updated);
      notifySaved();
    }
  };

  const handleEditCategory = (id: string, field: keyof Category, value: any) => {
    const updated = categoriesList.map((c) => (c.id === id ? { ...c, [field]: value } : c));
    setCategoriesList(updated);
    updateCategories(updated);
    notifySaved();
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
            <Grid className="w-4 h-4" />
            <span>Storefront Department Catalog</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Shop by Category Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Add, update, or reorganize grocery categories, artwork, and product count badges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSection}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              sectionConfig.enabled
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {sectionConfig.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{sectionConfig.enabled ? 'Section Visible' : 'Section Hidden'}</span>
          </button>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Live Saved</span>
            </span>
          )}
        </div>
      </div>

      {/* Section Title Configuration */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Section Header Copy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Section Title</label>
            <input
              type="text"
              value={sectionConfig.title}
              onChange={(e) => handleUpdateSectionTitle(e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">See All Button Text</label>
            <input
              type="text"
              value={sectionConfig.seeAllText}
              onChange={(e) => {
                const updated = { ...sectionConfig, seeAllText: e.target.value };
                setSectionConfig(updated);
                updateCategorySection(updated);
                notifySaved();
              }}
              className="w-full h-10 px-3.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Add New Category */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Add New Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-4 sm:col-span-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Category Name</label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="E.g., Organic Honey &amp; Spreads"
                className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>

            <AdminImageUpload
              value={newCatImage}
              onChange={setNewCatImage}
              label="Category Image"
              aspectRatio="square"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Estimated Item Count</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCatItemCount}
                onChange={(e) => setNewCatItemCount(Number(e.target.value.replace(/\D/g, '')) || 0)}
                className="w-full h-10 px-3.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddCategory}
                className="h-10 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 animate-pulse"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Categories List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          3. Active Categories ({categoriesList.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoriesList.map((cat) => {
            const isEnabled = cat.enabled !== false;
            return (
              <div
                key={cat.id}
                className={`p-4 rounded-2xl border bg-white shadow-2xs space-y-3 flex flex-col justify-between transition-all ${
                  isEnabled ? 'border-slate-200 opacity-100' : 'border-slate-200/50 opacity-60 bg-slate-50'
                }`}
              >
                <div className="space-y-3">
                  <AdminImageUpload
                    value={cat.image}
                    onChange={(val) => handleEditCategory(cat.id, 'image', val)}
                    label="Category Image"
                    aspectRatio="square"
                  />

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Category Name</label>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => handleEditCategory(cat.id, 'name', e.target.value)}
                      className="w-full h-9 px-3 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Estimated Item Count</label>
                    <input
                      type="text"
                      value={cat.itemCount}
                      onChange={(e) => handleEditCategory(cat.id, 'itemCount', Number(e.target.value.replace(/\D/g, '')) || 0)}
                      className="w-full h-9 px-3 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleEditCategory(cat.id, 'enabled', !isEnabled)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isEnabled
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-350'
                    }`}
                  >
                    {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isEnabled ? 'Visible' : 'Hidden'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
