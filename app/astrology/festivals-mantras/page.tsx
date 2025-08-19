'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FESTIVALS_DATA } from '@/constants/menuData';
import { ArrowLeft, Calendar, Sparkles, BookOpen, Heart } from 'lucide-react';
import Link from 'next/link';

export default function FestivalsMantrasPage() {
  const { currentLanguage } = useLanguage();

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
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'वार्षिक चाडपर्व एवं मन्त्रहरुको विवरण' : 'Annual Festivals & Mantras Details'}
          </h1>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'नेपाली चाडपर्वहरूको विस्तृत जानकारी र सम्बन्धित मन्त्रहरू'
              : 'Detailed information about Nepali festivals and related mantras'
            }
          </p>
        </div>

        {/* Festivals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FESTIVALS_DATA.map((festival) => (
            <Card key={festival.id} className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-2xl ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? festival.nameNe : festival.nameEn}
                  </CardTitle>
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className={`text-orange-100 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {festival.date}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <h4 className={`font-semibold text-gray-900 mb-2 flex items-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                    {currentLanguage === 'ne' ? 'विवरण' : 'Description'}
                  </h4>
                  <p className={`text-gray-700 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {festival.description}
                  </p>
                </div>

                {/* Significance */}
                <div className="mb-6">
                  <h4 className={`font-semibold text-gray-900 mb-2 flex items-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    <Heart className="h-4 w-4 mr-2 text-pink-500" />
                    {currentLanguage === 'ne' ? 'महत्व' : 'Significance'}
                  </h4>
                  <Badge variant="secondary" className={`${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {festival.significance}
                  </Badge>
                </div>

                {/* Mantras */}
                <div className="mb-6">
                  <h4 className={`font-semibold text-gray-900 mb-3 flex items-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                    {currentLanguage === 'ne' ? 'मन्त्रहरू' : 'Mantras'}
                  </h4>
                  <div className="space-y-2">
                    {festival.mantras.map((mantra, index) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                        <p className="text-sm font-medium text-yellow-900 font-nepali text-center">
                          {mantra}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rituals */}
                <div>
                  <h4 className={`font-semibold text-gray-900 mb-3 flex items-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    <Calendar className="h-4 w-4 mr-2 text-green-500" />
                    {currentLanguage === 'ne' ? 'मुख्य कार्यहरू' : 'Main Rituals'}
                  </h4>
                  <div className="space-y-1">
                    {festival.rituals.map((ritual, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <p className={`text-sm text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {ritual}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className={`text-xl font-bold mb-4 text-blue-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'चाडपर्वको महत्व' : 'Importance of Festivals'}
              </h3>
              <div className={`space-y-3 text-blue-800 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p>• आध्यात्मिक शुद्धता र मानसिक शान्ति</p>
                <p>• पारिवारिक एकता र सामाजिक सद्भावना</p>
                <p>• सांस्कृतिक परम्परा र मूल्यहरूको संरक्षण</p>
                <p>• देवी-देवताको कृपा र आशीर्वाद प्राप्ति</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <h3 className={`text-xl font-bold mb-4 text-green-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'मन्त्र जापको फाइदा' : 'Benefits of Mantra Chanting'}
              </h3>
              <div className={`space-y-3 text-green-800 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p>• मानसिक एकाग्रता र ध्यान शक्ति वृद्धि</p>
                <p>• नकारात्मक ऊर्जाको नाश</p>
                <p>• आत्मिक उन्नति र चेतना विकास</p>
                <p>• स्वास्थ्य सुधार र तनाव कमी</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note Section */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <h3 className={`text-xl font-bold mb-4 text-yellow-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'विशेष सूचना' : 'Special Notice'}
            </h3>
            <p className={`text-yellow-800 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'यो खण्डमा थप चाडपर्व र मन्त्रहरूको विवरण चाँडै थपिनेछ। नियमित रूपमा हेरिरहनुहोस्।'
                : 'More festivals and mantras details will be added to this section soon. Please check regularly.'
              }
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className={`text-2xl font-bold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'व्यक्तिगत पूजा विधि जान्न चाहनुहुन्छ?' : 'Want to Know Personal Worship Methods?'}
              </h3>
              <p className={`text-indigo-100 mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' 
                  ? 'तपाईंको राशि अनुसार विशेष पूजा विधि र मन्त्रहरूको जानकारी पाउनुहोस्'
                  : 'Get information about special worship methods and mantras according to your zodiac sign'
                }
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