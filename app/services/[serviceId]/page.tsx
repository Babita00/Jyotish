'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Heart, 
  Briefcase, 
  Activity, 
  Clock, 
  CheckCircle, 
  Calendar,
  Phone,
  Video,
  MapPin,
  Award,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const serviceId = params.serviceId as string;

  const services = {
    kundali: {
      id: 'kundali',
      icon: <Star className="h-16 w-16 text-yellow-400" />,
      titleEn: 'Birth Chart Reading',
      titleNe: 'कुण्डली पढाइ',
      shortDescEn: 'Complete horoscope analysis and life predictions',
      shortDescNe: 'पूर्ण राशिफल विश्लेषण र जीवन भविष्यवाणी',
      detailedDescEn: 'Get a comprehensive analysis of your birth chart with detailed predictions about your personality, career, relationships, health, and future prospects. Our expert astrologers use traditional Vedic astrology methods to provide accurate insights.',
      detailedDescNe: 'तपाईंको व्यक्तित्व, करियर, सम्बन्ध, स्वास्थ्य र भविष्यका सम्भावनाहरूको बारेमा विस्तृत भविष्यवाणीसहित आफ्नो जन्म कुण्डलीको व्यापक विश्लेषण प्राप्त गर्नुहोस्। हाम्रा विशेषज्ञ ज्योतिषीहरूले सटीक अन्तर्दृष्टि प्रदान गर्न पारम्परिक वैदिक ज्योतिष विधिहरू प्रयोग गर्छन्।',
      price: 2000,
      duration: '45-60 minutes',
      gradient: 'from-yellow-400 to-orange-500',
      features: [
        { en: 'Complete birth chart analysis', ne: 'पूर्ण जन्म कुण्डली विश्लेषण' },
        { en: 'Personality traits and characteristics', ne: 'व्यक्तित्व गुणहरू र विशेषताहरू' },
        { en: 'Career and profession guidance', ne: 'करियर र पेशा मार्गदर्शन' },
        { en: 'Relationship compatibility', ne: 'सम्बन्ध मेल' },
        { en: 'Health predictions and remedies', ne: 'स्वास्थ्य भविष्यवाणी र उपचार' },
        { en: 'Lucky numbers, colors, and gemstones', ne: 'भाग्यशाली संख्या, रंग र रत्न' },
        { en: 'Detailed written report', ne: 'विस्तृत लिखित रिपोर्ट' }
      ]
    },
    marriage: {
      id: 'marriage',
      icon: <Heart className="h-16 w-16 text-pink-400" />,
      titleEn: 'Marriage Matching',
      titleNe: 'विवाह मिलान',
      shortDescEn: 'Traditional gun milan and compatibility analysis',
      shortDescNe: 'पारम्परिक गुण मिलान र मेल खोज विश्लेषण',
      detailedDescEn: 'Ensure a harmonious and prosperous married life with our traditional gun milan service. We analyze the compatibility between partners using ancient Vedic methods to predict marital happiness and suggest remedies if needed.',
      detailedDescNe: 'हाम्रो पारम्परिक गुण मिलान सेवाको साथ एक सामंजस्यपूर्ण र समृद्ध वैवाहिक जीवन सुनिश्चित गर्नुहोस्। हामी वैवाहिक खुशीको भविष्यवाणी गर्न र आवश्यक भएमा उपचारहरू सुझाउन पुरातन वैदिक विधिहरू प्रयोग गरेर साझेदारहरू बीचको मेलको विश्लेषण गर्छौं।',
      price: 1500,
      duration: '30-45 minutes',
      gradient: 'from-pink-400 to-red-500',
      features: [
        { en: '36-point gun milan analysis', ne: '३६ बिन्दु गुण मिलान विश्लेषण' },
        { en: 'Mangal dosha check', ne: 'मंगल दोष जाँच' },
        { en: 'Compatibility percentage', ne: 'मेल प्रतिशत' },
        { en: 'Marital happiness prediction', ne: 'वैवाहिक खुशी भविष्यवाणी' },
        { en: 'Remedial measures for doshas', ne: 'दोषहरूको लागि उपचारात्मक उपायहरू' },
        { en: 'Auspicious wedding dates', ne: 'शुभ विवाह मितिहरू' },
        { en: 'Detailed compatibility report', ne: 'विस्तृत मेल रिपोर्ट' }
      ]
    },
    career: {
      id: 'career',
      icon: <Briefcase className="h-16 w-16 text-blue-400" />,
      titleEn: 'Career Guidance',
      titleNe: 'करियर मार्गदर्शन',
      shortDescEn: 'Professional path and business timing advice',
      shortDescNe: 'व्यावसायिक मार्ग र व्यापार समय सल्लाह',
      detailedDescEn: 'Discover your ideal career path and business opportunities with our comprehensive career guidance service. We analyze your birth chart to identify your natural talents, suitable professions, and the best timing for career changes or business ventures.',
      detailedDescNe: 'हाम्रो व्यापक करियर मार्गदर्शन सेवाको साथ आफ्नो आदर्श करियर मार्ग र व्यापारिक अवसरहरू पत्ता लगाउनुहोस्। हामी तपाईंको प्राकृतिक प्रतिभा, उपयुक्त पेशाहरू, र करियर परिवर्तन वा व्यापारिक उद्यमहरूको लागि उत्तम समय पहिचान गर्न तपाईंको जन्म कुण्डलीको विश्लेषण गर्छौं।',
      price: 1800,
      duration: '40-50 minutes',
      gradient: 'from-blue-400 to-indigo-500',
      features: [
        { en: 'Career aptitude analysis', ne: 'करियर योग्यता विश्लेषण' },
        { en: 'Suitable profession identification', ne: 'उपयुक्त पेशा पहिचान' },
        { en: 'Business timing guidance', ne: 'व्यापार समय मार्गदर्शन' },
        { en: 'Job change predictions', ne: 'जागिर परिवर्तन भविष्यवाणी' },
        { en: 'Financial growth prospects', ne: 'आर्थिक वृद्धि सम्भावनाहरू' },
        { en: 'Partnership compatibility', ne: 'साझेदारी मेल' },
        { en: 'Success timeline forecast', ne: 'सफलता समयरेखा पूर्वानुमान' }
      ]
    },
    health: {
      id: 'health',
      icon: <Activity className="h-16 w-16 text-green-400" />,
      titleEn: 'Health Predictions',
      titleNe: 'स्वास्थ्य भविष्यवाणी',
      shortDescEn: 'Health forecasts and remedial measures',
      shortDescNe: 'स्वास्थ्य पूर्वानुमान र उपचारात्मक उपायहरू',
      detailedDescEn: 'Maintain optimal health and prevent potential health issues with our detailed health predictions. We analyze planetary influences on your health and provide personalized remedies, dietary suggestions, and lifestyle recommendations.',
      detailedDescNe: 'हाम्रो विस्तृत स्वास्थ्य भविष्यवाणीको साथ इष्टतम स्वास्थ्य कायम राख्नुहोस् र सम्भावित स्वास्थ्य समस्याहरू रोक्नुहोस्। हामी तपाईंको स्वास्थ्यमा ग्रहीय प्रभावहरूको विश्लेषण गर्छौं र व्यक्तिगत उपचार, आहार सुझावहरू, र जीवनशैली सिफारिसहरू प्रदान गर्छौं।',
      price: 1500,
      duration: '35-45 minutes',
      gradient: 'from-green-400 to-emerald-500',
      features: [
        { en: 'Health vulnerability analysis', ne: 'स्वास्थ्य जोखिम विश्लेषण' },
        { en: 'Disease prediction and prevention', ne: 'रोग भविष्यवाणी र रोकथाम' },
        { en: 'Dietary recommendations', ne: 'आहार सिफारिसहरू' },
        { en: 'Lifestyle modifications', ne: 'जीवनशैली परिमार्जनहरू' },
        { en: 'Healing gemstone suggestions', ne: 'निको पार्ने रत्न सुझावहरू' },
        { en: 'Yoga and meditation guidance', ne: 'योग र ध्यान मार्गदर्शन' },
        { en: 'Recovery timeline predictions', ne: 'रिकभरी समयरेखा भविष्यवाणी' }
      ]
    }
  };

  const service = services[serviceId as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The requested service could not be found.</p>
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`}></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg mr-4`}>
                  {service.icon}
                </div>
                <Badge className={`bg-gradient-to-r ${service.gradient} text-white px-4 py-2 text-lg`}>
                  Rs. {service.price}
                </Badge>
              </div>
              
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? service.titleNe : service.titleEn}
              </h1>
              
              <p className={`text-xl text-gray-600 mb-8 leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? service.detailedDescNe : service.detailedDescEn}
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-2" />
                  <span>{currentLanguage === 'ne' ? 'विशेषज्ञ ज्योतिषी' : 'Expert Astrologer'}</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold px-8 py-4 text-lg`}
                onClick={() => router.push(`/booking?service=${service.id}`)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {currentLanguage === 'ne' ? 'अहिले बुक गर्नुहोस्' : 'Book Now'}
              </Button>
            </div>
            
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-2xl border-0">
                <CardHeader className={`bg-gradient-to-r ${service.gradient} text-white text-center`}>
                  <CardTitle className={`text-2xl ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'सेवा समावेश' : 'Service Includes'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {currentLanguage === 'ne' ? feature.ne : feature.en}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'परामर्श विकल्पहरू' : 'Consultation Options'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-3 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'फोन परामर्श' : 'Phone Consultation'}
                </h3>
                <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' 
                    ? 'घरबाट आरामदायक फोन कलमार्फत परामर्श'
                    : 'Comfortable consultation via phone call from home'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <Video className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-3 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'भिडियो कल' : 'Video Call'}
                </h3>
                <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne'
                    ? 'आमने-सामने भिडियो कलमार्फत व्यक्तिगत परामर्श'
                    : 'Personal consultation via face-to-face video call'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-purple-100 rounded-full">
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-3 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'व्यक्तिगत भेट' : 'In-Person Visit'}
                </h3>
                <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne'
                    ? 'हाम्रो कार्यालयमा आएर प्रत्यक्ष परामर्श'
                    : 'Direct consultation by visiting our office'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Time Slots */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'उपलब्ध समयहरू' : 'Available Time Slots'}
            </h2>
            <p className={`text-lg text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'आफ्नो सुविधाजनक समय छान्नुहोस्'
                : 'Choose your convenient time slot'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {timeSlots.map((time, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <div className="text-center">
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  <span className="font-semibold">{time}</span>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold px-8 py-4 text-lg`}
              onClick={() => router.push(`/booking?service=${service.id}`)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {currentLanguage === 'ne' ? 'बुकिङ प्रक्रिया सुरु गर्नुहोस्' : 'Start Booking Process'}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'हामीलाई किन छान्नुहोस्?' : 'Why Choose Us?'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-yellow-100 rounded-full">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? '१५+ वर्ष अनुभव' : '15+ Years Experience'}
              </h3>
              <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne'
                  ? 'वैदिक ज्योतिषमा व्यापक अनुभव र विशेषज्ञता'
                  : 'Extensive experience and expertise in Vedic astrology'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? '५०००+ खुसी ग्राहक' : '5000+ Happy Clients'}
              </h3>
              <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne'
                  ? 'हजारौं सन्तुष्ट ग्राहकहरूको भरपर्दो सेवा'
                  : 'Trusted service with thousands of satisfied clients'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? '९८% सटीकता दर' : '98% Accuracy Rate'}
              </h3>
              <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne'
                  ? 'उच्च सटीकता र भरपर्दो भविष्यवाणीहरू'
                  : 'High accuracy and reliable predictions'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'आजै आफ्नो परामर्श बुक गर्नुहोस्'
              : 'Book Your Consultation Today'
            }
          </h2>
          <p className={`text-xl mb-8 text-indigo-200 max-w-2xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne'
              ? 'विशेषज्ञ ज्योतिषीसँग व्यक्तिगत परामर्श लिनुहोस्'
              : 'Get personalized consultation with expert astrologer'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold"
              onClick={() => router.push(`/booking?service=${service.id}`)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {currentLanguage === 'ne' ? 'अहिले बुक गर्नुहोस्' : 'Book Now'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <a href="https://wa.me/9779801234567" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                {currentLanguage === 'ne' ? 'व्हाट्सएप गर्नुहोस्' : 'WhatsApp'}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}