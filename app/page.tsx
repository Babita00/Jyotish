'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cosmic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl">
                  <Star className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <span className="block text-yellow-400">ग्रह गोचर</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-gray-200 mt-2">
                  अनलाइन मार्गदर्शनमा
                </span>
              </h1>
              
              <p className={`text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                यहाँहरूलाई हार्दिक स्वागत गर्दछौं ।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="#services">
                    <Sparkles className="mr-2 h-5 w-5" />
                    आफ्नो भविष्य फल हेर्नुहोस्
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                  asChild
                >
                  <a href="tel:+9779801234567">
                    <Phone className="mr-2 h-5 w-5" />
                    {currentLanguage === 'ne' ? 'फोन गर्नुहोस्' : 'Call Now'}
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Content - Zodiac Wheel */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 animate-spin-slow">
                  <div className="absolute inset-4 rounded-full border-2 border-pink-400/20">
                    <div className="absolute inset-4 rounded-full border border-blue-400/10 bg-gradient-to-br from-yellow-400/10 to-pink-400/10 backdrop-blur-sm">
                      {/* Center */}
                      <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
                        <Star className="h-8 w-8 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Zodiac Signs */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) - 90;
                  const radian = (angle * Math.PI) / 180;
                  const x = Math.cos(radian) * 140;
                  const y = Math.sin(radian) * 140;
                  
                  return (
                    <div
                      key={i}
                      className="absolute w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg"
                      style={{
                        left: `calc(50% + ${x}px - 16px)`,
                        top: `calc(50% + ${y}px - 16px)`,
                      }}
                    >
                      <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              हाम्रा सेवाहरू
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              तपाईंको जीवनका सबै क्षेत्रमा विशेषीकृत ज्योतिष सेवाहरू
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

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/6962023/pexels-photo-6962023.jpeg" 
                alt="Astrologer" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {t('about.title')}
              </h2>
              <p className={`text-xl text-indigo-200 mb-8 leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {t('about.description')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-yellow-500 rounded-full">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400">15+</h3>
                  <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'वर्ष अनुभव' : 'Years Experience'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-pink-500 rounded-full">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-pink-400">5000+</h3>
                  <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'खुसी ग्राहक' : 'Happy Clients'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-green-500 rounded-full">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400">98%</h3>
                  <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'सटीकता दर' : 'Accuracy Rate'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'आजै आफ्नो भविष्यको बारेमा जान्नुहोस्'
              : 'Discover Your Future Today'
            }
          </h2>
          <p className={`text-xl mb-10 text-indigo-200 max-w-3xl mx-auto leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne'
              ? 'व्यावसायिक ज्योतिष परामर्शका लागि अहिले नै बुकिङ गर्नुहोस्'
              : 'Book your professional astrology consultation now'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <Calendar className="mr-3 h-6 w-6" />
                {currentLanguage === 'ne' ? 'बुकिङ गर्नुहोस्' : 'Book Now'}
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-10 py-4 text-xl font-bold backdrop-blur-sm bg-white/10 transition-all duration-300"
              asChild
            >
              <a href="https://wa.me/9779801234567" target="_blank" rel="noopener noreferrer">
                <Video className="mr-3 h-6 w-6" />
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