'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { Star, Phone, Globe } from 'lucide-react';

export default function Header() {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500 rounded-full">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'ज्योतिष केन्द्र' : 'Jyotish Center'}
              </h1>
              <p className="text-sm text-indigo-200">Professional Astrology</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/booking" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.booking')}
            </Link>
            <Link href="/blog" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.blog')}
            </Link>
            <Link href="/contact" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.contact')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Button
                variant={currentLanguage === 'ne' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('ne')}
                className={currentLanguage === 'ne' ? 'bg-yellow-500 text-black' : 'text-white hover:bg-indigo-700'}
              >
                नेपाली
              </Button>
              <Button
                variant={currentLanguage === 'en' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={currentLanguage === 'en' ? 'bg-yellow-500 text-black' : 'text-white hover:bg-indigo-700'}
              >
                EN
              </Button>
            </div>
            <a 
              href="tel:+9779801234567" 
              className="flex items-center space-x-1 bg-yellow-500 text-black px-3 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}