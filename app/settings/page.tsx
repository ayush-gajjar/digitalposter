
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    watermark: false,
    qualityHD: true,
    language: 'english',
    theme: 'light',
    analytics: true
  });

  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showClearCacheModal, setShowClearCacheModal] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBackupNow = async () => {
    setIsBackingUp(true);
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBackingUp(false);
    setShowBackupModal(false);
    alert('Backup completed successfully!');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    
    // Simulate data export
    const exportData = {
      userSettings: settings,
      createdPosters: 24,
      downloadHistory: [],
      favoriteTemplates: [],
      exportDate: new Date().toISOString(),
      version: '2.0.0'
    };

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `festival-poster-maker-data-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    setIsExporting(false);
    setShowExportModal(false);
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    
    // Clear various types of cache
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear localStorage
    const keysToKeep = ['user-settings', 'auth-token'];
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear any cached images or data
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }

    setIsClearingCache(false);
    setShowClearCacheModal(false);
    alert('Cache cleared successfully!');
  };

  const settingsSections = [
    {
      title: 'General',
      items: [
        {
          key: 'notifications',
          icon: 'ri-notification-line',
          title: 'Push Notifications',
          description: 'Receive updates about new templates and features',
          type: 'toggle'
        },
        {
          key: 'autoSave',
          icon: 'ri-save-line',
          title: 'Auto Save',
          description: 'Automatically save your work every 30 seconds',
          type: 'toggle'
        },
        {
          key: 'language',
          icon: 'ri-global-line',
          title: 'Language',
          description: 'Choose your preferred language',
          type: 'select',
          options: [
            { value: 'english', label: 'English' },
            { value: 'hindi', label: 'हिंदी' },
            { value: 'spanish', label: 'Español' }
          ]
        }
      ]
    },
    {
      title: 'Editor',
      items: [
        {
          key: 'qualityHD',
          icon: 'ri-hd-line',
          title: 'HD Quality Export',
          description: 'Export posters in high definition quality',
          type: 'toggle'
        },
        {
          key: 'watermark',
          icon: 'ri-image-edit-line',
          title: 'Remove Watermark',
          description: 'Premium feature to remove FPM watermark',
          type: 'toggle',
          premium: true
        },
        {
          key: 'theme',
          icon: 'ri-palette-line',
          title: 'Editor Theme',
          description: 'Choose your editor appearance',
          type: 'select',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ]
        }
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        {
          key: 'backup',
          icon: 'ri-backup-line',
          title: 'Auto Backup',
          description: 'Last backup: 2 hours ago',
          type: 'info',
          action: 'Backup Now',
          onClick: () => setShowBackupModal(true)
        },
        {
          key: 'analytics',
          icon: 'ri-bar-chart-line',
          title: 'Usage Analytics',
          description: 'Help improve the app with anonymous data',
          type: 'toggle'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your app experience</p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <div key={item.key} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <i className={`${item.icon} text-lg text-gray-600`}></i>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          {item.premium && (
                            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full">
                              Pro
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {item.type === 'toggle' && (
                          <button
                            onClick={() => handleToggle(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings[item.key] ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                            disabled={item.premium && !settings.watermark}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                        
                        {item.type === 'select' && (
                          <select
                            value={settings[item.key]}
                            onChange={(e) => setSettings(prev => ({ ...prev, [item.key]: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {item.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                        
                        {item.type === 'info' && item.action && (
                          <button 
                            onClick={item.onClick}
                            className="text-blue-500 font-medium text-sm hover:text-blue-600 !rounded-button"
                          >
                            {item.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <button 
            onClick={() => setShowExportModal(true)}
            className="w-full bg-white text-gray-700 py-4 rounded-2xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 !rounded-button"
          >
            <i className="ri-download-line text-xl"></i>
            <span>Export All Data</span>
          </button>
          
          <button 
            onClick={() => setShowClearCacheModal(true)}
            className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-2 !rounded-button"
          >
            <i className="ri-delete-bin-line text-xl"></i>
            <span>Clear Cache</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Festival Poster Maker v2.0.0
          </p>
          <p className="text-gray-400 text-xs mt-1">
            © 2024 FPM Studio. All rights reserved.
          </p>
        </div>
      </div>

      {/* Backup Confirmation Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-backup-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Backup Data</h3>
              <p className="text-gray-600">Create a backup of all your posters, settings, and preferences.</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBackupModal(false)}
                disabled={isBackingUp}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 !rounded-button"
              >
                Cancel
              </button>
              <button
                onClick={handleBackupNow}
                disabled={isBackingUp}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center !rounded-button"
              >
                {isBackingUp ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Backing up...
                  </>
                ) : (
                  'Start Backup'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-download-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Export All Data</h3>
              <p className="text-gray-600">Download all your data including settings, posters, and history as a JSON file.</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                disabled={isExporting}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 !rounded-button"
              >
                Cancel
              </button>
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center !rounded-button"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  'Export Data'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cache Modal */}
      {showClearCacheModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-delete-bin-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Clear Cache</h3>
              <p className="text-gray-600">This will clear all temporary files, cached images, and improve app performance. Your saved data won't be affected.</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearCacheModal(false)}
                disabled={isClearingCache}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 !rounded-button"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCache}
                disabled={isClearingCache}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center !rounded-button"
              >
                {isClearingCache ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Clearing...
                  </>
                ) : (
                  'Clear Cache'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
