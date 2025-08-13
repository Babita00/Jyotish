'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageProvider';
import { useDrawerContext } from '@/context/DrawerContext';
import ZodiacSelector from '@/components/shared/ZodiacSelector';
import ZodiacDetails from '@/components/shared/ZodiacDetails';
import { ZODIAC_DATA } from '@/constants/zodiac';
import { ROUTES } from '@/constants/routes';
import { Menu, X } from 'lucide-react';

export default function AstrologyDrawer() {
  const { currentLanguage } = useLanguage();
  const { 
    isOpen, 
    selectedZodiac, 
    openDrawer, 
    closeDrawer, 
    setSelectedZodiac 
  } = useDrawerContext();

  const currentZodiac = ZODIAC_DATA[selectedZodiac];

  const handleBookConsultation = () => {
    closeDrawer();
    window.location.href = ROUTES.BOOKING;
  };

  return (
    <>
      {/* Menu Button */}
      <Button
        onClick={openDrawer}
        className="fixed top-20 left-4 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg rounded-full p-3"
        size="sm"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 drawer-overlay z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full drawer-responsive bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'राशी जानकारी' : 'Zodiac Information'}
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
              ? 'सम्पूर्ण राशी विवरण र ज्योतिष जानकारी'
              : 'Complete zodiac details and astrological information'
            }
          </p>
        </div>

        {/* Zodiac Selection */}
        <ZodiacSelector 
          selectedZodiac={selectedZodiac}
          onZodiacSelect={setSelectedZodiac}
        />

        {/* Zodiac Details */}
        <ZodiacDetails 
          zodiac={currentZodiac}
          onBookConsultation={handleBookConsultation}
        />
      </div>
    </>
  );
}