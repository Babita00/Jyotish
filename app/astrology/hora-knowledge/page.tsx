'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HORA_KNOWLEDGE_DATA } from '@/constants/menuData';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export default function HoraKnowledgePage() {
  const { currentLanguage } = useLanguage();

  const tableHeaders = [
    { key: 'letters', label: 'नामको प्रथम अक्षर' },
    { key: 'nakshatra', label: 'नक्षत्र' },
    { key: 'rashi', label: 'राशि' },
    { key: 'swami', label: 'स्वामी' },
    { key: 'kshan', label: 'क्षण' },
    { key: 'paksha', label: 'पक्ष' },
    { key: 'year', label: 'वर्ष' },
    { key: 'rashi2', label: 'राशि2' },
    { key: 'animal', label: 'पशु' },
    { key: 'gan', label: 'गण' },
    { key: 'nadi', label: 'नाड़ी' },
    { key: 'adra', label: 'आद्र' }
  ];

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
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Clock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'होड़ा ज्ञान तालिका' : 'Hora Knowledge Table'}
          </h1>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'नामको पहिलो अक्षर अनुसार सम्पूर्ण ज्योतिष विवरण'
              : 'Complete astrological details based on the first letter of your name'
            }
          </p>
        </div>

        {/* Table Card */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className={`text-2xl text-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'होड़ा ज्ञान विस्तृत तालिका' : 'Detailed Hora Knowledge Table'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header.key} className={`px-3 py-4 text-center text-sm font-semibold text-gray-900 border-b whitespace-nowrap font-nepali`}>
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HORA_KNOWLEDGE_DATA.map((row, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition-colors`}>
                      {tableHeaders.map((header) => (
                        <td key={header.key} className={`px-3 py-4 text-sm text-gray-700 border-b text-center whitespace-nowrap font-nepali`}>
                          {row[header.key as keyof typeof row]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className={`text-xl font-bold mb-4 text-blue-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'तालिकाको महत्व' : 'Importance of the Table'}
              </h3>
              <div className={`space-y-2 text-blue-800 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p>• नक्षत्र र राशि निर्धारण</p>
                <p>• व्यक्तित्व विश्लेषण</p>
                <p>• भविष्य भविष्यवाणी</p>
                <p>• विवाह मिलान</p>
                <p>• करियर मार्गदर्शन</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <h3 className={`text-xl font-bold mb-4 text-green-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'कसरी प्रयोग गर्ने?' : 'How to Use?'}
              </h3>
              <div className={`space-y-2 text-green-800 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p>१. नामको पहिलो अक्षर पत्ता लगाउनुहोस्</p>
                <p>२. तालिकामा त्यो अक्षर खोज्नुहोस्</p>
                <p>३. सम्बन्धित जानकारी पढ्नुहोस्</p>
                <p>४. विस्तृत विश्लेषणको लागि परामर्श लिनुहोस्</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Terms Explanation */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <h3 className={`text-xl font-bold mb-4 text-yellow-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'शब्दावलीको अर्थ' : 'Terminology Meanings'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={`text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p className="font-semibold text-yellow-900">गण:</p>
                <p className="text-yellow-800">देवता, मनुष्य, राक्षस</p>
              </div>
              <div className={`text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p className="font-semibold text-yellow-900">नाड़ी:</p>
                <p className="text-yellow-800">आदि, मध्य, अन्त्य</p>
              </div>
              <div className={`text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p className="font-semibold text-yellow-900">क्षण:</p>
                <p className="text-yellow-800">ब्राह्मण, क्षत्रिय, वैश्य, शुद्र</p>
              </div>
              <div className={`text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p className="font-semibold text-yellow-900">पक्ष:</p>
                <p className="text-yellow-800">शुक्ल, कृष्ण</p>
              </div>
              <div className={`text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p className="font-semibold text-yellow-900">वर्ष:</p>
                <p className="text-yellow-800">विक्रम, शक</p>
              </div>
              <div className={`text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <p className="font-semibold text-yellow-900">स्वामी:</p>
                <p className="text-yellow-800">ग्रह स्वामी</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className={`text-2xl font-bold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'व्यक्तिगत होड़ा विश्लेषण चाहिन्छ?' : 'Need Personal Hora Analysis?'}
              </h3>
              <p className={`text-indigo-100 mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' 
                  ? 'विस्तृत होड़ा विश्लेषण र व्यक्तिगत सुझावको लागि परामर्श लिनुहोस्'
                  : 'Get consultation for detailed hora analysis and personal suggestions'
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