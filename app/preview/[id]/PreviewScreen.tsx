'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PreviewScreenProps {
  templateId: string;
}

export default function PreviewScreen({ templateId }: PreviewScreenProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const router = useRouter();

  const templates = {
    '1': 'https://readdy.ai/api/search-image?query=Beautiful%20Diwali%20festival%20poster%20template%20with%20traditional%20oil%20lamps%2C%20rangoli%20patterns%2C%20golden%20decorations%2C%20vibrant%20colors%2C%20celebration%20theme%2C%20Indian%20festival%20design%2C%20ornate%20borders%2C%20festive%20background&width=300&height=400&seq=diwali1&orientation=portrait',
    '2': 'https://readdy.ai/api/search-image?query=Colorful%20Holi%20festival%20poster%20with%20vibrant%20powder%20colors%2C%20celebration%20theme%2C%20Indian%20spring%20festival%2C%20rainbow%20colors%2C%20joyful%20design%2C%20festive%20background%2C%20modern%20layout&width=300&height=400&seq=holi1&orientation=portrait',
    '3': 'https://readdy.ai/api/search-image?query=Elegant%20Eid%20Mubarak%20poster%20with%20Islamic%20geometric%20patterns%2C%20crescent%20moon%2C%20stars%2C%20golden%20accents%2C%20peaceful%20colors%2C%20religious%20festival%20design%2C%20ornate%20decorations&width=300&height=400&seq=eid1&orientation=portrait'
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      setIsDownloading(false);
      // Simulate download
      const link = document.createElement('a');
      link.download = `festival-poster-${templateId}.jpg`;
      link.href = templates[templateId as keyof typeof templates] || templates['1'];
      link.click();
    }, 2000);
  };

  const handleShare = (platform: string) => {
    setIsSharing(true);
    
    setTimeout(() => {
      setIsSharing(false);
      // Simulate sharing
      console.log(`Sharing to ${platform}`);
    }, 1000);
  };

  const shareOptions = [
    { id: 'whatsapp', name: 'WhatsApp', icon: 'ri-whatsapp-line', color: 'bg-green-500' },
    { id: 'instagram', name: 'Instagram', icon: 'ri-instagram-line', color: 'bg-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: 'ri-facebook-line', color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: 'ri-twitter-line', color: 'bg-blue-400' },
    { id: 'telegram', name: 'Telegram', icon: 'ri-telegram-line', color: 'bg-blue-500' },
    { id: 'copy', name: 'Copy Link', icon: 'ri-links-line', color: 'bg-gray-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </button>
          
          <h1 className="text-lg font-bold text-gray-900">Preview Poster</h1>
          
          <button
            onClick={() => router.push(`/editor/${templateId}`)}
            className="text-blue-600 font-medium"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Poster Preview */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden" style={{ width: '300px', height: '400px' }}>
            <img
              src={templates[templateId as keyof typeof templates] || templates['1']}
              alt="Poster Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center !rounded-button"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Downloading...
              </>
            ) : (
              <>
                <i className="ri-download-line text-xl mr-3"></i>
                Download HD Poster
              </>
            )}
          </button>

          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleShare(option.id)}
                disabled={isSharing}
                className={`${option.color} text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex flex-col items-center space-y-1 !rounded-button`}
              >
                <i className={`${option.icon} text-xl`}></i>
                <span className="text-xs">{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Poster Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <i className="ri-image-line text-2xl text-blue-600 mb-2"></i>
              <p className="text-sm font-medium text-gray-900">HD Quality</p>
              <p className="text-xs text-gray-600">1080x1440px</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <i className="ri-file-line text-2xl text-green-600 mb-2"></i>
              <p className="text-sm font-medium text-gray-900">File Format</p>
              <p className="text-xs text-gray-600">JPG/PNG</p>
            </div>
          </div>
        </div>

        {/* Save to History Notice */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <i className="ri-information-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="font-medium text-gray-900">Saved to History</p>
              <p className="text-sm text-gray-600">Access this poster anytime from your history</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}