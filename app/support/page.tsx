
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: 'How do I upgrade to Premium?',
      answer: 'Go to Settings > Premium or tap the crown icon anywhere in the app. You can choose monthly, yearly, or lifetime plans.'
    },
    {
      question: 'Can I remove the watermark from free templates?',
      answer: 'The watermark can only be removed with a Premium subscription. This helps support the development of new features and templates.'
    },
    {
      question: 'How do I add my business logo to posters?',
      answer: 'Go to Profile > Business Details and upload your logo. It will automatically appear on all templates you customize.'
    },
    {
      question: 'What file formats are supported for export?',
      answer: 'You can export posters in PNG, JPG, and PDF formats. Premium users get access to high-resolution 4K exports.'
    },
    {
      question: 'How do I share posters on social media?',
      answer: 'After creating your poster, tap the Share button and choose your preferred social media platform or messaging app.'
    },
    {
      question: 'Can I collaborate with my team on designs?',
      answer: 'Team collaboration is available for Premium users. You can invite team members and work on designs together.'
    }
  ];

  const contactOptions = [
    {
      icon: 'ri-mail-line',
      title: 'Email Support',
      description: 'Get help via email',
      action: 'support@fpmstudio.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'ri-chat-3-line',
      title: 'Live Chat',
      description: 'Chat with our team',
      action: 'Start Chat',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: 'ri-phone-line',
      title: 'Phone Support',
      description: 'Premium users only',
      action: '+1 (555) 123-4567',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
    alert('Thank you! We\'ll get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">We're here to help you succeed</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-question-line mr-2"></i>
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-customer-service-2-line mr-2"></i>
              Contact
            </button>
          </div>
        </div>

        {activeTab === 'faq' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search frequently asked questions..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                      <i className="ri-arrow-down-s-line text-xl text-gray-400 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-search-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try searching with different keywords</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {contactOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center`}>
                      <i className={`${option.icon} text-xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    <button className="text-blue-500 font-medium hover:text-blue-600 !rounded-button">
                      {option.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Send us a message</h2>
              <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What can we help you with?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={500}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Please describe your issue or question..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">{contactForm.message.length}/500 characters</p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 !rounded-button"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3">
                <i className="ri-customer-service-2-line text-2xl"></i>
                <div>
                  <h3 className="font-bold mb-1">Premium Support</h3>
                  <p className="text-green-100 text-sm">Get priority support with 24/7 live chat and phone assistance</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
