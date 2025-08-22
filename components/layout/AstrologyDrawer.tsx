'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageProvider';
import { useDrawerContext } from '@/context/DrawerContext';
import { MENU_ITEMS } from '@/constants/menuData';
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AstrologyDrawer() {
  const { currentLanguage } = useLanguage();
  const { isOpen, openDrawer, closeDrawer } = useDrawerContext();

  return (
    <>
      {/* Menu Button */}
      {/* Trigger handled by Header; internal floating button disabled */}
      <div className="hidden" />

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 drawer-overlay z-[60] transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full drawer-responsive bg-white shadow-2xl z-[70] transform transition-transform duration-300 overflow-y-auto max-w-[90vw] sm:max-w-sm ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header - compact padding to avoid large empty area on wide screens */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 md:p-5">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <h2 className={`text-2xl font-bold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'ज्योतिष मेनु' : 'Astrology Menu'}
            </h2>
            <Button
              onClick={closeDrawer}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className={`text-indigo-100 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'ज्योतिष जानकारी र सेवाहरू'
              : 'Astrology information and services'
            }
          </p>
        </div>

        {/* Quick links visible on all devices */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link href="/" onClick={closeDrawer} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium">Home</Link>
            <Link href="/booking" onClick={closeDrawer} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium">Booking</Link>
            <Link href="/blog" onClick={closeDrawer} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium">Blog</Link>
            <Link href="/contact" onClick={closeDrawer} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium">Contact</Link>
            <Link href="/login" onClick={closeDrawer} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium">Login</Link>
            <Link href="/register" onClick={closeDrawer} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium">Sign Up</Link>
            <a href="tel:+9779801234567" onClick={closeDrawer} className="col-span-2 text-center p-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400">Call Now</a>
          </div>
          {/* Menu Items */}
          <div className="space-y-3">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.route}
                onClick={closeDrawer}
                className="block"
              >
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className={`font-semibold text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                        {currentLanguage === 'ne' ? item.titleNe : item.titleEn}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Language toggles + Footer */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Button variant="outline" size="sm" onClick={closeDrawer} asChild>
                <Link href="#" className="px-3">नेपाली</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={closeDrawer} asChild>
                <Link href="#" className="px-3">EN</Link>
              </Button>
            </div>
            <p className={`text-sm text-gray-600 mb-3 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'व्यक्तिगत परामर्शको लागि'
                : 'For personal consultation'
              }
            </p>
            <Link href="/booking">
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
                onClick={closeDrawer}
              >
                {currentLanguage === 'ne' ? 'परामर्श बुक गर्नुहोस्' : 'Book Consultation'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}