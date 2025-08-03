
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TemplateDetailProps {
  templateId: string;
}

export default function TemplateDetail({ templateId }: TemplateDetailProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const router = useRouter();

  const templates = {
    '1': {
      name: 'Diwali Special Offer',
      category: 'diwali',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20Diwali%20festival%20poster%20template%20with%20traditional%20oil%20lamps%2C%20rangoli%20patterns%2C%20golden%20decorations%2C%20vibrant%20colors%2C%20celebration%20theme%2C%20Indian%20festival%20design%2C%20ornate%20borders%2C%20festive%20background&width=300&height=400&seq=diwali1&orientation=portrait',
      description: 'Perfect for Diwali celebrations and special offers'
    },
    '2': {
      name: 'Holi Color Festival',
      category: 'holi',
      image: 'https://readdy.ai/api/search-image?query=Colorful%20Holi%20festival%20poster%20with%20vibrant%20powder%20colors%2C%20celebration%20theme%2C%20Indian%20spring%20festival%2C%20rainbow%20colors%2C%20joyful%20design%2C%20festive%20background%2C%20modern%20layout&width=300&height=400&seq=holi1&orientation=portrait',
      description: 'Vibrant template for Holi celebrations'
    },
    '3': {
      name: 'Eid Mubarak',
      category: 'eid',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20Eid%20Mubarak%20poster%20with%20Islamic%20geometric%20patterns%2C%20crescent%20moon%2C%20stars%2C%20golden%20accents%2C%20peaceful%20colors%2C%20religious%20festival%20design%2C%20ornate%20decorations&width=300&height=400&seq=eid1&orientation=portrait',
      description: 'Elegant design for Eid celebrations'
    },
    '4': {
      name: 'Christmas Joy',
      category: 'christmas',
      image: 'https://readdy.ai/api/search-image?query=Festive%20Christmas%20poster%20with%20Christmas%20tree%2C%20snowflakes%2C%20red%20and%20green%20colors%2C%20holiday%20decorations%2C%20winter%20theme%2C%20joyful%20celebration%20design%2C%20modern%20layout&width=300&height=400&seq=christmas1&orientation=portrait',
      description: 'Festive Christmas celebration template'
    },
    '5': {
      name: 'New Year Celebration',
      category: 'new-year',
      image: 'https://readdy.ai/api/search-image?query=Sparkling%20New%20Year%20poster%20with%20fireworks%2C%20champagne%20glasses%2C%20golden%20confetti%2C%20celebration%20theme%2C%20midnight%20party%20design%2C%20elegant%20layout%2C%20festive%20colors&width=300&height=400&seq=newyear1&orientation=portrait',
      description: 'Sparkling New Year celebration design'
    },
    '6': {
      name: 'Diwali Greetings',
      category: 'diwali',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Diwali%20greeting%20poster%20with%20diyas%2C%20lotus%20flowers%2C%20paisley%20patterns%2C%20warm%20golden%20colors%2C%20Indian%20festival%20celebration%2C%20ornate%20design%2C%20festive%20background&width=300&height=400&seq=diwali2&orientation=portrait',
      description: 'Traditional Diwali greeting template'
    }
  };

  const template = templates[templateId as keyof typeof templates];

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Not Found</h1>
          <Link href="/home" className="text-blue-500 hover:text-blue-600">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleCustomize = () => {
    router.push(`/editor/${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
          >
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </button>

          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200">
              <i className="ri-heart-line text-xl text-gray-700"></i>
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200">
              <i className="ri-share-line text-xl text-gray-700"></i>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{template.name}</h1>
                <p className="text-gray-600 capitalize">{template.category} • Free Template</p>
              </div>
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors !rounded-button"
              >
                {isPreviewMode ? 'Exit Preview' : 'Preview'}
              </button>
            </div>

            <p className="text-gray-600 mb-6">{template.description}</p>

            <div className="relative">
              <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm !rounded-button"
                >
                  <i className="ri-eye-line mr-2"></i>
                  Preview
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="ri-palette-line text-blue-600 text-xl"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">Customizable</p>
                <p className="text-xs text-gray-600">Colors & Text</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="ri-download-line text-green-600 text-xl"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">HD Quality</p>
                <p className="text-xs text-gray-600">High Resolution</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="ri-share-line text-purple-600 text-xl"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">Share Easy</p>
                <p className="text-xs text-gray-600">All Platforms</p>
              </div>
            </div>

            <button
              onClick={handleCustomize}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 !rounded-button"
            >
              Customize This Template
            </button>
          </div>
        </div>
      </div>

      {isPreviewMode && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-sm mx-4">
            <button
              onClick={() => setIsPreviewMode(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <img
              src={template.image}
              alt={template.name}
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
