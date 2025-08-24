'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { TestimonialsSectionProps } from '@/types/sections';

export default function TestimonialsSection({ currentLanguage, t, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {t('testimonials.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className={`text-gray-700 mb-6 italic text-lg leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  "{currentLanguage === 'ne' ? testimonial.textNe : testimonial.textEn}"
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {(currentLanguage === 'ne' ? testimonial.nameNe : testimonial.nameEn).charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold text-gray-900 text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {currentLanguage === 'ne' ? testimonial.nameNe : testimonial.nameEn}
                    </h4>
                    <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {currentLanguage === 'ne' ? 'सन्तुष्ट ग्राहक' : 'Satisfied Client'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
