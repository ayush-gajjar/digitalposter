
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white font-[\'Pacifico\']">FPM</span>
              </div>
              <span className="text-lg font-bold text-gray-900 font-[\'Pacifico\']">FPM</span>
            </Link>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            >
              <i className="ri-menu-line text-xl text-gray-700"></i>
            </button>
          </div>
        </div>
      </header>

      {showMenu && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMenu(false)}></div>
          <div className="absolute top-0 right-0 bg-white w-72 h-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Menu</h3>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <nav className="space-y-4">
                <Link href="/home" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <i className="ri-home-line text-xl text-blue-500"></i>
                  <span className="font-medium">Home</span>
                </Link>
                <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <i className="ri-user-line text-xl text-blue-500"></i>
                  <span className="font-medium">Profile</span>
                </Link>
                <Link href="/history" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <i className="ri-history-line text-xl text-blue-500"></i>
                  <span className="font-medium">History</span>
                </Link>
                <Link href="/premium" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <i className="ri-vip-crown-line text-xl text-purple-500"></i>
                  <span className="font-medium">Premium</span>
                </Link>
                <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <i className="ri-settings-line text-xl text-gray-600"></i>
                  <span className="font-medium">Settings</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
