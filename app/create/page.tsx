'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useRouter, useSearchParams } from 'next/navigation';
import { deepSeekAI } from '@/lib/deepseek-ai';
import { Suspense } from 'react';

function CreatePageContent() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedFestival, setSelectedFestival] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const mode = searchParams?.get('mode');
    if (mode === 'ai') {
      setShowAIModal(true);
    }
  }, [searchParams]);

  const festivals = [
    { id: 'diwali', name: 'Diwali', icon: '🪔' },
    { id: 'holi', name: 'Holi', icon: '🎨' },
    { id: 'christmas', name: 'Christmas', icon: '🎄' },
    { id: 'eid', name: 'Eid', icon: '🌙' },
    { id: 'new-year', name: 'New Year', icon: '🎆' },
    { id: 'wedding', name: 'Wedding', icon: '💒' },
    { id: 'birthday', name: 'Birthday', icon: '🎂' },
    { id: 'business', name: 'Business', icon: '🏢' }
  ];

  const createOptions = [
    {
      id: 'photo-editor',
      title: 'Photo Editor',
      description: 'Full canvas editor with advanced tools',
      icon: 'ri-image-edit-line',
      color: 'from-green-500 to-teal-500',
      features: ['Pinch-zoom support', 'Advanced filters', 'Layer management', 'Professional tools']
    },
    {
      id: 'canvas-editor',
      title: 'Canvas Editor',
      description: 'Create from blank canvas with full control',
      icon: 'ri-artboard-line',
      color: 'from-blue-500 to-cyan-500',
      features: ['Custom canvas sizes', 'Shape tools', 'Text editor', 'Background options']
    },
    {
      id: 'template',
      title: 'Use Template',
      description: 'Start with a pre-designed template',
      icon: 'ri-layout-line',
      color: 'from-purple-500 to-pink-500',
      features: ['500+ templates', 'Professional designs', 'Easy customization', 'All festivals']
    },
    {
      id: 'ai',
      title: 'AI Generated',
      description: 'Let AI create a poster for you',
      icon: 'ri-magic-line',
      color: 'from-orange-500 to-red-500',
      features: ['Smart design', 'Auto layout', 'Personalized content', 'DeepSeek AI']
    }
  ];

  const quickTemplates = [
    { id: 1, name: 'Diwali Sale', category: 'diwali', image: 'https://readdy.ai/api/search-image?query=Beautiful%20Diwali%20sale%20poster%20with%20festive%20decorations%2C%20golden%20colors%2C%20discount%20offer%20design%2C%20traditional%20elements%2C%20commercial%20poster%20layout&width=150&height=200&seq=quick1&orientation=portrait' },
    { id: 2, name: 'New Year Party', category: 'new-year', image: 'https://readdy.ai/api/search-image?query=Exciting%20New%20Year%20party%20poster%20with%20fireworks%2C%20celebration%20theme%2C%20party%20invitation%20design%2C%20festive%20colors%2C%20modern%20layout&width=150&height=200&seq=quick2&orientation=portrait' },
    { id: 3, name: 'Business Launch', category: 'business', image: 'https://readdy.ai/api/search-image?query=Professional%20business%20launch%20poster%20with%20corporate%20design%2C%20announcement%20theme%2C%20modern%20business%20layout%2C%20elegant%20colors&width=150&height=200&seq=quick3&orientation=portrait' },
    { id: 4, name: 'Wedding Invitation', category: 'wedding', image: 'https://readdy.ai/api/search-image?query=Elegant%20wedding%20invitation%20poster%20with%20romantic%20design%2C%20floral%20elements%2C%20soft%20colors%2C%20love%20theme%2C%20marriage%20celebration&width=150&height=200&seq=quick4&orientation=portrait' }
  ];

  const handleCreateOption = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === 'photo-editor') {
      router.push('/create/photo-editor');
    } else if (optionId === 'template') {
      router.push('/templates');
    } else if (optionId === 'canvas-editor') {
      router.push('/create/canvas-editor');
    } else if (optionId === 'ai') {
      setShowAIModal(true);
    }
  };

  const handleAIGeneration = async () => {
    if (!aiPrompt.trim() || !selectedFestival) return;
    
    setIsGenerating(true);
    try {
      const content = await deepSeekAI.generatePosterContent(aiPrompt, selectedFestival);
      setGeneratedContent(content);
      
      // Navigate to canvas editor with AI content
      const params = new URLSearchParams({
        mode: 'ai',
        content: JSON.stringify(content),
        festival: selectedFestival
      });
      router.push(`/create/canvas-editor?${params.toString()}`);
    } catch (error) {
      console.error('AI generation failed:', error);
      alert('AI generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
      setShowAIModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Poster</h1>
          <p className="text-gray-600">Choose how you want to start creating</p>
        </div>

        <div className="space-y-4 mb-8">
          {createOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleCreateOption(option.id)}
              className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <i className={`${option.icon} text-2xl text-white`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-xl text-gray-400 group-hover:text-gray-600 transition-colors"></i>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Templates</h2>
            <Link href="/templates" className="text-blue-500 font-medium text-sm hover:text-blue-600">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickTemplates.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}`}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm">{template.name}</h3>
                    <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Generation Teaser */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <i className="ri-magic-line text-3xl"></i>
            <div>
              <h3 className="text-lg font-bold">AI Poster Generator</h3>
              <p className="text-orange-100 text-sm">Powered by DeepSeek AI</p>
            </div>
          </div>
          <p className="text-orange-100 text-sm mb-4">
            Describe your event and let AI create the perfect poster automatically with smart design suggestions.
          </p>
          <button 
            onClick={() => setShowAIModal(true)}
            className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors !rounded-button"
          >
            Try AI Generator
          </button>
        </div>

        {/* Recent Creations */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Creations</h2>
            <Link href="/history" className="text-blue-500 font-medium text-sm hover:text-blue-600">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center">
                <i className="ri-image-line text-2xl text-gray-400"></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Generation Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">AI Poster Generator</h3>
              <button
                onClick={() => setShowAIModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Festival Type</label>
                <div className="grid grid-cols-4 gap-3">
                  {festivals.map((festival) => (
                    <button
                      key={festival.id}
                      onClick={() => setSelectedFestival(festival.id)}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                        selectedFestival === festival.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl mb-1">{festival.icon}</span>
                      <span className="text-xs font-medium text-gray-700">{festival.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Poster</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., Create a Diwali sale poster for my electronics store with 50% off discount, golden colors, and modern design..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{aiPrompt.length}/500 characters</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAIModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors !rounded-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAIGeneration}
                  disabled={!aiPrompt.trim() || !selectedFestival || isGenerating}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <>
                      <i className="ri-magic-line mr-2"></i>
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="flex items-center space-x-2 mb-2">
                <i className="ri-information-line text-blue-600"></i>
                <span className="text-sm font-medium text-blue-900">AI Tips</span>
              </div>
              <p className="text-sm text-blue-800">Be specific about colors, style, text content, and purpose for best results!</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CreatePageContent />
    </Suspense>
  );
}