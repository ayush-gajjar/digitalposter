'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/home', icon: 'ri-home-line', iconActive: 'ri-home-fill', label: 'Home' },
    { href: '/templates', icon: 'ri-layout-line', iconActive: 'ri-layout-fill', label: 'Templates' },
    { href: '/create', icon: 'ri-add-circle-line', iconActive: 'ri-add-circle-fill', label: 'Create' },
    { href: '/history', icon: 'ri-history-line', iconActive: 'ri-history-fill', label: 'History' },
    { href: '/profile', icon: 'ri-user-line', iconActive: 'ri-user-fill', label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center space-y-1 transition-colors"
            >
              <div className={`w-6 h-6 flex items-center justify-center ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                <i className={`text-xl ${isActive ? item.iconActive : item.icon}`}></i>
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}