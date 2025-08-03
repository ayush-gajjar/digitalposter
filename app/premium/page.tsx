
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const features = [
    { icon: 'ri-vip-crown-line', title: '500+ Premium Templates', description: 'Access exclusive festival designs' },
    { icon: 'ri-image-edit-line', title: 'No Watermark', description: 'Export clean, professional posters' },
    { icon: 'ri-hd-line', title: '4K HD Export', description: 'Ultra-high quality downloads' },
    { icon: 'ri-palette-line', title: 'Advanced Editing', description: 'More fonts, effects, and tools' },
    { icon: 'ri-cloud-line', title: '50GB Cloud Storage', description: '10x more storage space' },
    { icon: 'ri-customer-service-2-line', title: 'Priority Support', description: '24/7 premium customer care' },
    { icon: 'ri-magic-line', title: 'AI Features', description: 'Smart design suggestions' },
    { icon: 'ri-team-line', title: 'Team Collaboration', description: 'Share and collaborate on designs' }
  ];

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$9.99',
      period: '/month',
      savings: '',
      popular: false
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$59.99',
      period: '/year',
      savings: 'Save 50%',
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: '$149.99',
      period: 'one-time',
      savings: 'Best Value',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Sweet Shop Owner',
      text: 'Premium templates helped my business stand out during Diwali. Sales increased by 40%!',
      avatar: 'RK'
    },
    {
      name: 'Sarah Johnson',
      business: 'Event Planner',
      text: 'The variety of templates and HD exports make my job so much easier. Worth every penny!',
      avatar: 'SJ'
    }
  ];

  const handlePurchase = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    console.log(`Processing ${paymentMethod} payment for ${selectedPlan} plan`);
    setShowPaymentModal(false);
    // Add payment processing logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-vip-crown-line text-2xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Go Premium</h1>
          <p className="text-gray-600 text-lg">Unlock unlimited creative possibilities</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-1 flex">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-200'
                  } !rounded-button`}
                >
                  {plan.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            {plans.map((plan) => (
              plan.id === selectedPlan && (
                <div key={plan.id} className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {plan.savings}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 mb-4 !rounded-button"
          >
            Start Free 7-Day Trial
          </button>

          <p className="text-center text-gray-500 text-sm">
            Cancel anytime • No commitments • Full access during trial
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Premium Features</h2>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <i className={`${feature.icon} text-blue-600 text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <i className="ri-check-line text-green-500 text-xl"></i>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic">"{testimonial.text}"</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
          <div className="text-center">
            <i className="ri-shield-check-line text-3xl text-green-400 mb-3"></i>
            <h3 className="text-lg font-bold mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-gray-300 text-sm">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Payment Method</h3>
              <p className="text-gray-600">Complete your premium subscription</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                  paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <i className="ri-smartphone-line text-white text-xl"></i>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-gray-900">UPI Payment</h4>
                  <p className="text-sm text-gray-600">Pay with Google Pay, PhonePe, Paytm</p>
                </div>
                {paymentMethod === 'upi' && <i className="ri-check-line text-blue-500"></i>}
              </button>
              
              <button
                onClick={() => setPaymentMethod('qr')}
                className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                  paymentMethod === 'qr' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <i className="ri-qr-code-line text-white text-xl"></i>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-gray-900">QR Code</h4>
                  <p className="text-sm text-gray-600">Scan QR with your banking app</p>
                </div>
                {paymentMethod === 'qr' && <i className="ri-check-line text-blue-500"></i>}
              </button>
            </div>
            
            {paymentMethod === 'qr' && (
              <div className="text-center mb-6">
                <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <i className="ri-qr-code-line text-6xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-600">QR Code will appear here</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  UPI ID: fpm@paytm <br />
                  Amount: {plans.find(p => p.id === selectedPlan)?.price}
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors !rounded-button"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 !rounded-button"
              >
                {paymentMethod === 'qr' ? 'I Have Paid' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
