'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Star, TrendingUp, Heart, Eye } from 'lucide-react';

export default function BlogPage() {
  const { currentLanguage, t } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      titleEn: "Weekly Horoscope: What Stars Say About Your Love Life",
      titleNe: "साप्ताहिक राशिफल: तपाईंको प्रेम जीवनको बारेमा ताराहरूले के भन्छन्",
      excerptEn: "Discover what the cosmic alignments have in store for your romantic relationships this week...",
      excerptNe: "यस हप्ता तपाईंको प्रेम सम्बन्धको लागि ब्रह्माण्डीय ग्रह स्थितिले के राखेको छ पत्ता लगाउनुहोस्...",
      category: "Horoscope",
      categoryNe: "राशिफल",
      date: "2025-01-15",
      readTime: "5 min",
      image: "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg",
      featured: true
    },
    {
      id: 2,
      titleEn: "Auspicious Dates for Marriage in 2025",
      titleNe: "२०८१ सालमा विवाहका लागि शुभ मितिहरू",
      excerptEn: "Planning to tie the knot this year? Here are the most favorable dates according to Vedic astrology...",
      excerptNe: "यस वर्ष विवाह गर्ने योजना छ? वैदिक ज्योतिष अनुसार सबैभन्दा अनुकूल मितिहरू यहाँ छन्...",
      category: "Marriage",
      categoryNe: "विवाह",
      date: "2025-01-12",
      readTime: "8 min",
      image: "https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg"
    },
    {
      id: 3,
      titleEn: "Career Growth Tips Based on Your Zodiac Sign",
      titleNe: "तपाईंको राशि अनुसार करियर वृद्धिका सुझावहरू",
      excerptEn: "Learn how your zodiac sign influences your career path and discover personalized tips for professional success...",
      excerptNe: "तपाईंको राशिले करियर मार्गलाई कसरी प्रभाव पार्छ जान्नुहोस् र व्यावसायिक सफलताका व्यक्तिगत सुझावहरू पत्ता लगाउनुहोस्...",
      category: "Career",
      categoryNe: "करियर",
      date: "2025-01-10",
      readTime: "6 min",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
    },
    {
      id: 4,
      titleEn: "Understanding Graha Dasha and Its Impact on Life",
      titleNe: "ग्रह दशा र जीवनमा यसको प्रभाव बुझ्नुहोस्",
      excerptEn: "Explore the concept of planetary periods in Vedic astrology and how they shape different phases of life...",
      excerptNe: "वैदिक ज्योतिषमा ग्रह दशाको अवधारणा र तिनीहरूले जीवनका विभिन्न चरणहरूलाई कसरी आकार दिन्छन् भन्ने कुरा अन्वेषण गर्नुहोस्...",
      category: "Astrology",
      categoryNe: "ज्योतिष",
      date: "2025-01-08",
      readTime: "10 min",
      image: "https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg"
    },
    {
      id: 5,
      titleEn: "Health Predictions for Each Zodiac Sign in 2025",
      titleNe: "२०८१ मा प्रत्येक राशिका लागि स्वास्थ्य भविष्यवाणी",
      excerptEn: "Get insights into health trends and preventive measures for each zodiac sign throughout the year...",
      excerptNe: "वर्षभरि प्रत्येक राशिको स्वास्थ्य प्रवृत्ति र रोकथाम उपायहरूको अन्तर्दृष्टि प्राप्त गर्नुहोस्...",
      category: "Health",
      categoryNe: "स्वास्थ्य",
      date: "2025-01-05",
      readTime: "7 min",
      image: "https://images.pexels.com/photos/3759658/pexels-photo-3759658.jpeg"
    },
    {
      id: 6,
      titleEn: "The Power of Gemstones in Vedic Astrology",
      titleNe: "वैदिक ज्योतिषमा रत्नको शक्ति",
      excerptEn: "Discover how precious gemstones can enhance positive planetary influences and bring prosperity...",
      excerptNe: "बहुमूल्य रत्नहरूले कसरी सकारात्मक ग्रह प्रभावलाई बढाउन र समृद्धि ल्याउन सक्छ भन्ने कुरा पत्ता लगाउनुहोस्...",
      category: "Remedies",
      categoryNe: "उपचार",
      date: "2025-01-03",
      readTime: "9 min",
      image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg"
    }
  ];

  const categories = [
    { en: "All", ne: "सबै", count: 6 },
    { en: "Horoscope", ne: "राशिफल", count: 1 },
    { en: "Marriage", ne: "विवाह", count: 1 },
    { en: "Career", ne: "करियर", count: 1 },
    { en: "Health", ne: "स्वास्थ्य", count: 1 },
    { en: "Astrology", ne: "ज्योतिष", count: 1 },
    { en: "Remedies", ne: "उपचार", count: 1 }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'ज्योतिष ब्लग' : 'Astrology Blog'}
          </h1>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'ग्रह-नक्षत्रको रहस्य, दैनिक राशिफल र ज्योतिष ज्ञानका लेखहरू'
              : 'Explore cosmic secrets, daily horoscopes, and astrological wisdom'
            }
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={`${index === 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'hover:bg-indigo-50'} ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
            >
              {currentLanguage === 'ne' ? category.ne : category.en}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden shadow-2xl border-0 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-4">
                  <Badge className="bg-yellow-500 text-black">
                    <Star className="h-3 w-3 mr-1" />
                    {currentLanguage === 'ne' ? 'फिचर्ड' : 'Featured'}
                  </Badge>
                  <Badge variant="secondary" className="ml-2">
                    {currentLanguage === 'ne' ? featuredPost.categoryNe : featuredPost.category}
                  </Badge>
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? featuredPost.titleNe : featuredPost.titleEn}
                </h2>
                <p className={`text-lg text-indigo-100 mb-6 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? featuredPost.excerptNe : featuredPost.excerptEn}
                </p>
                <div className="flex items-center text-sm text-indigo-200 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{featuredPost.date}</span>
                  <Clock className="h-4 w-4 ml-4 mr-2" />
                  <span>{featuredPost.readTime} read</span>
                </div>
                <Button 
                  size="lg" 
                  className={`bg-yellow-500 text-black hover:bg-yellow-400 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                >
                  {currentLanguage === 'ne' ? 'पूरा पढ्नुहोस्' : 'Read Full Article'}
                </Button>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full">
                <img 
                  src={featuredPost.image} 
                  alt={currentLanguage === 'ne' ? featuredPost.titleNe : featuredPost.titleEn}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </Card>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={currentLanguage === 'ne' ? post.titleNe : post.titleEn}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-gray-900">
                    {currentLanguage === 'ne' ? post.categoryNe : post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className={`text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? post.titleNe : post.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className={`text-gray-600 mb-4 line-clamp-3 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? post.excerptNe : post.excerptEn}
                </p>
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`group-hover:bg-indigo-600 group-hover:text-white transition-colors ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                  >
                    {currentLanguage === 'ne' ? 'पढ्नुहोस्' : 'Read More'}
                  </Button>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>124</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>23</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className={`text-2xl font-bold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'दैनिक राशिफल प्राप्त गर्नुहोस्' : 'Get Daily Horoscope Updates'}
            </h3>
            <p className={`text-indigo-100 mb-6 max-w-2xl mx-auto ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'आफ्नो इमेलमा दैनिक राशिफल र ज्योतिष सुझावहरू प्राप्त गर्न सब्स्क्राइब गर्नुहोस्'
                : 'Subscribe to receive daily horoscope and astrological insights directly to your email'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={currentLanguage === 'ne' ? 'आफ्नो इमेल प्रविष्ट गर्नुहोस्' : 'Enter your email'}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Button 
                className={`bg-yellow-500 text-black hover:bg-yellow-400 px-6 py-3 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
              >
                {currentLanguage === 'ne' ? 'सब्स्क्राइब गर्नुहोस्' : 'Subscribe'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}