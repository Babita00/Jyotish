'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { ServicesSectionProps } from '@/types/sections';

export default function ServicesSection({ currentLanguage, services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'हाम्रा सेवाहरू' : 'Our Services'}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'तपाईंको जीवनका सबै क्षेत्रमा विशेषीकृत ज्योतिष सेवाहरू'
              : 'Specialized astrology services for all areas of your life'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white border-0 shadow-lg overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <CardContent className="p-8 text-center relative">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                    {service.icon}
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-4 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? service.titleNe : service.titleEn}
                </h3>
                <p className={`text-gray-600 mb-6 leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? service.descNe : service.descEn}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-green-600">Rs. {service.price}</span>
                </div>
                <Button 
                  asChild
                  className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold py-3`}
                >
                  <Link href={`/services/${service.id}`}>
                    {currentLanguage === 'ne' ? 'विस्तार हेर्नुहोस्' : 'View Details'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
