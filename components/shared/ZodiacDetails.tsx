'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/LanguageProvider';
import { ZodiacInfo } from '@/types/astrology';
import { ROUTES } from '@/constants/routes';
import { 
  Crown, 
  Sparkles, 
  Heart, 
  Globe, 
  Shield, 
  Calendar,
  Palette,
  Gem,
  Star
} from 'lucide-react';

interface ZodiacDetailsProps {
  zodiac: ZodiacInfo;
  onBookConsultation?: () => void;
}

export default function ZodiacDetails({ zodiac, onBookConsultation }: ZodiacDetailsProps) {
  const { currentLanguage } = useLanguage();

  const handleBookConsultation = () => {
    if (onBookConsultation) {
      onBookConsultation();
    } else {
      window.location.href = ROUTES.BOOKING;
    }
  };

  return (
    <div className="p-4">
      {/* Main Info Card */}
      <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader className="text-center pb-4">
          <div className="text-6xl mb-2">{zodiac.symbol}</div>
          <CardTitle className={`text-2xl text-indigo-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? zodiac.nameNe : zodiac.nameEn}
          </CardTitle>
          <Badge className="bg-indigo-600 text-white">
            {currentLanguage === 'ne' ? zodiac.elementNe : zodiac.element}
          </Badge>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
            {currentLanguage === 'ne' ? 'आधारभूत' : 'Basic'}
          </TabsTrigger>
          <TabsTrigger value="detailed" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
            {currentLanguage === 'ne' ? 'विस्तृत' : 'Detailed'}
          </TabsTrigger>
          <TabsTrigger value="compatibility" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
            {currentLanguage === 'ne' ? 'मेल' : 'Match'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                {currentLanguage === 'ne' ? 'मुख्य जानकारी' : 'Main Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'गण:' : 'Gana:'}
                </span>
                <Badge variant="secondary">
                  {currentLanguage === 'ne' ? zodiac.ganaNe : zodiac.gana}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'देउता:' : 'Deity:'}
                </span>
                <Badge variant="secondary">
                  {currentLanguage === 'ne' ? zodiac.deityNe : zodiac.deity}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'ग्रह:' : 'Planet:'}
                </span>
                <Badge variant="secondary">
                  {currentLanguage === 'ne' ? zodiac.planetNe : zodiac.planet}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Lucky Elements */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <Sparkles className="h-5 w-5 mr-2 text-green-500" />
                {currentLanguage === 'ne' ? 'भाग्यशाली तत्वहरू' : 'Lucky Elements'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-pink-500" />
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'रंग:' : 'Color:'}
                </span>
                <span className="font-medium">
                  {currentLanguage === 'ne' ? zodiac.luckyColorNe : zodiac.luckyColor}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Gem className="h-4 w-4 text-purple-500" />
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'रत्न:' : 'Gemstone:'}
                </span>
                <span className="font-medium">
                  {currentLanguage === 'ne' ? zodiac.gemstoneNe : zodiac.gemstone}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'संख्या:' : 'Numbers:'}
                </span>
                <span className="font-medium">
                  {zodiac.luckyNumbers.join(', ')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'दिन:' : 'Days:'}
                </span>
                <span className="font-medium">
                  {currentLanguage === 'ne' 
                    ? zodiac.luckyDaysNe.join(', ')
                    : zodiac.luckyDays.join(', ')
                  }
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          {/* Personality Traits */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                {currentLanguage === 'ne' ? 'व्यक्तित्व गुणहरू' : 'Personality Traits'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(currentLanguage === 'ne' ? zodiac.traitsNe : zodiac.traits).map((trait, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <Globe className="h-5 w-5 mr-2 text-indigo-500" />
                {currentLanguage === 'ne' ? 'अन्य विवरणहरू' : 'Other Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'दिशा:' : 'Direction:'}
                </span>
                <span className="font-medium">
                  {currentLanguage === 'ne' ? zodiac.directionNe : zodiac.direction}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'धातु:' : 'Metal:'}
                </span>
                <span className="font-medium">
                  {currentLanguage === 'ne' ? zodiac.metalNe : zodiac.metal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'फूल:' : 'Flower:'}
                </span>
                <span className="font-medium">
                  {currentLanguage === 'ne' ? zodiac.flowerNe : zodiac.flower}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-4">
          {/* Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <Heart className="h-5 w-5 mr-2 text-pink-500" />
                {currentLanguage === 'ne' ? 'मेल खाने राशीहरू' : 'Compatible Signs'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {(currentLanguage === 'ne' ? zodiac.compatibilityNe : zodiac.compatibility).map((sign, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className={`font-medium text-green-800 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {sign}
                    </span>
                    <Badge className="bg-green-600 text-white">
                      {currentLanguage === 'ne' ? 'उत्तम मेल' : 'Great Match'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Relationship Advice */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                {currentLanguage === 'ne' ? 'सम्बन्ध सुझाव' : 'Relationship Tips'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className={`text-blue-800 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' 
                    ? 'यी राशीहरूसँग तपाईंको प्राकृतिक मेल छ। सम्बन्ध निर्माणमा यी राशीका व्यक्तिहरूलाई प्राथमिकता दिनुहोस्।'
                    : 'You have natural compatibility with these signs. Prioritize relationships with people of these zodiac signs.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Consultation CTA */}
      <Card className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className={`text-lg font-bold mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'व्यक्तिगत परामर्श चाहिन्छ?' : 'Need Personal Consultation?'}
          </h3>
          <p className={`text-indigo-100 mb-4 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'आफ्नो राशी अनुसार विस्तृत विश्लेषण र मार्गदर्शन पाउनुहोस्'
              : 'Get detailed analysis and guidance based on your zodiac sign'
            }
          </p>
          <Button 
            className="bg-yellow-500 text-black hover:bg-yellow-400 w-full"
            onClick={handleBookConsultation}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {currentLanguage === 'ne' ? 'परामर्श बुक गर्नुहोस्' : 'Book Consultation'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}