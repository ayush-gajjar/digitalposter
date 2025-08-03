
'use client';

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function AboutPage() {
  const teamMembers = [
    { name: 'Alex Johnson', role: 'Founder & CEO', avatar: 'AJ' },
    { name: 'Priya Sharma', role: 'Head of Design', avatar: 'PS' },
    { name: 'Mike Chen', role: 'Lead Developer', avatar: 'MC' },
    { name: 'Sarah Wilson', role: 'Product Manager', avatar: 'SW' }
  ];

  const achievements = [
    { icon: 'ri-download-line', number: '1M+', label: 'Downloads' },
    { icon: 'ri-user-line', number: '500K+', label: 'Active Users' },
    { icon: 'ri-image-line', number: '1000+', label: 'Templates' },
    { icon: 'ri-star-line', number: '4.8', label: 'App Rating' }
  ];

  const features = [
    { icon: 'ri-palette-line', title: 'Beautiful Design', description: 'Professionally crafted templates' },
    { icon: 'ri-smartphone-line', title: 'Mobile First', description: 'Optimized for mobile devices' },
    { icon: 'ri-global-line', title: 'Multi-Language', description: 'Support for multiple languages' },
    { icon: 'ri-shield-check-line', title: 'Secure & Private', description: 'Your data is safe with us' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white font-['Pacifico']">FPM</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Pacifico']">Festival Poster Maker</h1>
          <p className="text-gray-600 text-lg">Creating beautiful posters made simple</p>
          <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mt-4">
            <span className="text-blue-700 font-medium">Version 1.0.0</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Festival Poster Maker was born from a simple idea: everyone should be able to create stunning festival posters without being a professional designer. We noticed that small business owners and individuals struggled to create eye-catching promotional materials for festivals and special occasions.
            </p>
            <p>
              Our team of designers and developers worked tirelessly to create an app that combines beautiful, culturally authentic templates with powerful yet easy-to-use editing tools. Today, over 500,000 users trust FPM to help them celebrate and promote their special moments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className={`${achievement.icon} text-blue-600 text-xl`}></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.number}</div>
              <div className="text-sm text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${feature.icon} text-blue-600 text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">{member.avatar}</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{member.name}</h3>
                <p className="text-xs text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white mb-6">
          <div className="text-center">
            <i className="ri-heart-line text-3xl mb-3"></i>
            <h2 className="text-xl font-bold mb-2">Thank You!</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              We're grateful for every user who trusts us with their creative vision. Your feedback and support drive us to keep improving and adding new features.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-white text-gray-700 py-4 rounded-2xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 !rounded-button">
            <i className="ri-star-line text-xl"></i>
            <span>Rate Us on App Store</span>
          </button>
          
          <button className="w-full bg-white text-gray-700 py-4 rounded-2xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 !rounded-button">
            <i className="ri-share-line text-xl"></i>
            <span>Share with Friends</span>
          </button>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-gray-600 font-medium">Follow Us</p>
          <div className="flex justify-center space-x-4">
            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <i className="ri-facebook-fill"></i>
            </button>
            <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
              <i className="ri-twitter-fill"></i>
            </button>
            <button className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <i className="ri-instagram-fill"></i>
            </button>
            <button className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <i className="ri-youtube-fill"></i>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm space-y-1">
          <p>© 2024 FPM Studio. All rights reserved.</p>
          <div className="flex justify-center space-x-4 text-xs">
            <button className="hover:text-gray-700">Privacy Policy</button>
            <button className="hover:text-gray-700">Terms of Service</button>
            <button className="hover:text-gray-700">Licenses</button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
