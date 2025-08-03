
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<any>(null);

  const filters = [
    { id: 'all', label: 'All Posters' },
    { id: 'recent', label: 'Recent' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'shared', label: 'Shared' }
  ];

  const posters = [
    {
      id: 1,
      name: 'Diwali Special Offer',
      category: 'Diwali',
      date: '2 hours ago',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20Diwali%20festival%20poster%20template%20with%20traditional%20oil%20lamps%2C%20rangoli%20patterns%2C%20golden%20decorations%2C%20vibrant%20colors%2C%20celebration%20theme%2C%20Indian%20festival%20design%2C%20ornate%20borders%2C%20festive%20background&width=200&height=267&seq=history1&orientation=portrait',
      isFavorite: true,
      isShared: true
    },
    {
      id: 2,
      name: 'Christmas Celebration',
      category: 'Christmas',
      date: '1 day ago',
      image: 'https://readdy.ai/api/search-image?query=Festive%20Christmas%20poster%20with%20Christmas%20tree%2C%20snowflakes%2C%20red%20and%20green%20colors%2C%20holiday%20decorations%2C%20winter%20theme%2C%20joyful%20celebration%20design%2C%20modern%20layout&width=200&height=267&seq=history2&orientation=portrait',
      isFavorite: false,
      isShared: true
    },
    {
      id: 3,
      name: 'New Year Party',
      category: 'New Year',
      date: '3 days ago',
      image: 'https://readdy.ai/api/search-image?query=Sparkling%20New%20Year%20poster%20with%20fireworks%2C%20champagne%20glasses%2C%20golden%20confetti%2C%20celebration%20theme%2C%20midnight%20party%20design%2C%20elegant%20layout%2C%20festive%20colors&width=200&height=267&seq=history3&orientation=portrait',
      isFavorite: true,
      isShared: false
    },
    {
      id: 4,
      name: 'Holi Color Festival',
      category: 'Holi',
      date: '1 week ago',
      image: 'https://readdy.ai/api/search-image?query=Colorful%20Holi%20festival%20poster%20with%20vibrant%20powder%20colors%2C%20celebration%20theme%2C%20Indian%20spring%20festival%2C%20rainbow%20colors%2C%20joyful%20design%2C%20festive%20background%2C%20modern%20layout&width=200&height=267&seq=history4&orientation=portrait',
      isFavorite: false,
      isShared: false
    },
    {
      id: 5,
      name: 'Eid Mubarak',
      category: 'Eid',
      date: '2 weeks ago',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20Eid%20Mubarak%20poster%20with%20Islamic%20geometric%20patterns%2C%20crescent%20moon%2C%20stars%2C%20golden%20accents%2C%20peaceful%20colors%2C%20religious%20festival%20design%2C%20ornate%20decorations&width=200&height=267&seq=history5&orientation=portrait',
      isFavorite: true,
      isShared: true
    },
    {
      id: 6,
      name: 'Business Anniversary',
      category: 'Business',
      date: '3 weeks ago',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20anniversary%20poster%20with%20elegant%20design%2C%20corporate%20colors%2C%20celebration%20theme%2C%20modern%20layout%2C%20success%20celebration%2C%20achievement%20milestone%20design&width=200&height=267&seq=history6&orientation=portrait',
      isFavorite: false,
      isShared: false
    }
  ];

  const filteredPosters = posters.filter(poster => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'recent') return ['2 hours ago', '1 day ago'].includes(poster.date);
    if (selectedFilter === 'favorites') return poster.isFavorite;
    if (selectedFilter === 'shared') return poster.isShared;
    return true;
  });

  const shareOptions = [
    { name: 'WhatsApp', icon: 'ri-whatsapp-line', color: 'bg-green-500' },
    { name: 'Instagram', icon: 'ri-instagram-line', color: 'bg-purple-500' },
    { name: 'Facebook', icon: 'ri-facebook-line', color: 'bg-blue-600' },
    { name: 'Twitter', icon: 'ri-twitter-line', color: 'bg-sky-500' },
    { name: 'Copy Link', icon: 'ri-link', color: 'bg-gray-500' },
    { name: 'Download', icon: 'ri-download-line', color: 'bg-indigo-500' }
  ];

  const handleToggleFavorite = (posterId: number) => {
    console.log(`Toggle favorite for poster ${posterId}`);
  };

  const handleShare = (poster: any) => {
    setSelectedPoster(poster);
    setShowShareModal(true);
  };

  const handleDelete = (poster: any) => {
    setSelectedPoster(poster);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log(`Delete poster ${selectedPoster.id}`);
    setShowDeleteConfirm(false);
    setSelectedPoster(null);
  };

  const handleShareOption = (option: string) => {
    console.log(`Sharing ${selectedPoster?.name} via ${option}`);
    setShowShareModal(false);
    setSelectedPoster(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Posters</h1>
            <p className="text-gray-600">{filteredPosters.length} posters created</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              <i className={`text-lg text-gray-700 ${viewMode === 'grid' ? 'ri-list-check' : 'ri-grid-line'}`}></i>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4">
          <div className="flex space-x-3 min-w-max">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                } !rounded-button`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posters Grid */}
        {filteredPosters.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-image-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posters found</h3>
            <p className="text-gray-600 mb-6">Start creating your first festival poster</p>
            <Link
              href="/home"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 !rounded-button"
            >
              Create Poster
            </Link>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
            {filteredPosters.map((poster) => (
              <div key={poster.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'aspect-[3/4]'} overflow-hidden`}>
                  <img
                    src={poster.image}
                    alt={poster.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{poster.name}</h3>
                      <p className="text-xs text-gray-500">{poster.category} • {poster.date}</p>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => handleToggleFavorite(poster.id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                          poster.isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <i className={`text-sm ${poster.isFavorite ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {poster.isShared && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                          <i className="ri-share-line mr-1"></i>
                          Shared
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Link
                        href={`/preview/${poster.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <i className="ri-eye-line text-sm"></i>
                      </Link>
                      <button
                        onClick={() => handleShare(poster)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-share-line text-sm"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(poster)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 transform translate-y-0 transition-transform duration-300">
            <div className="text-center mb-6">
              <div className="w-12 h-3 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Share Poster</h3>
              <p className="text-gray-600">{selectedPoster?.name}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleShareOption(option.name)}
                  className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mb-2`}>
                    <i className={`${option.icon} text-white text-xl`}></i>
                  </div>
                  <span className="text-sm text-gray-700">{option.name}</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors !rounded-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-delete-bin-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Poster</h3>
              <p className="text-gray-600">Are you sure you want to delete "{selectedPoster?.name}"? This action cannot be undone.</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors !rounded-button"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors !rounded-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
