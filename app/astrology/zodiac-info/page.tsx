'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ZodiacSelector from '@/components/shared/ZodiacSelector';
import ZodiacDetails from '@/components/shared/ZodiacDetails';
import { ZODIAC_DATA, ZODIAC_LIST } from '@/constants/zodiac';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ZodiacInfoPage() {
  const { currentLanguage } = useLanguage();
  const [selectedZodiac, setSelectedZodiac] = useState<string>(ZODIAC_LIST[0]);

  const handleBook = () => {
    window.location.href = '/booking';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                {currentLanguage === 'ne' ? 'फिर्ता' : 'Back'}
              </span>
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'राशी विवरण' : 'Zodiac Details'}
          </h1>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne'
              ? 'आफ्नो राशी छान्नुहोस् र विस्तृत जानकारी पाउनुहोस्'
              : 'Select your zodiac sign to view detailed information'}
          </p>
        </div>

        {/* Selector + Details */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle className={`text-2xl text-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'राशी चयन' : 'Select Zodiac'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <ZodiacSelector
                selectedZodiac={selectedZodiac}
                onZodiacSelect={setSelectedZodiac}
              />

              <ZodiacDetails
                zodiac={ZODIAC_DATA[selectedZodiac]}
                onBookConsultation={handleBook}
              />
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className={`text-2xl font-bold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'व्यक्तिगत ज्योतिष परामर्श' : 'Personal Astrology Consultation'}
              </h3>
              <p className={`text-indigo-100 mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne'
                  ? 'आफ्नो राशी अनुसार विस्तृत विश्लेषण र मार्गदर्शन पाउन आजै बुक गर्नुहोस्'
                  : 'Book now to get detailed analysis and guidance based on your zodiac sign'}
              </p>
              <Link href="/booking">
                <Button className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-3 text-lg font-semibold">
                  {currentLanguage === 'ne' ? 'परामर्श बुक गर्नुहोस्' : 'Book Consultation'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}


