import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Search, ShoppingCart, User as UserIcon, Loader2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { normalizeSearchText, getProductSlug } from './ProductListingPage';
import type { Product } from '../types';

export const MainHeader: React.FC = () => {
  const {
    location,
    setIsLocationOpen,
    cart,
    setIsCartOpen,
    user,
    setIsAuthOpen,
    currentRoute,
    navigate,
    allProducts,
  } = useApp();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Search input state
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<number | null>(null);

  // Sync input value with URL search parameter
  const urlSearchQuery = currentRoute.searchParams.get('search') || '';
  useEffect(() => {
    setInputValue(urlSearchQuery);
  }, [urlSearchQuery]);

  // Debounced suggestion logic
  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = window.setTimeout(() => {
      const normalizedQuery = normalizeSearchText(inputValue);
      const matched = allProducts.filter((product) => {
        const name = normalizeSearchText(product.name);
        const brand = normalizeSearchText(product.brand || '');
        const cat = normalizeSearchText(product.category);
        return name.includes(normalizedQuery) || brand.includes(normalizedQuery) || cat.includes(normalizedQuery);
      });
      setSuggestions(matched.slice(0, 6)); // Top 6 suggestions
      setIsLoading(false);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [inputValue, allProducts]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation & enter action
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setActiveIndex(-1);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelectProduct(suggestions[activeIndex]);
      } else {
        handleSubmitSearch();
      }
    }
  };

  const handleSelectProduct = (product: Product) => {
    setShowDropdown(false);
    setInputValue(product.name);
    navigate(`/product/${getProductSlug(product.name)}`);
  };

  const handleSubmitSearch = () => {
    if (!inputValue.trim()) return;
    setShowDropdown(false);

    const normalizedQuery = normalizeSearchText(inputValue);
    const matched = allProducts.filter((product) => {
      const name = normalizeSearchText(product.name);
      const brand = normalizeSearchText(product.brand || '');
      const cat = normalizeSearchText(product.category);
      return name.includes(normalizedQuery) || brand.includes(normalizedQuery) || cat.includes(normalizedQuery);
    });

    if (matched.length === 1) {
      // Redirect direct PDP if exactly one matched product
      navigate(`/product/${getProductSlug(matched[0].name)}`);
    } else {
      // Otherwise navigate to listing page
      navigate('/products', `search=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  // Highlights text segments matching suggestion query
  const renderHighlight = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-[#7C3AED] font-extrabold">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-100 px-4 sm:px-8 flex items-center justify-between gap-4 select-none sticky top-0 z-30 shadow-xs">
      {/* Left: Farminix Logo & Location Selector */}
      <div className="flex items-center gap-6 shrink-0">
        {/* Logo */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer shrink-0 group">
          <img
            src="/farminix_logo.png"
            alt="Farminix Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Location Selector */}
        <button
          onClick={() => setIsLocationOpen(true)}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-gray-200 transition-all text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0 text-[#5B21B6]">
            <MapPin className="w-5 h-5 fill-purple-100" />
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Deliver to</div>
            <div className="text-xs font-bold text-gray-900 flex items-center gap-1 max-w-[200px] truncate">
              {location}
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            </div>
          </div>
        </button>
      </div>

      {/* Center: Premium Smart Search Bar */}
      <div className="flex-1 max-w-2xl mx-2 relative" ref={dropdownRef}>
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowDropdown(true);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search for rice, atta, oil, dal, masala..."
            className="w-full h-11 pl-10 pr-24 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-purple-50 transition-all"
          />

          {/* Indicators: Loading / Clear */}
          <div className="absolute right-20 flex items-center gap-2">
            {isLoading && (
              <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
            )}
            {inputValue && (
              <button
                onClick={() => {
                  setInputValue('');
                  setSuggestions([]);
                  navigate('/');
                }}
                className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={handleSubmitSearch}
            className="absolute right-1 h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-[10px] transition-colors flex items-center justify-center shadow-xs cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown Card */}
        {showDropdown && (suggestions.length > 0 || (inputValue && !isLoading)) && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-150 shadow-[0_12px_32px_rgba(0,0,0,0.08)] overflow-hidden z-50 text-left">
            {suggestions.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Suggestions
                </div>
                
                {suggestions.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 transition-colors text-left border-none focus:outline-none cursor-pointer ${
                      index === activeIndex ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-9 h-9 rounded-lg object-cover bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {renderHighlight(product.name, inputValue)}
                      </div>
                      <div className="text-[10px] font-semibold text-slate-400 mt-0.5">
                        {product.brand} • <span className="text-slate-500 font-bold">{product.weight}</span>
                      </div>
                    </div>
                    
                    <span className="text-xs font-bold text-[#7C3AED] shrink-0 bg-purple-50 px-2 py-0.5 rounded-md">
                      ₹{product.price}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              inputValue && !isLoading && (
                <div className="p-4 text-center text-xs font-bold text-slate-400">
                  No suggestions matching "{inputValue}"
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Right: Actions (Login/Sign Up & Cart) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* User Login/Account */}
        <button
          onClick={() => setIsAuthOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] border border-transparent rounded-[10px] transition-all shadow-2xs cursor-pointer"
        >
          <UserIcon className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">
            {user ? `Hi, ${user.name.split(' ')[0]}` : 'Login / Sign up'}
          </span>
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] border border-transparent rounded-[10px] transition-all shadow-2xs cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4 text-white" />
          <span>Cart ({totalCartItems})</span>
          {totalCartItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#EA580C] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              {totalCartItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
