'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ATHAVAKHADA_DATA } from '@/constants/menuData';
import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

export default function AthavakhadaChakraPage() {
  const { currentLanguage } = useLanguage();

  const tableHeaders = [
    { key: 'nakshatra', label: 'नक्षत्र' },
    { key: 'naamakshar', label: 'नामाक्षर' },
    { key: 'rashi', label: 'राशि' },
    { key: 'swami', label: 'राशि स्वामी' },
    { key: 'varna', label: 'वर्ण' },
    { key: 'vashya', label: 'वश्य' },
    { key: 'yoni', label: 'योनि' },
    { key: 'vairYoni', label: 'वैरयोनि' },
    { key: 'gan', label: 'गण' },
    { key: 'nadi', label: 'नाडी' },
    { key: 'aasan', label: 'आसन' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
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
              <Star className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent font-nepali">
            अथावकहडाचक्र
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-nepali">
            नक्षत्र अनुसार नामाक्षर, राशि, गण, नाडी, योनि र अन्य विवरण
          </p>
        </div>

        {/* Table Card */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardTitle className="text-2xl text-center font-nepali">
              अथावकहडाचक्र तालिका
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header.key} className="px-3 py-4 text-center text-sm font-semibold text-gray-900 border-b whitespace-nowrap font-nepali">
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ATHAVAKHADA_DATA.map((row, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-orange-50 transition-colors`}
                    >
                      {tableHeaders.map((header) => (
                        <td key={header.key} className="px-3 py-4 text-sm text-gray-700 border-b text-center whitespace-nowrap font-nepali">
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
      </div>

      <Footer />
    </div>
  );
}
