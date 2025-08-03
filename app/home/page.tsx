
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [likedTemplates, setLikedTemplates] = useState<Set<number>>(new Set());
  const [savedTemplates, setSavedTemplates] = useState<Set<number>>(new Set());

  const festivals = [
    { 
      id: 'diwali', 
      name: 'Diwali', 
      icon: '🪔',
      description: 'Festival of Lights',
      color: 'from-orange-400 to-red-500',
      templates: 50
    },
    { 
      id: 'holi', 
      name: 'Holi', 
      icon: '🎨',
      description: 'Festival of Colors',
      color: 'from-pink-400 to-purple-500',
      templates: 45
    },
    { 
      id: 'eid', 
      name: 'Eid', 
      icon: '🌙',
      description: 'Islamic Celebration',
      color: 'from-green-400 to-teal-500',
      templates: 35
    },
    { 
      id: 'christmas', 
      name: 'Christmas', 
      icon: '🎄',
      description: 'Holiday Season',
      color: 'from-red-400 to-green-500',
      templates: 60
    },
    { 
      id: 'new-year', 
      name: 'New Year', 
      icon: '🎆',
      description: 'New Beginning',
      color: 'from-yellow-400 to-orange-500',
      templates: 40
    },
    { 
      id: 'wedding', 
      name: 'Wedding', 
      icon: '💒',
      description: 'Special Day',
      color: 'from-rose-400 to-pink-500',
      templates: 55
    },
    { 
      id: 'birthday', 
      name: 'Birthday', 
      icon: '🎂',
      description: 'Celebration Time',
      color: 'from-blue-400 to-indigo-500',
      templates: 65
    },
    { 
      id: 'business', 
      name: 'Business', 
      icon: '🏢',
      description: 'Professional Events',
      color: 'from-gray-400 to-blue-500',
      templates: 70
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'ri-apps-line' },
    { id: 'trending', name: 'Trending', icon: 'ri-fire-line' },
    { id: 'recent', name: 'Recent', icon: 'ri-time-line' },
    { id: 'popular', name: 'Popular', icon: 'ri-star-line' }
  ];

  const trendingTemplates = [
    { 
      id: 1, 
      name: 'Diwali Sale Special', 
      category: 'diwali', 
      downloads: 2500,
      likes: 1250,
      shares: 840,
      isFavorite: false,
      image: 'https://readdy.ai/api/search-image?query=Modern%20Diwali%20sale%20poster%20template%20with%20elegant%20golden%20decorations%2C%20festive%20elements%2C%20discount%20offer%20design%2C%20commercial%20layout%2C%20traditional%20Indian%20motifs%2C%20luxury%20aesthetic&width=200&height=300&seq=trending1&orientation=portrait',
      isPremium: false
    },
    { 
      id: 2, 
      name: 'Christmas Celebration', 
      category: 'christmas', 
      downloads: 2200,
      likes: 1100,
      shares: 950,
      isFavorite: false,
      image: 'https://readdy.ai/api/search-image?query=Festive%20Christmas%20celebration%20poster%20with%20snow%20effects%2C%20Christmas%20tree%2C%20red%20and%20green%20colors%2C%20holiday%20decorations%2C%20winter%20theme%2C%20joyful%20design%2C%20modern%20layout&width=200&height=300&seq=trending2&orientation=portrait',
      isPremium: true
    },
    { 
      id: 3, 
      name: 'New Year Party', 
      category: 'new-year', 
      downloads: 1900,
      likes: 980,
      shares: 750,
      isFavorite: false,
      image: 'https://readdy.ai/api/search-image?query=Sparkling%20New%20Year%20party%20poster%20with%20fireworks%2C%20golden%20confetti%2C%20champagne%20celebration%2C%20midnight%20party%20theme%2C%20elegant%20black%20and%20gold%20design&width=200&height=300&seq=trending3&orientation=portrait',
      isPremium: false
    },
    { 
      id: 4, 
      name: 'Wedding Invitation', 
      category: 'wedding', 
      downloads: 1800,
      likes: 1350,
      shares: 670,
      isFavorite: false,
      image: 'https://readdy.ai/api/search-image?query=Elegant%20wedding%20invitation%20poster%20with%20floral%20decorations%2C%20romantic%20design%2C%20soft%20colors%2C%20love%20theme%2C%20marriage%20celebration%2C%20beautiful%20typography&width=200&height=300&seq=trending4&orientation=portrait',
      isPremium: true
    },
    { 
      id: 5, 
      name: 'Holi Colors Festival', 
      category: 'holi', 
      downloads: 1650,
      likes: 890,
      shares: 420,
      isFavorite: false,
      image: 'https://readdy.ai/api/search-image?query=Vibrant%20Holi%20festival%20poster%20with%20colorful%20powder%20explosion%2C%20rainbow%20colors%2C%20spring%20celebration%2C%20joyful%20design%2C%20traditional%20Indian%20festival&width=200&height=300&seq=trending5&orientation=portrait',
      isPremium: false
    },
    { 
      id: 6, 
      name: 'Eid Mubarak Wishes', 
      category: 'eid', 
      downloads: 1520,
      likes: 760,
      shares: 380,
      isFavorite: false,
      image: 'https://readdy.ai/api/search-image?query=Elegant%20Eid%20Mubarak%20poster%20with%20Islamic%20geometric%20patterns%2C%20crescent%20moon%2C%20stars%2C%20golden%20accents%2C%20peaceful%20colors%2C%20religious%20festival%20design&width=200&height=300&seq=trending6&orientation=portrait',
      isPremium: false
    }
  ];

  const downloadFormats = [
    { format: 'JPG', extension: 'jpg', icon: 'ri-image-line', description: 'Standard image format', size: '2.1 MB' },
    { format: 'PNG', extension: 'png', icon: 'ri-image-2-line', description: 'Transparent background', size: '3.4 MB' },
    { format: 'PDF', extension: 'pdf', icon: 'ri-file-pdf-line', description: 'Print-ready document', size: '1.8 MB' },
    { format: 'SVG', extension: 'svg', icon: 'ri-vector-line', description: 'Scalable vector', size: '0.5 MB' },
    { format: 'JPEG', extension: 'jpeg', icon: 'ri-image-line', description: 'Compressed image', size: '1.9 MB' },
    { format: 'Poster', extension: 'poster', icon: 'ri-poster-line', description: 'High-res poster', size: '5.2 MB' }
  ];

  const handleLike = (templateId: number) => {
    setLikedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  const handleSave = (templateId: number) => {
    setSavedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  const handleDownload = (template: any) => {
    setSelectedTemplate(template);
    setShowDownloadModal(true);
  };

  const handleDownloadFormat = (format: any) => {
    // Simulate download
    const link = document.createElement('a');
    link.download = `${selectedTemplate.name.replace(/\s+/g, '-').toLowerCase()}.${format.extension}`;
    link.href = selectedTemplate.image;
    link.click();
    
    setShowDownloadModal(false);
    setSelectedTemplate(null);
  };

  const handleShare = (template: any) => {
    if (navigator.share) {
      navigator.share({
        title: template.name,
        text: `Check out this amazing ${template.category} poster!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const featuredCategories = [
    {
      id: 'seasonal',
      name: 'Seasonal Specials',
      description: 'Perfect for current season',
      color: 'from-emerald-400 to-teal-500',
      templates: [
        'https://readdy.ai/api/search-image?query=Spring%20season%20festival%20poster%20with%20blooming%20flowers%2C%20fresh%20colors%2C%20nature%20theme%2C%20seasonal%20celebration%20design&width=120&height=160&seq=seasonal1&orientation=portrait',
        'https://readdy.ai/api/search-image?query=Summer%20festival%20poster%20with%20bright%20colors%2C%20sun%20elements%2C%20beach%20theme%2C%20summer%20celebration%20design&width=120&height=160&seq=seasonal2&orientation=portrait',
        'https://readdy.ai/api/search-image?query=Autumn%20festival%20poster%20with%20falling%20leaves%2C%20warm%20colors%2C%20harvest%20theme%2C%20fall%20celebration%20design&width=120&height=160&seq=seasonal3&orientation=portrait'
      ]
    },
    {
      id: 'promotional',
      name: 'Business Promotions',
      description: 'Boost your business',
      color: 'from-indigo-400 to-purple-500',
      templates: [
        'https://readdy.ai/api/search-image?query=Professional%20business%20promotion%20poster%20with%20modern%20design%2C%20corporate%20colors%2C%20marketing%20campaign%2C%20commercial%20advertisement&width=120&height=160&seq=promo1&orientation=portrait',
        'https://readdy.ai/api/search-image?query=Sale%20promotion%20poster%20with%20discount%20offers%2C%20shopping%20deals%2C%20retail%20marketing%2C%20promotional%20campaign%20design&width=120&height=160&seq=promo2&orientation=portrait',
        'https://readdy.ai/api/search-image?query=Grand%20opening%20poster%20with%20ribbon%20cutting%2C%20new%20business%20launch%2C%20inauguration%20celebration%2C%20opening%20ceremony&width=120&height=160&seq=promo3&orientation=portrait'
      ]
    }
  ];

  const quickActions = [
    { 
      name: 'AI Generator', 
      icon: 'ri-magic-line', 
      color: 'from-purple-500 to-pink-500',
      description: 'Create with AI',
      href: '/create?mode=ai'
    },
    { 
      name: 'Photo Editor', 
      icon: 'ri-image-edit-line', 
      color: 'from-green-500 to-teal-500',
      description: 'Edit photos',
      href: '/create/photo-editor'
    },
    { 
      name: 'Quick Start', 
      icon: 'ri-flashlight-line', 
      color: 'from-orange-500 to-red-500',
      description: 'Fast creation',
      href: '/templates?filter=quick'
    },
    { 
      name: 'Templates', 
      icon: 'ri-layout-grid-line', 
      color: 'from-blue-500 to-indigo-500',
      description: 'Browse all',
      href: '/templates'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Welcome to Festival Poster Maker</h1>
                <p className="text-blue-100 text-sm mb-4">Create stunning posters for any occasion with professional tools</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <i className="ri-template-line"></i>
                    <span>500+ Templates</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-magic-line"></i>
                    <span>AI Powered</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <i className="ri-palette-line text-3xl"></i>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}>
                    <i className={`${action.icon} text-2xl text-white`}></i>
                  </div>
                  <p className="text-xs font-medium text-gray-900">{action.name}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Festival Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Festival Categories</h2>
            <Link href="/templates" className="text-blue-500 font-medium text-sm hover:text-blue-600">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {festivals.map((festival) => (
              <Link key={festival.id} href={`/templates?festival=${festival.id}`}>
                <div className={`bg-gradient-to-r ${festival.color} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl">{festival.icon}</div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{festival.templates} templates</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{festival.name}</h3>
                  <p className="text-white/80 text-sm">{festival.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Festival Template Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Festival Templates</h2>
            <Link href="/templates?sort=trending" className="text-blue-500 font-medium text-sm hover:text-blue-600">
              See All
            </Link>
          </div>
          <div className="space-y-4">
            {trendingTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="flex">
                  <div className="w-32 h-40 flex-shrink-0 overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 capitalize mb-2">{template.category} Festival</p>
                        {template.isPremium && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            <i className="ri-vip-crown-line mr-1"></i>
                            Premium
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <i className="ri-download-line"></i>
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-heart-line"></i>
                        <span>{template.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-share-line"></i>
                        <span>{template.shares}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLike(template.id)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                            likedTemplates.has(template.id) 
                              ? 'bg-red-50 text-red-600' 
                              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                          } !rounded-button`}
                        >
                          <i className={`${likedTemplates.has(template.id) ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
                          <span>Like</span>
                        </button>
                        
                        <button
                          onClick={() => handleSave(template.id)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                            savedTemplates.has(template.id) 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                          } !rounded-button`}
                        >
                          <i className={`${savedTemplates.has(template.id) ? 'ri-bookmark-fill' : 'ri-bookmark-line'}`}></i>
                          <span>Save</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleShare(template)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm hover:bg-green-200 transition-colors !rounded-button"
                        >
                          <i className="ri-share-line"></i>
                          <span>Share</span>
                        </button>
                        
                        <button
                          onClick={() => handleDownload(template)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors !rounded-button"
                        >
                          <i className="ri-download-line"></i>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Collections</h2>
          <div className="space-y-4">
            {featuredCategories.map((category) => (
              <div key={category.id} className={`bg-gradient-to-r ${category.color} rounded-2xl p-4 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                  <Link 
                    href={`/templates?collection=${category.id}`}
                    className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors !rounded-button"
                  >
                    Browse
                  </Link>
                </div>
                <div className="flex space-x-3 overflow-x-auto">
                  {category.templates.map((template, index) => (
                    <div key={index} className="flex-shrink-0 w-20 h-24 bg-white/20 rounded-lg overflow-hidden">
                      <img src={template} alt={`Template ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-image-line text-blue-600 text-xl"></i>
              </div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600 text-sm">Templates</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-user-line text-green-600 text-xl"></i>
              </div>
              <p className="text-2xl font-bold text-gray-900">50K+</p>
              <p className="text-gray-600 text-sm">Users</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-download-line text-purple-600 text-xl"></i>
              </div>
              <p className="text-2xl font-bold text-gray-900">1M+</p>
              <p className="text-gray-600 text-sm">Downloads</p>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <i className="ri-vip-crown-line text-2xl mr-2"></i>
                <h3 className="text-lg font-bold">Upgrade to Premium</h3>
              </div>
              <p className="text-purple-100 text-sm mb-3">Unlock all templates, remove watermarks, and get priority support</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <i className="ri-check-line"></i>
                  <span>500+ Premium Templates</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-check-line"></i>
                  <span>No Watermarks</span>
                </div>
              </div>
            </div>
            <Link
              href="/premium"
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors !rounded-button ml-4"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>

      {/* Download Format Modal */}
      {showDownloadModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Download Format</h3>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <img src={selectedTemplate.image} alt={selectedTemplate.name} className="w-12 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedTemplate.name}</h4>
                  <p className="text-sm text-gray-600">{selectedTemplate.category} Template</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {downloadFormats.map((format, index) => (
                <button
                  key={index}
                  onClick={() => handleDownloadFormat(format)}
                  className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className={`${format.icon} text-blue-600 text-xl`}></i>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{format.format}</p>
                    <p className="text-sm text-gray-600">{format.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{format.size}</p>
                    <i className="ri-download-line text-blue-500"></i>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="flex items-center space-x-2 mb-2">
                <i className="ri-information-line text-blue-600"></i>
                <span className="text-sm font-medium text-blue-900">Download Tips</span>
              </div>
              <p className="text-sm text-blue-800">Higher resolution formats are better for printing. Vector formats (SVG) are perfect for scaling.</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
