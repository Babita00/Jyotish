'use client';

import React from 'react';
import { Award, Users, Star } from 'lucide-react';
import type { AboutSectionProps } from '@/types/sections';
import aboutSectionImage from  '@/app/api/assets/about-section image.webp';
export default function AboutSection({ currentLanguage, t }: AboutSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={aboutSectionImage.src}
              alt="Astrologer" 
              className="w-full aspect-square object-cover rounded-full shadow-2xl select-none pointer-events-none"
              style={{
                animation: 'spin 20s linear infinite'
              }}
            />
          </div>
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {t('about.title')}
            </h2>
            <p className={`text-xl text-indigo-200 mb-8 leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {t('about.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-yellow-500 rounded-full">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">15+</h3>
                <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'वर्ष अनुभव' : 'Years Experience'}
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-pink-500 rounded-full">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-pink-400">5000+</h3>
                <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'खुसी ग्राहक' : 'Happy Clients'}
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-green-500 rounded-full">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-400">98%</h3>
                <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'सटीकता दर' : 'Accuracy Rate'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
