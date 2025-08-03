'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'users', label: 'Users', icon: 'ri-user-line' },
    { id: 'templates', label: 'Templates', icon: 'ri-layout-line' },
    { id: 'payments', label: 'Payments', icon: 'ri-money-dollar-circle-line' },
    { id: 'analytics', label: 'Analytics', icon: 'ri-bar-chart-line' }
  ];

  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', icon: 'ri-user-line', color: 'bg-blue-500' },
    { label: 'Premium Users', value: '2,847', change: '+8%', icon: 'ri-vip-crown-line', color: 'bg-purple-500' },
    { label: 'Templates', value: '524', change: '+15%', icon: 'ri-layout-line', color: 'bg-green-500' },
    { label: 'Revenue', value: '$45,289', change: '+23%', icon: 'ri-money-dollar-circle-line', color: 'bg-orange-500' }
  ];

  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@email.com', plan: 'Premium', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', plan: 'Free', status: 'active', joinDate: '2024-01-14' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', plan: 'Premium', status: 'banned', joinDate: '2024-01-13' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', plan: 'Lifetime', status: 'active', joinDate: '2024-01-12' },
    { id: 5, name: 'Alex Brown', email: 'alex@email.com', plan: 'Free', status: 'inactive', joinDate: '2024-01-11' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', user: 'John Smith', time: '2 min ago', type: 'user' },
              { action: 'Premium purchase', user: 'Sarah Johnson', time: '5 min ago', type: 'payment' },
              { action: 'Template uploaded', user: 'Admin', time: '10 min ago', type: 'template' },
              { action: 'User reported issue', user: 'Mike Wilson', time: '15 min ago', type: 'support' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                  activity.type === 'template' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <i className={`text-sm ${
                    activity.type === 'user' ? 'ri-user-add-line' :
                    activity.type === 'payment' ? 'ri-money-dollar-circle-line' :
                    activity.type === 'template' ? 'ri-image-add-line' :
                    'ri-customer-service-line'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 !rounded-button">
              <i className="ri-add-line text-2xl mb-2"></i>
              <p className="text-sm font-medium">Add Template</p>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 !rounded-button">
              <i className="ri-user-add-line text-2xl mb-2"></i>
              <p className="text-sm font-medium">Add User</p>
            </button>
            <button className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 !rounded-button">
              <i className="ri-notification-line text-2xl mb-2"></i>
              <p className="text-sm font-medium">Send Alert</p>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 !rounded-button">
              <i className="ri-settings-line text-2xl mb-2"></i>
              <p className="text-sm font-medium">Settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">User Management</h3>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors !rounded-button">
              Export Data
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 !rounded-button">
              Add User
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{user.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.plan === 'Premium' ? 'bg-purple-100 text-purple-800' :
                    user.plan === 'Lifetime' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.plan === 'Premium' && <i className="ri-vip-crown-line mr-1"></i>}
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'banned' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button className="text-red-600 hover:text-red-900">
                    {user.status === 'banned' ? 'Unban' : 'Ban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold font-['Pacifico']">FPM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Festival Poster Maker</p>
              </div>
            </div>
          </div>
          
          <nav className="mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} text-xl`}></i>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="absolute bottom-6 left-6">
            <Link href="/home" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <i className="ri-arrow-left-line"></i>
              <span className="text-sm">Back to App</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <p className="text-gray-600">Manage your Festival Poster Maker application</p>
          </div>

          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'templates' && (
            <div className="text-center py-12">
              <i className="ri-layout-line text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Template Management</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
          {activeTab === 'payments' && (
            <div className="text-center py-12">
              <i className="ri-money-dollar-circle-line text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Management</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <i className="ri-bar-chart-line text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}