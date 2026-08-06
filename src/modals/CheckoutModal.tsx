import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, ShieldCheck, Truck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartTotal,
    cartDiscount,
    cart,
    user,
    createOrder,
    setIsTrackOrderOpen,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [selectedSlot, setSelectedSlot] = useState('10 Min Instant Express');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const defaultAddress = user?.addresses[0] || {
    id: 'addr-1',
    name: 'Hitaishi Devarapalli',
    street: 'Plot No. 42, Brodipet 4th Line',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    pincode: '522034',
    phone: '+91 98765 43210',
    isDefault: true,
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      createOrder(defaultAddress, paymentMethod);

      // Trigger Celebration Confetti!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsCheckoutOpen(false);
      setIsTrackOrderOpen(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      <div
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src="/farminix_logo.png" alt="Farminix Logo" className="h-8 w-auto object-contain" />
            <span className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="text-lg font-bold text-gray-900">Secure Checkout</h2>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6 text-left">
          {/* Address Card */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Delivery Address
            </label>
            <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7C3AED] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-gray-900">{defaultAddress.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}
                  </div>
                  <div className="text-[11px] font-medium text-gray-500 mt-1">Phone: {defaultAddress.phone}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#7C3AED] bg-white px-2 py-0.5 rounded-md border border-purple-200 shrink-0">
                DEFAULT
              </span>
            </div>
          </div>

          {/* Delivery Slot */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Delivery Slot
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedSlot('10 Min Instant Express')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  selectedSlot === '10 Min Instant Express'
                    ? 'border-[#7C3AED] bg-purple-50/80 text-[#7C3AED] font-bold'
                    : 'border-gray-200 hover:bg-slate-50'
                }`}
              >
                <Zap className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold">10 Min Express</div>
                  <div className="text-[10px] text-gray-500">Free Instant Delivery</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSlot('Scheduled Today Evening (6 PM - 8 PM)')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  selectedSlot.includes('Scheduled')
                    ? 'border-[#7C3AED] bg-purple-50/80 text-[#7C3AED] font-bold'
                    : 'border-gray-200 hover:bg-slate-50'
                }`}
              >
                <Truck className="w-5 h-5 text-purple-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Scheduled Slot</div>
                  <div className="text-[10px] text-gray-500">Today 6 PM - 8 PM</div>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Select Payment Method
            </label>
            <div className="space-y-2">
              {[
                { id: 'UPI', label: 'Google Pay / PhonePe / Paytm UPI', icon: '📱' },
                { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
                { id: 'NETBANKING', label: 'Net Banking (All Major Indian Banks)', icon: '🏦' },
                { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === m.id
                      ? 'border-[#7C3AED] bg-purple-50/60 font-bold'
                      : 'border-gray-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{m.icon}</span>
                    <span className="text-xs font-semibold text-gray-900">{m.label}</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="w-4 h-4 text-[#7C3AED] focus:ring-purple-500"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>₹{cartTotal + cartDiscount}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-purple-700 font-semibold">
                <span>Total Savings (FARM10)</span>
                <span>-₹{cartDiscount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-[#7C3AED]">FREE</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-black text-gray-900">
              <span>To Pay</span>
              <span className="text-[#7C3AED]">₹{cartTotal}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="mt-6">
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full h-12 bg-[#7C3AED] hover:bg-purple-800 disabled:bg-gray-400 text-white text-sm font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Place Order • ₹{cartTotal}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
