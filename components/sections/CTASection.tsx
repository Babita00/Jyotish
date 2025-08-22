'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Video } from 'lucide-react';
import type { CTASectionProps } from '@/types/sections';

export default function CTASection({ currentLanguage }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg')] bg-cover bg-center opacity-20"></div> */}
      <div className="container mx-auto px-4 text-center relative">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
          {currentLanguage === 'ne' 
            ? 'आजै आफ्नो भविष्यको बारेमा जान्नुहोस्'
            : 'Discover Your Future Today'
          }
        </h2>
        <p className={`text-xl mb-10 text-indigo-200 max-w-3xl mx-auto leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
          {currentLanguage === 'ne'
            ? 'व्यावसायिक ज्योतिष परामर्शका लागि अहिले नै बुकिङ गर्नुहोस्'
            : 'Book your professional astrology consultation now'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/booking">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <Calendar className="mr-3 h-6 w-6" />
              {currentLanguage === 'ne' ? 'बुकिङ गर्नुहोस्' : 'Book Now'}
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-10 py-4 text-xl font-bold backdrop-blur-sm bg-white/10 transition-all duration-300"
            asChild
          >
            <a href="https://wa.me/9779801234567" target="_blank" rel="noopener noreferrer">
              <Video className="mr-3 h-6 w-6" />
              {currentLanguage === 'ne' ? 'व्हाट्सएप गर्नुहोस्' : 'WhatsApp'}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
