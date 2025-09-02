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
     id: "all-services",
     icon: <Star className="h-12 w-12 text-yellow-400" />,
     titleEn: "Complete Astrology Services",
     titleNe: "सम्पूर्ण ज्योतिषीय सेवाहरु",
     descEn:
       "We provide a complete range of professional astrology services including birth chart reading, marriage matching, career guidance, health predictions, vastu consultation, religious ceremonies, kundali creation, and gemstone recommendations — tailored to your life path and goals.",
     descNe:
       "हामीले जन्म कुण्डली पढाइ, विवाह मिलान, करियर मार्गदर्शन, स्वास्थ्य भविष्यवाणी, वास्तु परामर्श, धार्मिक कर्मकाण्ड, कुण्डली निर्माण र रत्न परामर्श सहित सम्पूर्ण ज्योतिषीय सेवाहरु तपाईंको जीवनमार्ग र लक्ष्यअनुसार प्रदान गर्दछौँ।",
     price: 5000, 
     gradient: "from-yellow-400 to-purple-600",
   },
 
   {
     id: "marriage",
     icon: <Heart className="h-12 w-12 text-pink-400" />,
     titleEn: "Marriage Matching",
     titleNe: "विवाह मिलान",
     descEn: "Traditional gun milan and compatibility analysis for perfect matches",
     descNe: "उत्तम मेलको लागि पारम्परिक गुण मिलान र मेल खोज विश्लेषण",
     price: 1500,
     gradient: "from-pink-400 to-red-500",
   },
   {
     id: "career",
     icon: <Briefcase className="h-12 w-12 text-blue-400" />,
     titleEn: "Career Guidance",
     titleNe: "करियर मार्गदर्शन",
     descEn: "Professional path guidance and business timing advice for success",
     descNe: "सफलताको लागि व्यावसायिक मार्ग मार्गदर्शन र व्यापार समय सल्लाह",
     price: 1800,
     gradient: "from-blue-400 to-indigo-500",
   },
   {
     id: "health",
     icon: <Activity className="h-12 w-12 text-green-400" />,
     titleEn: "Health Predictions",
     titleNe: "स्वास्थ्य भविष्यवाणी",
     descEn: "Health forecasts and remedial measures for wellness and longevity",
     descNe: "कल्याण र दीर्घायुको लागि स्वास्थ्य पूर्वानुमान र उपचारात्मक उपायहरू",
     price: 1500,
     gradient: "from-green-400 to-emerald-500",
   },
   {
     id: "vastu",
     icon: <Type className="h-12 w-12 text-purple-400" />,
     titleEn: "Vastu Consultation Service",
     titleNe: "वास्तु परामर्श सेवा",
     descEn:
       "We provide consultation according to classical Vastu principles to ensure positive energy, peace and prosperity in homes, offices, business places and other environments.",
     descNe:
       "हामीले घर, कार्यालय, व्यवसायिक स्थल तथा अन्य वातावरणको सकारात्मक ऊर्जा, शान्ति र समृद्धि सुनिश्चित गर्न शास्त्रीय वास्तु सिद्धान्त अनुसार परामर्श प्रदान गर्दछौँ।",
     price: 2500,
     gradient: "from-purple-400 to-violet-500",
   },
   {
     id: "karmakanda",
     icon: <Phone className="h-12 w-12 text-orange-400" />,
     titleEn: "Religious Ceremony Service",
     titleNe: "कर्मकाण्ड सेवा",
     descEn:
       "We provide complete guidance and services for all religious ceremonies according to Vedic tradition including marriage, sacred thread ceremony, planetary worship, Rudra worship, goddess worship, havan, Bhagwat and all religious rituals.",
     descNe:
       "हामीले वैदिक परम्परा अनुसार विवाह, ब्रतबन्ध, ग्रह पूजा, रुद्राभिषेक, देवी पूजा, हवन, भागवत र समस्त धार्मिक कर्मकाण्डको सम्पूर्ण मार्गदर्शन तथा सेवा प्रदान गर्दछौँ।",
     price: 3000,
     gradient: "from-orange-400 to-red-500",
   },
   {
     id: "kundali-creation",
     icon: <Video className="h-12 w-12 text-indigo-400" />,
     titleEn: "Kundali (Chart) Creation Service",
     titleNe: "कुण्डली (चिना) निर्माण सेवा",
     descEn:
       "We create personalized Kundali (charts) according to birth date, time and place and provide clear guidance according to Vedic astrology about various aspects of life—health, education, marriage, wealth, business and future.",
     descNe:
       "हामीले जन्ममिति, समय र स्थानअनुसार व्यक्तिगत कुण्डली (चिना) निर्माण गरी जीवनका विविध पक्ष—स्वास्थ्य, शिक्षा, विवाह, धन, व्यवसाय र भविष्य—बारे वैदिक ज्योतिष अनुसार स्पष्ट मार्गदर्शन प्रदान गर्दछौँ।",
     price: 1800,
     gradient: "from-indigo-400 to-blue-500",
   },
   {
     id: "gemstone",
     icon: <MapPin className="h-12 w-12 text-emerald-400" />,
     titleEn: "Planetary Gemstone Service",
     titleNe: "ग्रह रत्न सेवा",
     descEn:
       "We provide gemstone consultation in a classical way for planetary defect removal and positive influence in life. Suitable gemstone, wearing time, mantra chanting or worship method is suggested according to each person's birth chart.",
     descNe:
       "हामीले ग्रह दोष निवारण र जीवनमा सकारात्मक प्रभावको लागि शास्त्रीय तवरबाट रत्न परामर्श प्रदान गर्छौँ। प्रत्येक व्यक्तिको जन्मकुण्डली अनुसार उपयुक्त रत्न, धारण समय, मन्त्र–जप वा पूजा विधि सुझाव गरिन्छ।",
     price: 2200,
     gradient: "from-emerald-400 to-green-500",
   },
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