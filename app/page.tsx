'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        router.push('/auth/login');
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className={`relative z-10 text-center transition-all duration-500 ${isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-['Pacifico']">FPM</span>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 font-['Pacifico']">Festival Poster Maker</h1>
        <p className="text-blue-100 text-lg mb-8">Create Beautiful Festival Posters</p>
        
        <div className="flex justify-center">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-white/70 text-sm">
        Powered by FPM Studio
      </div>
    </div>
  );
}