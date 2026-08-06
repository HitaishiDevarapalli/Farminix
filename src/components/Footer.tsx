import React from 'react';
import { Play, Apple } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setIsSupportOpen } = useApp();

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-12 pb-8 px-4 sm:px-8 mt-12 select-none">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand & Socials (2 cols on lg) */}
          <div className="lg:col-span-2 text-left">
            <a href="/" className="inline-block mb-3 group select-none">
              <span className="text-2xl font-black text-[#7C3AED] flex items-center gap-0.5">
                <span className="relative">
                  f
                  <span className="absolute -top-2.5 -left-0.5 text-emerald-500 text-sm rotate-12">🍃</span>
                </span>
                arminix
              </span>
            </a>
            <p className="text-xs text-gray-500 font-normal max-w-sm mb-5 leading-relaxed">
              Your trusted partner for quality groceries. Fresh produce, authentic staples, and instant 10-minute home delivery.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 text-gray-600 hover:text-[#15803D] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 text-gray-600 hover:text-[#15803D] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.714 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 text-gray-600 hover:text-[#15803D] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 text-gray-600 hover:text-[#15803D] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#" className="hover:text-[#15803D] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#15803D] transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-[#15803D] transition-colors">Blog</a></li>
              <li>
                <button onClick={() => setIsSupportOpen(true)} className="hover:text-[#15803D] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Help */}
          <div className="text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Help
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <button onClick={() => setIsSupportOpen(true)} className="hover:text-[#15803D] transition-colors">
                  FAQs
                </button>
              </li>
              <li><a href="#" className="hover:text-[#15803D] transition-colors">Shipping &amp; Delivery</a></li>
              <li><a href="#" className="hover:text-[#15803D] transition-colors">Returns &amp; Refunds</a></li>
              <li><a href="#" className="hover:text-[#15803D] transition-colors">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          {/* Col 4: Download App Buttons */}
          <div className="text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Download Our App
            </h3>
            <div className="flex flex-col gap-2.5 max-w-[170px]">
              <button
                onClick={() => alert("Redirecting to Google Play Store...")}
                className="w-full bg-black hover:bg-gray-800 text-white rounded-xl p-2.5 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white text-white shrink-0" />
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-gray-300 leading-none">GET IT ON</div>
                  <div className="text-xs font-bold text-white leading-tight">Google Play</div>
                </div>
              </button>

              <button
                onClick={() => alert("Redirecting to Apple App Store...")}
                className="w-full bg-black hover:bg-gray-800 text-white rounded-xl p-2.5 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Apple className="w-5 h-5 fill-white text-white shrink-0" />
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-gray-300 leading-none">Download on the</div>
                  <div className="text-xs font-bold text-white leading-tight">App Store</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">Cancellation Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">Refund Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">Disclaimer</a>
          </div>

          <div className="text-center sm:text-right font-medium">
            © 2025 Farminix. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
