import React, { useState } from 'react';
import { X, Star, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, cart, updateQuantity, setIsCheckoutOpen } = useApp();
  const [selectedWeight, setSelectedWeight] = useState<string>('');

  if (!selectedProduct) return null;

  const currentWeight = selectedWeight || selectedProduct.weight;
  const cartItem = cart.find((item) => item.product.id === selectedProduct.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 border border-gray-100 max-h-[90vh] overflow-y-auto text-left">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Product Image */}
          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center relative border border-gray-100 h-[340px]">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-h-80 max-w-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                {selectedProduct.brand} • {selectedProduct.category}
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 mt-1 leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-bold text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">({selectedProduct.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#7C3AED]">
                  ₹{selectedProduct.price}
                </span>
                {selectedProduct.oldPrice && (
                  <span className="text-sm font-medium text-gray-400 line-through">
                    ₹{selectedProduct.oldPrice}
                  </span>
                )}
                {selectedProduct.oldPrice && (
                  <span className="bg-orange-100 text-[#EA580C] text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {Math.round(((selectedProduct.oldPrice - selectedProduct.price) / selectedProduct.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Weight Options */}
              {selectedProduct.weightOptions && (
                <div className="mt-4">
                  <label className="text-xs font-bold text-gray-500 block mb-1.5">Select Pack Size</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedProduct.weightOptions.map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWeight(w)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                          currentWeight === w
                            ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED]'
                            : 'border-gray-200 text-gray-700 hover:bg-slate-50'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="mt-4 text-xs text-gray-600 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-2">
              {quantity === 0 ? (
                <button
                  onClick={() => {
                    addToCart(selectedProduct, currentWeight);
                    setSelectedProduct(null);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full h-12 bg-[#7C3AED] hover:bg-purple-800 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to Cart • ₹{selectedProduct.price}</span>
                </button>
              ) : (
                <div className="w-full h-12 bg-[#7C3AED] text-white rounded-2xl flex items-center justify-between px-4 font-bold text-sm shadow-md">
                  <span className="text-xs font-medium">Added to Cart</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(selectedProduct.id, -1)}
                      className="w-7 h-7 rounded-full bg-purple-800 hover:bg-purple-900 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4 stroke-[3]" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(selectedProduct.id, 1)}
                      className="w-7 h-7 rounded-full bg-purple-800 hover:bg-purple-900 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Ingredients & Nutritional Info Accordion */}
        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedProduct.ingredients && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Ingredients</h3>
              <p className="text-xs text-gray-600">{selectedProduct.ingredients.join(', ')}</p>
            </div>
          )}

          {selectedProduct.nutritionalInfo && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Nutritional Info</h3>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                <div>Energy: <span className="font-semibold text-gray-900">{selectedProduct.nutritionalInfo.energy}</span></div>
                <div>Protein: <span className="font-semibold text-gray-900">{selectedProduct.nutritionalInfo.protein}</span></div>
                <div>Carbs: <span className="font-semibold text-gray-900">{selectedProduct.nutritionalInfo.carbs}</span></div>
                <div>Fat: <span className="font-semibold text-gray-900">{selectedProduct.nutritionalInfo.fat}</span></div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
