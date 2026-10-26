import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { useToast } from '../context/ToastContext';

export const HelpPage = () => {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(0);

  const categories = [
    { id: 'general', label: 'FAQs & General Issues' },
    { id: 'partner', label: 'Partner Onboarding' },
    { id: 'legal', label: 'Legal & Terms' },
    { id: 'instamart', label: 'Instamart Support' },
  ];

  const faqData = {
    general: [
      {
        q: 'What are the delivery hours for Swiggy?',
        a: 'Swiggy delivers food and groceries round the clock (24/7) in major metro cities, subject to restaurant operating hours and local regulations.',
      },
      {
        q: 'Can I edit my order once it is placed?',
        a: 'Your order is immediately communicated to the restaurant to ensure fast preparation. Hence, modifications may not be allowed once accepted.',
      },
      {
        q: 'How does Swiggy One membership work?',
        a: 'Swiggy One is our premium membership that offers unlimited free delivery on food orders above ₹149 and Instamart orders above ₹199, along with exclusive dining discounts.',
      },
    ],
    partner: [
      {
        q: 'How do I register my restaurant on Swiggy?',
        a: 'To partner with us, click "Partner With Us" and submit your FSSAI certificate, GSTIN, menu copy, and bank account details for instant review.',
      },
      {
        q: 'What is the onboarding fee?',
        a: 'Standard onboarding fees vary by city and are deducted seamlessly from your weekly payouts with zero upfront cash required.',
      },
    ],
    legal: [
      {
        q: 'Terms of Use & Cancellation Policy',
        a: 'Orders once confirmed by restaurant partners are subject to standard cancellation policies as outlined in Swiggy Consumer Terms.',
      },
      {
        q: 'Privacy Policy & Data Security',
        a: 'We implement 256-bit encryption for all transactions and comply with applicable Indian privacy and data protection frameworks.',
      },
    ],
    instamart: [
      {
        q: 'How does 4-10 minute grocery delivery work?',
        a: 'Instamart operates dedicated neighborhood fulfillment pods equipped with state-of-the-art inventory systems and localized fleet riders.',
      },
      {
        q: 'What if an item is out of stock or damaged?',
        a: 'You can report an issue directly in the order details screen for an instant refund or replacement credit in your Swiggy balance.',
      },
    ],
  };

  const handleSupportAction = (type) => {
    showToast(`Support Agent connecting for ${type}... Hello from Swiggy Support!`);
  };

  return (
    <MainLayout>
      <div className="bg-[#282c3f] text-white py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Help &amp; Support
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            Let's take a step ahead and help you better.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Category Tabs */}
          <div className="md:col-span-1 space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedFaq(0);
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-orange-50 text-[#fc8019]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Quick Contact Box */}
            <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3">
              <p className="text-xs font-bold text-gray-800">Need direct assistance?</p>
              <button
                onClick={() => handleSupportAction('Live Chat')}
                className="w-full py-2.5 bg-[#fc8019] hover:bg-[#e56d05] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>
              <button
                onClick={() => handleSupportAction('Email Ticket')}
                className="w-full py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </button>
            </div>
          </div>

          {/* Right FAQs list */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {categories.find((c) => c.id === activeCategory)?.label}
            </h2>

            {faqData[activeCategory]?.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-gray-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#fc8019] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
