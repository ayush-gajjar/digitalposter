'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PosterEditorProps {
  templateId: string;
}

export default function PosterEditor({ templateId }: PosterEditorProps) {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Your Business Name',
    ownerName: 'Owner Name',
    phone: '+1 234 567 8900',
    email: 'business@email.com',
    address: 'Business Address Here'
  });
  
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [isEditingText, setIsEditingText] = useState(false);
  const [activeToolbar, setActiveToolbar] = useState('text');
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const colorPalette = [
    '#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', 
    '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#84CC16'
  ];

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Playfair Display'
  ];

  const templates = {
    '1': 'https://readdy.ai/api/search-image?query=Beautiful%20Diwali%20festival%20poster%20template%20with%20traditional%20oil%20lamps%2C%20rangoli%20patterns%2C%20golden%20decorations%2C%20vibrant%20colors%2C%20celebration%20theme%2C%20Indian%20festival%20design%2C%20ornate%20borders%2C%20festive%20background&width=300&height=400&seq=diwali1&orientation=portrait',
    '2': 'https://readdy.ai/api/search-image?query=Colorful%20Holi%20festival%20poster%20with%20vibrant%20powder%20colors%2C%20celebration%20theme%2C%20Indian%20spring%20festival%2C%20rainbow%20colors%2C%20joyful%20design%2C%20festive%20background%2C%20modern%20layout&width=300&height=400&seq=holi1&orientation=portrait',
    '3': 'https://readdy.ai/api/search-image?query=Elegant%20Eid%20Mubarak%20poster%20with%20Islamic%20geometric%20patterns%2C%20crescent%20moon%2C%20stars%2C%20golden%20accents%2C%20peaceful%20colors%2C%20religious%20festival%20design%2C%20ornate%20decorations&width=300&height=400&seq=eid1&orientation=portrait'
  };

  const handleSave = () => {
    router.push(`/preview/${templateId}`);
  };

  const handleTextEdit = (field: string, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
  };

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
          
          <h1 className="text-lg font-bold text-gray-900">Edit Poster</h1>
          
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium !rounded-button"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-col h-screen pt-16">
        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div 
            ref={canvasRef}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{ width: '300px', height: '400px' }}
          >
            <img
              src={templates[templateId as keyof typeof templates] || templates['1']}
              alt="Template"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay with business info */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="text-center">
                <div 
                  className="w-12 h-12 bg-white rounded-full mx-auto mb-2 flex items-center justify-center shadow-md"
                >
                  <span className="text-lg font-bold text-blue-600">L</span>
                </div>
              </div>
              
              <div 
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center"
                style={{ color: selectedColor, fontFamily: selectedFont }}
              >
                <h2 
                  className="text-lg font-bold mb-1 cursor-pointer"
                  onClick={() => setIsEditingText(true)}
                >
                  {businessInfo.businessName}
                </h2>
                <p className="text-sm mb-1">{businessInfo.ownerName}</p>
                <p className="text-xs mb-1">{businessInfo.phone}</p>
                <p className="text-xs">{businessInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="bg-white border-t border-gray-200">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100">
            {[
              { id: 'text', icon: 'ri-text', label: 'Text' },
              { id: 'color', icon: 'ri-palette-line', label: 'Colors' },
              { id: 'font', icon: 'ri-font-size', label: 'Fonts' },
              { id: 'logo', icon: 'ri-image-line', label: 'Logo' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveToolbar(tab.id)}
                className={`flex-1 py-3 text-center transition-colors ${
                  activeToolbar === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                <i className={`${tab.icon} text-lg block mb-1`}></i>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Toolbar Content */}
          <div className="p-4">
            {activeToolbar === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={businessInfo.businessName}
                    onChange={(e) => handleTextEdit('businessName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                  <input
                    type="text"
                    value={businessInfo.ownerName}
                    onChange={(e) => handleTextEdit('ownerName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            )}

            {activeToolbar === 'color' && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Choose Color</p>
                <div className="flex flex-wrap gap-3">
                  {colorPalette.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-gray-400 scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeToolbar === 'font' && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Choose Font</p>
                <div className="space-y-2">
                  {fontOptions.map((font) => (
                    <button
                      key={font}
                      onClick={() => setSelectedFont(font)}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                        selectedFont === font 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeToolbar === 'logo' && (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <i className="ri-image-line text-xl text-gray-400"></i>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Upload your logo</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors !rounded-button">
                    Choose File
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}