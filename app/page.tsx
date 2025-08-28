'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DailyHoroscope from '@/components/user/DailyHoroscope';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Star, 
  Calendar, 
  Heart, 
  Briefcase, 
  Activity, 
  DollarSign, 
  Type,
  Phone,
  Video,
  MapPin,
  Clock,
  Award,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AboutSection, CTASection, HeroSection, ServicesSection, TestimonialsSection } from '@/components/sections';

export default function Home() {
  const { currentLanguage, t } = useLanguage();

  const services = [
    {
      id: 'kundali',
      icon: <Star className="h-12 w-12 text-yellow-400" />,
      titleEn: 'Birth Chart Reading',
      titleNe: 'कुण्डली पढाइ',
      descEn: 'Complete horoscope analysis and life predictions based on your birth chart',
      descNe: 'तपाईंको जन्म कुण्डलीको आधारमा पूर्ण राशिफल विश्लेषण र जीवन भविष्यवाणी',
      price: 2000,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'marriage',
      icon: <Heart className="h-12 w-12 text-pink-400" />,
      titleEn: 'Marriage Matching',
      titleNe: 'विवाह मिलान',
      descEn: 'Traditional gun milan and compatibility analysis for perfect matches',
      descNe: 'उत्तम मेलको लागि पारम्परिक गुण मिलान र मेल खोज विश्लेषण',
      price: 1500,
      gradient: 'from-pink-400 to-red-500'
    },
    {
      id: 'career',
      icon: <Briefcase className="h-12 w-12 text-blue-400" />,
      titleEn: 'Career Guidance',
      titleNe: 'करियर मार्गदर्शन',
      descEn: 'Professional path guidance and business timing advice for success',
      descNe: 'सफलताको लागि व्यावसायिक मार्ग मार्गदर्शन र व्यापार समय सल्लाह',
      price: 1800,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'health',
      icon: <Activity className="h-12 w-12 text-green-400" />,
      titleEn: 'Health Predictions',
      titleNe: 'स्वास्थ्य भविष्यवाणी',
      descEn: 'Health forecasts and remedial measures for wellness and longevity',
      descNe: 'कल्याण र दीर्घायुको लागि स्वास्थ्य पूर्वानुमान र उपचारात्मक उपायहरू',
      price: 1500,
      gradient: 'from-green-400 to-emerald-500'

    }
  ];

  const testimonials = [
    {
      nameEn: 'Priya Sharma',
      nameNe: 'प्रिया शर्मा',
      textEn: 'The marriage matching service was incredibly accurate. We found the perfect compatibility and are happily married now.',
      textNe: 'विवाह मिलान सेवा अविश्वसनीय रूपमा सटीक थियो। हामीले उत्तम मेल फेला पार्यौं र अहिले खुशीसाथ विवाहित छौं।',
      rating: 5
    },
    {
      nameEn: 'Rajesh Thapa',
      nameNe: 'राजेश थापा',
      textEn: 'Career guidance helped me choose the right business timing. My business is flourishing exactly as predicted.',
      textNe: 'करियर मार्गदर्शनले मलाई सही व्यापार समय छान्न मद्दत गर्यो। मेरो व्यापार भविष्यवाणी अनुसार नै फस्टाउँदै छ।',
      rating: 5
    },
    {
      nameEn: 'Sunita Rai',
      nameNe: 'सुनिता राई',
      textEn: 'The Kundali reading was very detailed and helpful. All predictions about my health and family came true.',
      textNe: 'कुण्डली पढाइ धेरै विस्तृत र उपयोगी थियो। मेरो स्वास्थ्य र परिवारको बारेमा सबै भविष्यवाणी सत्य भयो।',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
            <HeroSection currentLanguage={currentLanguage} />
      
      <ServicesSection 
        currentLanguage={currentLanguage} 
        services={services} 
      />
      


      {/* Daily Horoscope Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <DailyHoroscope />
        </div>
      </section>

          <AboutSection 
        currentLanguage={currentLanguage} 
        t={t} 
      />
      <TestimonialsSection 
        currentLanguage={currentLanguage} 
        t={t} 
        testimonials={testimonials} 
      />
      
      <CTASection currentLanguage={currentLanguage} />

      <Footer />
    </div>
  );
}