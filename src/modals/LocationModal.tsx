import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocationModal: React.FC = () => {
  const { isLocationOpen, setIsLocationOpen, location, setLocation } = useApp();
  const [pincodeInput, setPincodeInput] = useState('');

  if (!isLocationOpen) return null;

  const popularLocations = [
    'Guntur, Andhra Pradesh - 522034',
    'Vijayawada, Andhra Pradesh - 520001',
    'Visakhapatnam, Andhra Pradesh - 530001',
    'Hyderabad, Telangana - 500001',
    'Bengaluru, Karnataka - 560001',
  ];

  const handleSelect = (loc: string) => {
    setLocation(loc);
    setIsLocationOpen(false);
  };

  const handleCustomPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setLocation(`Location - ${pincodeInput}`);
      setIsLocationOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      <div
        onClick={() => setIsLocationOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src="/farminix_logo.png" alt="Farminix Logo" className="h-8 w-auto object-contain" />
            <span className="h-4 w-px bg-gray-200" />
            <h2 className="text-base font-bold text-gray-900">Select Location</h2>
          </div>
          <button
            onClick={() => setIsLocationOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enter Pincode Form */}
        <form onSubmit={handleCustomPincode} className="mt-4">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Enter 6-Digit Pincode</label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 522034"
              className="flex-1 h-11 px-3.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#15803D] font-bold"
            />
            <button
              type="submit"
              disabled={pincodeInput.length !== 6}
              className="px-5 h-11 bg-[#15803D] disabled:bg-gray-300 hover:bg-green-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
            >
              Check
            </button>
          </div>
        </form>

        {/* Popular Cities List */}
        <div className="mt-5 text-left">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Popular Cities</div>
          <div className="space-y-2">
            {popularLocations.map((loc) => {
              const isSelected = location === loc;
              return (
                <button
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-[#15803D] bg-emerald-50 text-[#15803D] font-bold'
                      : 'border-gray-100 hover:bg-slate-50 text-gray-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 shrink-0 text-[#5B21B6]" />
                    <span className="text-xs">{loc}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#15803D]" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
