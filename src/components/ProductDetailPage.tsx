import React, { useState, useMemo } from 'react';
import { ArrowRight, Star, Heart, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getProductSlug } from './ProductListingPage';

export const ProductDetailPage: React.FC = () => {
  const {
    currentRoute,
    navigate,
    allProducts,
    cart,
    addToCart,
    updateQuantity,
    wishlist,
    toggleWishlist,
    setIsCheckoutOpen,
  } = useApp();

  const [selectedWeight, setSelectedWeight] = useState<string>('');

  // Extract slug from URL pathname (e.g. /product/daawat-super-basmati-rice)
  const productSlug = useMemo(() => {
    const parts = currentRoute.pathname.split('/');
    return parts[parts.length - 1] || '';
  }, [currentRoute.pathname]);

  // Reset scroll and size state when product changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedWeight('');
  }, [productSlug]);

  // Find product matching this slug
  const product = useMemo(() => {
    return allProducts.find((p) => getProductSlug(p.name) === productSlug);
  }, [allProducts, productSlug]);

  if (!product) {
    return (
      <div className="w-full bg-slate-50 min-h-[60vh] py-12 px-4 text-center">
        <h3 className="text-xl font-extrabold text-slate-800">Product not found</h3>
        <p className="text-sm text-slate-500 mt-2">The product you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2.5 bg-[#7C3AED] text-white font-bold rounded-xl hover:bg-[#6D28D9] cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const currentWeight = selectedWeight || product.weight;
  const cartItem = cart.find((item) => item.product.id === product.id && item.selectedWeight === currentWeight);
  const qty = cartItem ? cartItem.quantity : 0;
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Find relative recommendations in the same category
  const recommendations = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="w-full bg-slate-50 py-8 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* ── Back Navigation ── */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#7C3AED] transition-colors mb-6 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Back</span>
        </button>

        {/* ── Main Details Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-150 shadow-xs mb-10">
          
          {/* Left image display (6 cols) */}
          <div className="md:col-span-6 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 border border-slate-100 relative group overflow-hidden h-[400px] sm:h-[480px]">
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-0.75 rounded-md">
                {discount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-sm border border-gray-150 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[380px] w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Product Details Info (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between text-left">
            <div>
              <div className="text-xs font-extrabold text-[#7C3AED] uppercase tracking-wider">
                {product.brand} • {product.category}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-bold text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 mt-4 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Weight Options */}
              {product.weightOptions && (
                <div className="mt-6">
                  <label className="text-xs font-bold text-gray-500 block mb-2">Select Pack Size</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.weightOptions.map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWeight(w)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          currentWeight === w
                            ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED] shadow-2xs'
                            : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#7C3AED]">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-sm font-medium text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Stepper / Add button */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-44">
                {qty === 0 ? (
                  <button
                    onClick={() => {
                      addToCart(product, currentWeight);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full h-12 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-98 text-white text-sm font-extrabold rounded-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-purple-600/10"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="w-full h-12 bg-[#7C3AED] text-white rounded-[12px] flex items-center justify-between px-4 font-bold text-sm shadow-md">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-8 h-8 rounded-full hover:bg-purple-800 flex items-center justify-center cursor-pointer text-lg"
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-8 h-8 rounded-full hover:bg-purple-800 flex items-center justify-center cursor-pointer text-lg"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              
              <div className="text-[11px] font-semibold text-slate-400 text-center sm:text-left leading-tight">
                Standard delivery in 10-25 mins.<br />
                Delivery Location: <span className="text-slate-600">Guntur, AP</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Details Panel: Ingredients & Nutrition Facts ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Ingredients */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 text-left">
            <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#7C3AED]" />
              Ingredients & Product Info
            </h3>
            {product.ingredients && product.ingredients.length > 0 ? (
              <ul className="space-y-2 text-xs font-semibold text-slate-500">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 font-medium">Standard packaging product, prepared under hygienic standards. See package for full list.</p>
            )}
          </div>

          {/* Nutrition Table */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 text-left">
            <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Nutritional Facts (Approx. values)
            </h3>
            {product.nutritionalInfo ? (
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-xs font-semibold text-slate-600">
                  <tbody>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="p-2.5 font-bold">Nutrient</td>
                      <td className="p-2.5 font-bold text-right">Per 100g</td>
                    </tr>
                    {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                      <tr key={key} className="border-b border-slate-100">
                        <td className="p-2.5 capitalize">{key}</td>
                        <td className="p-2.5 text-right text-slate-900 font-bold">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-medium">Nutritional values are listed on the back of the brand package packaging.</p>
            )}
          </div>

        </div>

        {/* ── Related Recommendations ── */}
        {recommendations.length > 0 && (
          <div className="w-full pt-6">
            <h3 className="text-base sm:text-lg font-black text-slate-900 text-left mb-6">
              Similar Products in this Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${getProductSlug(item.name)}`)}
                  className="bg-white rounded-[16px] border border-gray-100 shadow-[0_4px_18px_rgba(0,0,0,0.06)] flex flex-col justify-between p-3.5 cursor-pointer transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left flex flex-col flex-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 hover:text-[#7C3AED] transition-colors mb-1">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold mb-2">{item.weight}</span>
                    <span className="text-sm font-extrabold text-[#7C3AED] mt-auto">₹{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
