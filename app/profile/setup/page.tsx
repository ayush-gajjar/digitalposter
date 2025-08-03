'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    logo: null as File | null
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/home');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, logo: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Setup Profile</h1>
            <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Business Information</h2>
              <p className="text-gray-600">Tell us about your business</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                value={profileData.businessName}
                onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your business name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
              <input
                type="text"
                value={profileData.ownerName}
                onChange={(e) => setProfileData(prev => ({ ...prev, ownerName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter owner name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Details</h2>
              <p className="text-gray-600">How customers can reach you</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter website URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={profileData.address}
                onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter business address"
              />
              <p className="text-xs text-gray-500 mt-1">{profileData.address.length}/500 characters</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Upload Logo</h2>
              <p className="text-gray-600">Add your business logo for posters</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {profileData.logo ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={URL.createObjectURL(profileData.logo)}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{profileData.logo.name}</p>
                  <label
                    htmlFor="logo-upload"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors !rounded-button"
                  >
                    Change Logo
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="ri-image-line text-2xl text-gray-400"></i>
                  </div>
                  <div>
                    <label
                      htmlFor="logo-upload"
                      className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full cursor-pointer hover:shadow-lg transition-all duration-200 !rounded-button"
                    >
                      Upload Logo
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <i className="ri-information-line text-blue-500 text-xl mt-0.5"></i>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Pro Tip</h4>
                  <p className="text-sm text-blue-700">Your logo will be automatically added to all poster templates. Make sure it's high quality for best results!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex space-x-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors !rounded-button"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 !rounded-button"
          >
            {currentStep === 3 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}