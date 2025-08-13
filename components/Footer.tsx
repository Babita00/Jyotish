'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Star, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { currentLanguage, t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-yellow-500 rounded-full">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'ज्योतिष परामर्श केन्द्र' : 'Jyotish Consultation Center'}
                </h3>
              </div>
            </div>
            <p className={`text-gray-300 mb-4 max-w-md ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'हामी पारम्परिक वैदिक ज्योतिषको आधारमा व्यावसायिक सल्लाह प्रदान गर्छौं। तपाईंको भविष्यको लागि सटीक मार्गदर्शन पाउनुहोस्।'
                : 'We provide professional consultation based on traditional Vedic astrology. Get accurate guidance for your future.'
              }
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/9779801234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'सेवाहरू' : 'Services'}
            </h4>
            <ul className={`space-y-2 text-gray-300 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              <li>{t('services.kundali')}</li>
              <li>{t('services.marriage')}</li>
              <li>{t('services.career')}</li>
              <li>{t('services.health')}</li>
              <li>{t('services.business')}</li>
              <li>{t('services.naming')}</li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {t('contact.title')}
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                  {currentLanguage === 'ne' ? 'काठमाडौं, नेपाल' : 'Kathmandu, Nepal'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+977 9801234567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@jyotishcenter.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Jyotish Consultation Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}