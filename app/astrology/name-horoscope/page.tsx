'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NAME_HOROSCOPE_DATA } from '@/constants/menuData';
import { ArrowLeft, Sun } from 'lucide-react';
import Link from 'next/link';

export default function NameHoroscopePage() {
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
            <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
              <Sun className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${
              currentLanguage === 'ne' ? 'font-nepali' : ''
            }`}
          >
            {currentLanguage === 'ne'
              ? 'नामको पहिलो अक्षरबाट राशी तालिका'
              : 'Name First Letter Horoscope Table'}
          </h1>
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto ${
              currentLanguage === 'ne' ? 'font-nepali' : ''
            }`}
          >
            {currentLanguage === 'ne'
              ? 'नामको पहिलो अक्षर अनुसार आफ्नो राशी पत्ता लगाउनुहोस्'
              : 'Find your horoscope based on the first letter of your name'}
          </p>
        </div>

        {/* Table Card */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardTitle
              className={`text-2xl text-center ${
                currentLanguage === 'ne' ? 'font-nepali' : ''
              }`}
            >
              {currentLanguage === 'ne' ? 'अक्षर र राशी तालिका' : 'Letter and Horoscope Table'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className={`px-6 py-4 text-left text-lg font-semibold text-gray-900 border-b ${
                        currentLanguage === 'ne' ? 'font-nepali' : ''
                      }`}
                    >
                      {currentLanguage === 'ne' ? 'अक्षर' : 'Letters'}
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-lg font-semibold text-gray-900 border-b ${
                        currentLanguage === 'ne' ? 'font-nepali' : ''
                      }`}
                    >
                      {currentLanguage === 'ne' ? 'राशी' : 'Horoscope'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NAME_HOROSCOPE_DATA.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-indigo-50 transition-colors`}
                    >
                      <td className="px-6 py-4 text-lg font-medium text-gray-900 border-b font-nepali">
                        {item.letters}
                      </td>
                      <td className="px-6 py-4 text-lg text-gray-700 border-b font-nepali">
                        {item.horoscope}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <h3
              className={`text-xl font-bold mb-4 text-blue-900 ${
                currentLanguage === 'ne' ? 'font-nepali' : ''
              }`}
            >
              {currentLanguage === 'ne' ? 'कसरी प्रयोग गर्ने?' : 'How to Use?'}
            </h3>
            <div
              className={`space-y-3 text-blue-800 ${
                currentLanguage === 'ne' ? 'font-nepali' : ''
              }`}
            >
              <p>
                {currentLanguage === 'ne'
                  ? '१. आफ्नो नामको पहिलो अक्षर पत्ता लगाउनुहोस्'
                  : '1. Find the first letter of your name'}
              </p>
              <p>
                {currentLanguage === 'ne'
                  ? '२. तालिकामा त्यो अक्षर खोज्नुहोस्'
                  : '2. Look for that letter in the table'}
              </p>
              <p>
                {currentLanguage === 'ne'
                  ? '३. आफ्नो राशी पत्ता लगाउनुहोस्'
                  : '3. Identify your horoscope'}
              </p>
              <p>
                {currentLanguage === 'ne'
                  ? '४. यो जानकारी ज्योतिष र व्यक्तिगत विश्लेषणमा उपयोगी हुन्छ'
                  : '4. This information is useful in astrology and personal analysis'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <h3
                className={`text-2xl font-bold mb-4 ${
                  currentLanguage === 'ne' ? 'font-nepali' : ''
                }`}
              >
                {currentLanguage === 'ne'
                  ? 'थप विस्तृत जानकारीको लागि'
                  : 'For More Detailed Horoscope Analysis'}
              </h3>
              <p
                className={`text-indigo-100 mb-6 ${
                  currentLanguage === 'ne' ? 'font-nepali' : ''
                }`}
              >
                {currentLanguage === 'ne'
                  ? 'व्यक्तिगत राशिफल र सुझावको लागि परामर्श लिनुहोस्'
                  : 'Get consultation for personalized horoscope and suggestions'}
              </p>
              <Link href="/booking">
                <Button className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-3 text-lg font-semibold">
                  {currentLanguage === 'ne'
                    ? 'परामर्श बुक गर्नुहोस्'
                    : 'Book Consultation'}
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
