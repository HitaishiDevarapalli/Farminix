import React from 'react';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/products';
import { useApp } from '../context/AppContext';

export const CategorySection: React.FC = () => {
  const { navigate } = useApp();

  return (
    <section className="w-full py-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-purple-800 flex items-center gap-1 transition-colors cursor-pointer group"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid of 8 Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('/products', `category=${encodeURIComponent(cat.name)}`)}
              className="group bg-white rounded-2xl p-2.5 text-center border border-slate-150 hover:border-purple-300 flex flex-col items-center gap-2 cursor-pointer transform hover:-translate-y-1 transition-all duration-200 shadow-2xs"
            >
              {/* Square Image */}
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-50 group-hover:ring-2 group-hover:ring-[#7C3AED]/20 transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Title */}
              <div className="text-xs font-bold text-slate-800 group-hover:text-[#7C3AED] transition-colors leading-snug text-center">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
