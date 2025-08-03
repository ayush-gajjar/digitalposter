'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function ProfilePage() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const profileStats = [
    { label: 'Posters Created', value: '24', icon: 'ri-image-line' },
    { label: 'Downloads', value: '156', icon: 'ri-download-line' },
    { label: 'Shares', value: '89', icon: 'ri-share-line' },
    { label: 'Favorites', value: '12', icon: 'ri-heart-line' }
  ];

  const menuItems = [
    { icon: 'ri-user-line', title: 'Edit Profile', subtitle: 'Update your information', href: '/profile/edit' },
    { icon: 'ri-building-line', title: 'Business Details', subtitle: 'Manage business info', href: '/profile/business' },
    { icon: 'ri-vip-crown-line', title: 'Upgrade to Premium', subtitle: 'Unlock premium features', href: '/premium', badge: 'Pro' },
    { icon: 'ri-settings-line', title: 'Settings', subtitle: 'App preferences', href: '/settings' },
    { icon: 'ri-customer-service-line', title: 'Help & Support', subtitle: 'Get assistance', href: '/support' },
    { icon: 'ri-information-line', title: 'About', subtitle: 'App version 1.0.0', href: '/about' }
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    // Handle logout logic here
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">JS</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">John Smith</h2>
              <p className="text-gray-600 mb-2">john@business.com</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                <i className="ri-vip-crown-line mr-1"></i>
                Free Plan
              </span>
            </div>
            <Link
              href="/profile/edit"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <i className="ri-edit-line text-gray-600"></i>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {profileStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <i className={`${stat.icon} text-blue-600 text-xl`}></i>
                </div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Upgrade Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <i className="ri-vip-crown-line text-2xl mr-2"></i>
                <h3 className="text-lg font-bold">Go Premium</h3>
              </div>
              <p className="text-blue-100 text-sm mb-3">Unlock 500+ templates, remove watermarks, and get priority support</p>
              <Link
                href="/premium"
                className="inline-block bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors !rounded-button"
              >
                Upgrade Now
              </Link>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <i className="ri-star-line text-2xl text-yellow-300"></i>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="bg-white rounded-2xl p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <i className={`${item.icon} text-xl text-gray-600`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      {item.badge && (
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                  <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-2 !rounded-button"
          >
            <i className="ri-logout-box-line text-xl"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-logout-box-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Logout</h3>
              <p className="text-gray-600">Are you sure you want to logout from your account?</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors !rounded-button"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors !rounded-button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}