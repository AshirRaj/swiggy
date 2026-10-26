import React, { useState, useEffect } from 'react';
import { X, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, loginWithPhone } = useAuth();
  const { showToast } = useToast();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '']);

  // Reset state when opening/closing
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep('phone');
      setOtp(['', '', '', '']);
    }
  }, [isAuthModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setStep('otp');
    showToast(`Demo OTP 1234 sent to +91 ${phoneNumber}`);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto advance
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleFillDemoOtp = () => {
    setOtp(['1', '2', '3', '4']);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 4) {
      showToast('Please enter the 4-digit OTP', 'error');
      return;
    }
    loginWithPhone(phoneNumber, name || 'Ashir');
    showToast('Successfully logged in! Welcome to Swiggy');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl p-8 sm:p-10 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div>
            {/* Close button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1 -ml-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header / Title */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#282c3f] tracking-tight">
                  {authMode === 'login' ? 'Login' : 'Sign up'}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  or{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                      setStep('phone');
                    }}
                    className="text-[#fc8019] font-semibold hover:underline cursor-pointer"
                  >
                    {authMode === 'login' ? 'create an account' : 'login to your account'}
                  </button>
                </p>
              </div>
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt="Swiggy login roll"
                className="w-24 h-24 object-contain"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* Step 1: Phone Entry */}
            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#fc8019] transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#fc8019] transition-colors">
                    <span className="px-3.5 py-3.5 bg-gray-50 text-gray-600 text-sm font-semibold border-r border-gray-200">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      className="w-full px-4 py-3.5 text-sm focus:outline-none font-medium"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#fc8019] hover:bg-[#e56d05] active:scale-[0.99] text-white font-bold text-sm tracking-wide rounded-lg uppercase shadow-lg shadow-orange-500/25 transition-all mt-4 cursor-pointer"
                >
                  {authMode === 'login' ? 'Login' : 'Continue'}
                </button>
              </form>
            ) : (
              /* Step 2: OTP Verification */
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="bg-orange-50/70 border border-orange-100 p-3.5 rounded-xl text-xs text-orange-950">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#fc8019]" />
                    <span>Demo Authentication</span>
                  </div>
                  Enter code sent to <span className="font-semibold">+91 {phoneNumber}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#fc8019] focus:outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleFillDemoOtp}
                    className="text-xs font-semibold text-[#fc8019] hover:underline cursor-pointer"
                  >
                    Auto-fill demo OTP (1234)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs text-gray-500 hover:text-gray-800"
                  >
                    Change number
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#fc8019] hover:bg-[#e56d05] active:scale-[0.99] text-white font-bold text-sm tracking-wide rounded-lg uppercase shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  Verify & Proceed
                </button>
              </form>
            )}

            <p className="text-[11px] text-gray-400 mt-6 leading-relaxed">
              By continuing, you agree to Swiggy's{' '}
              <span className="text-gray-700 font-medium">Terms of Service</span> &{' '}
              <span className="text-gray-700 font-medium">Privacy Policy</span>.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Swiggy Secure Frontend Demo</span>
            <span>v2026.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
