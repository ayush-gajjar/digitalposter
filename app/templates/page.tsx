'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFestival, setSelectedFestival] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const festivals = [
    { id: 'all', name: 'All Festivals', icon: 'ri-apps-line', count: 500 },
    { id: 'diwali', name: 'Diwali', icon: '🪔', count: 50 },
    { id: 'holi', name: 'Holi', icon: '🎨', count: 45 },
    { id: 'eid', name: 'Eid', icon: '🌙', count: 35 },
    { id: 'christmas', name: 'Christmas', icon: '🎄', count: 60 },
    { id: 'new-year', name: 'New Year', icon: '🎆', count: 40 },
    { id: 'wedding', name: 'Wedding', icon: '💒', count: 55 },
    { id: 'birthday', name: 'Birthday', icon: '🎂', count: 65 },
    { id: 'business', name: 'Business', icon: '🏢', count: 70 }
  ];

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'trending', label: 'Trending' },
    { id: 'recent', label: 'Recent' },
    { id: 'premium', label: 'Premium' },
    { id: 'free', label: 'Free' }
  ];

  // Generate 50 templates per festival
  const generateTemplatesForFestival = (festivalId: string, count: number) => {
    const templates = [];
    const baseTemplates = {
      diwali: [
        { name: 'Golden Diwali Celebration', style: 'traditional', query: 'Elegant golden Diwali poster with traditional oil lamps, rangoli patterns, ornate decorations, festive celebration design' },
        { name: 'Modern Diwali Design', style: 'modern', query: 'Modern Diwali poster with contemporary design, geometric patterns, minimalist approach, festival lights' },
        { name: 'Diwali Sale Banner', style: 'commercial', query: 'Commercial Diwali sale poster with discount offers, shopping theme, promotional design' },
        { name: 'Family Diwali Wishes', style: 'family', query: 'Warm family Diwali poster with home celebration, traditional sweets, cozy atmosphere' },
        { name: 'Corporate Diwali Greeting', style: 'corporate', query: 'Professional corporate Diwali poster with business branding, elegant design' }
      ],
      holi: [
        { name: 'Colorful Holi Splash', style: 'vibrant', query: 'Vibrant Holi festival poster with colorful powder explosion, rainbow colors, spring celebration' },
        { name: 'Traditional Holi Art', style: 'traditional', query: 'Traditional Holi poster with Indian folk art, cultural celebration theme' },
        { name: 'Holi Water Festival', style: 'playful', query: 'Playful Holi poster with water guns, colorful splashes, joyful celebration' },
        { name: 'Holi Music Festival', style: 'musical', query: 'Musical Holi poster with instruments, dance celebration, energetic party' },
        { name: 'Spring Holi Celebration', style: 'nature', query: 'Spring Holi poster with blooming flowers, nature awakening, seasonal celebration' }
      ],
      christmas: [
        { name: 'Winter Christmas Joy', style: 'traditional', query: 'Festive Christmas poster with snow-covered tree, red and gold ornaments, winter wonderland' },
        { name: 'Santa Claus Special', style: 'classic', query: 'Classic Santa Claus poster with red suit, gift bag, children joy, holiday spirit' },
        { name: 'Christmas Market Scene', style: 'commercial', query: 'Christmas market poster with wooden stalls, holiday shopping, festive atmosphere' },
        { name: 'Christmas Family Gathering', style: 'family', query: 'Family Christmas poster with multi-generation gathering, holiday dinner, togetherness' },
        { name: 'Modern Christmas Design', style: 'modern', query: 'Modern Christmas poster with contemporary design, minimalist approach, elegant colors' }
      ],
      eid: [
        { name: 'Elegant Eid Mubarak', style: 'elegant', query: 'Elegant Eid Mubarak poster with Islamic geometric patterns, crescent moon, peaceful colors' },
        { name: 'Traditional Eid Greeting', style: 'traditional', query: 'Traditional Eid poster with mosque silhouette, cultural elements, religious celebration' },
        { name: 'Family Eid Celebration', style: 'family', query: 'Family Eid poster with togetherness theme, traditional clothing, cultural unity' },
        { name: 'Modern Eid Design', style: 'modern', query: 'Modern Eid poster with contemporary Islamic art, geometric patterns, elegant typography' },
        { name: 'Eid Charity Appeal', style: 'charity', query: 'Eid charity poster with giving theme, community support, social responsibility' }
      ],
      'new-year': [
        { name: 'Sparkling New Year', style: 'glamorous', query: 'Glamorous New Year poster with gold confetti, champagne celebration, midnight party theme' },
        { name: 'New Year Resolution', style: 'motivational', query: 'New Year resolution poster with goal setting theme, motivation message, fresh start' },
        { name: 'Fireworks Celebration', style: 'spectacular', query: 'New Year fireworks poster with spectacular display, night sky celebration, explosive colors' },
        { name: 'Countdown Party', style: 'party', query: 'New Year countdown poster with clock showing midnight, party celebration, anticipation' },
        { name: 'Business New Year', style: 'corporate', query: 'Corporate New Year poster with professional theme, business goals, success vision' }
      ],
      wedding: [
        { name: 'Elegant Wedding Invitation', style: 'elegant', query: 'Elegant wedding invitation poster with floral decorations, romantic design, soft colors' },
        { name: 'Traditional Wedding Card', style: 'traditional', query: 'Traditional wedding poster with cultural elements, ceremonial design, heritage motifs' },
        { name: 'Modern Wedding Design', style: 'modern', query: 'Modern wedding poster with minimalist design, contemporary typography, elegant layout' },
        { name: 'Destination Wedding', style: 'destination', query: 'Destination wedding poster with travel theme, exotic location, romantic getaway' },
        { name: 'Garden Wedding', style: 'nature', query: 'Garden wedding poster with natural elements, outdoor celebration, floral beauty' }
      ],
      birthday: [
        { name: 'Colorful Birthday Party', style: 'colorful', query: 'Colorful birthday party poster with balloons, confetti, celebration theme, joyful design' },
        { name: 'Kids Birthday Fun', style: 'playful', query: 'Kids birthday poster with cartoon characters, playful design, fun celebration' },
        { name: 'Elegant Adult Birthday', style: 'elegant', query: 'Elegant adult birthday poster with sophisticated design, mature celebration theme' },
        { name: 'Surprise Birthday Party', style: 'surprise', query: 'Surprise birthday poster with mystery theme, exciting celebration, party elements' },
        { name: 'Milestone Birthday', style: 'milestone', query: 'Milestone birthday poster with age celebration, achievement theme, special occasion' }
      ],
      business: [
        { name: 'Grand Opening', style: 'commercial', query: 'Grand opening business poster with ribbon cutting ceremony, new store launch, inauguration' },
        { name: 'Product Launch', style: 'product', query: 'Product launch poster with innovative design, new product showcase, marketing campaign' },
        { name: 'Corporate Event', style: 'corporate', query: 'Corporate event poster with professional conference, business meeting, networking' },
        { name: 'Sale Promotion', style: 'promotional', query: 'Sale promotion poster with discount offers, shopping deals, retail marketing' },
        { name: 'Business Anniversary', style: 'anniversary', query: 'Business anniversary poster with celebration theme, company milestone, success story' }
      ]
    };

    const festivalTemplates = baseTemplates[festivalId as keyof typeof baseTemplates] || baseTemplates.business;
    
    for (let i = 0; i < count; i++) {
      const baseTemplate = festivalTemplates[i % festivalTemplates.length];
      const variation = Math.floor(i / festivalTemplates.length) + 1;
      
      templates.push({
        id: `${festivalId}-${i + 1}`,
        name: `${baseTemplate.name} ${variation > 1 ? `V${variation}` : ''}`,
        category: festivalId,
        premium: Math.random() > 0.6,
        downloads: Math.floor(Math.random() * 2000) + 100,
        style: baseTemplate.style,
        image: `https://readdy.ai/api/search-image?query=$%7BbaseTemplate.query%7D&width=200&height=300&seq=${festivalId}${i + 1}&orientation=portrait`
      });
    }
    
    return templates;
  };

  // Generate all templates
  const allTemplates = festivals.reduce((acc, festival) => {
    if (festival.id !== 'all') {
      acc.push(...generateTemplatesForFestival(festival.id, festival.count));
    }
    return acc;
  }, [] as any[]);

  const filteredTemplates = allTemplates.filter(template => {
    const matchesFestival = selectedFestival === 'all' || template.category === selectedFestival;
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'premium' && template.premium) ||
                           (selectedCategory === 'free' && !template.premium) ||
                           (selectedCategory === 'trending' && template.downloads > 1500);
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFestival && matchesCategory && matchesSearch;
  });

  const handleFestivalClick = (festivalId: string) => {
    setSelectedFestival(festivalId);
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Templates</h1>
            <p className="text-gray-600">{filteredTemplates.length} templates available</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
            >
              <i className={`text-lg text-gray-700 ${viewMode === 'grid' ? 'ri-list-check' : 'ri-grid-line'}`}></i>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>
        </div>

        {/* Festival Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Browse by Festival</h2>
          <div className="grid grid-cols-3 gap-3">
            {festivals.map((festival) => (
              <button
                key={festival.id}
                onClick={() => handleFestivalClick(festival.id)}
                className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                  selectedFestival === festival.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">
                  {typeof festival.icon === 'string' && festival.icon.startsWith('ri-') ? (
                    <i className={`${festival.icon} text-2xl`}></i>
                  ) : (
                    <span>{festival.icon}</span>
                  )}
                </div>
                <span className="font-medium text-gray-900 text-sm text-center">{festival.name}</span>
                <span className="text-xs text-gray-500">{festival.count} templates</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4">
          <div className="flex space-x-3 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                } !rounded-button`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-search-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or category filter</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedFestival('all');
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors !rounded-button"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
            {filteredTemplates.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}`}>
                <div className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'aspect-[2/3]'} overflow-hidden relative`}>
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {template.premium && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <i className="ri-vip-crown-line mr-1"></i>
                        Pro
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center space-x-1">
                          <i className="ri-download-line"></i>
                          <span>{template.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-heart-line"></i>
                          <i className="ri-share-line"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{template.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                      <span className="text-xs text-blue-500 capitalize">{template.style}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredTemplates.length > 20 && (
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 !rounded-button">
              Load More Templates
            </button>
          </div>
        )}

        {/* Premium CTA */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white text-center">
          <i className="ri-vip-crown-line text-4xl mb-3 block"></i>
          <h3 className="text-xl font-bold mb-2">Unlock All Premium Templates</h3>
          <p className="text-purple-100 mb-4">Get access to {allTemplates.filter(t => t.premium).length}+ premium designs</p>
          <Link 
            href="/premium" 
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors !rounded-button"
          >
            <i className="ri-vip-crown-line mr-2"></i>
            Upgrade to Premium
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}