'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Phone,
  Sparkles
} from 'lucide-react';
import type { HeroSectionProps } from '@/types/sections';

export default function HeroSection({ currentLanguage }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl">
                <Star className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? (
                <>
                  <span className="block text-yellow-400">ग्रह गोचर</span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-gray-200 mt-2">
                    अनलाइन मार्गदर्शनमा
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-yellow-400">Graha Gochar</span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-gray-200 mt-2">
                    A warm welcome to you all for online guidance on Graha Gochar
                  </span>
                </>
              )}
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'यहाँहरूलाई हार्दिक स्वागत गर्दछौं ।'
                : 'Discover your destiny through the wisdom of the stars.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="#services">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {currentLanguage === 'ne' ? 'आफ्नो भविष्य फल हेर्नुहोस्' : 'Explore Your Future'}
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                asChild
              >
                <a href="tel:+9779801234567">
                  <Phone className="mr-2 h-5 w-5" />
                  {currentLanguage === 'ne' ? 'फोन गर्नुहोस्' : 'Call Now'}
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Zodiac Wheel */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <img
                src="/api/assets/horoscope"
                alt="Zodiac wheel"
                className="w-full h-full object-contain animate-spin [animation-duration:20s] [animation-timing-function:linear] select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
