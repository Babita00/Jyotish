'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/LanguageProvider';
import { Star, Calendar, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface DailyHoroscope {
  id: string;
  date: string;
  zodiac_sign: string;
  content_en: string;
  content_ne: string;
  is_published: boolean;
}

const ZODIAC_SIGNS = [
  { key: 'aries', en: 'Aries', ne: 'मेष', symbol: '♈' },
  { key: 'taurus', en: 'Taurus', ne: 'वृषभ', symbol: '♉' },
  { key: 'gemini', en: 'Gemini', ne: 'मिथुन', symbol: '♊' },
  { key: 'cancer', en: 'Cancer', ne: 'कर्कट', symbol: '♋' },
  { key: 'leo', en: 'Leo', ne: 'सिंह', symbol: '♌' },
  { key: 'virgo', en: 'Virgo', ne: 'कन्या', symbol: '♍' },
  { key: 'libra', en: 'Libra', ne: 'तुला', symbol: '♎' },
  { key: 'scorpio', en: 'Scorpio', ne: 'वृश्चिक', symbol: '♏' },
  { key: 'sagittarius', en: 'Sagittarius', ne: 'धनु', symbol: '♐' },
  { key: 'capricorn', en: 'Capricorn', ne: 'मकर', symbol: '♑' },
  { key: 'aquarius', en: 'Aquarius', ne: 'कुम्भ', symbol: '♒' },
  { key: 'pisces', en: 'Pisces', ne: 'मीन', symbol: '♓' }
];

export default function DailyHoroscope() {
  const { currentLanguage } = useLanguage();
  const [selectedZodiac, setSelectedZodiac] = useState<string>('');
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null);
  const [loading, setLoading] = useState(false);
  const [todayDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const fetchHoroscope = async (zodiacSign: string) => {
    if (!zodiacSign) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/horoscopes?zodiac=${zodiacSign}&date=${todayDate}&published=true`);
      if (response.ok) {
        const data = await response.json();
        setHoroscope(data.horoscopes?.[0] || null);
      }
    } catch (error) {
      console.error('Error fetching horoscope:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedZodiac) {
      fetchHoroscope(selectedZodiac);
    }
  }, [selectedZodiac]);

  const getZodiacInfo = (key: string) => {
    return ZODIAC_SIGNS.find(z => z.key === key);
  };

  const selectedZodiacInfo = selectedZodiac ? getZodiacInfo(selectedZodiac) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
          {currentLanguage === 'ne' ? 'आजको राशिफल' : "Today's Horoscope"}
        </h2>
        <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
          {currentLanguage === 'ne' 
            ? 'आफ्नो राशि छानेर आजको भविष्यफल हेर्नुहोस्'
            : 'Select your zodiac sign to see today\'s prediction'
          }
        </p>
      </div>

      {/* Zodiac Selector */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className={`flex items-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            {currentLanguage === 'ne' ? 'राशि छान्नुहोस्' : 'Select Your Zodiac Sign'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedZodiac} onValueChange={setSelectedZodiac}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder={currentLanguage === 'ne' ? 'राशि छान्नुहोस्' : 'Choose your zodiac sign'} />
            </SelectTrigger>
            <SelectContent>
              {ZODIAC_SIGNS.map((zodiac) => (
                <SelectItem key={zodiac.key} value={zodiac.key}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{zodiac.symbol}</span>
                    <span className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                      {currentLanguage === 'ne' ? zodiac.ne : zodiac.en}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Horoscope Display */}
      {selectedZodiac && (
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{selectedZodiacInfo?.symbol}</span>
                <div>
                  <CardTitle className={`text-2xl ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? selectedZodiacInfo?.ne : selectedZodiacInfo?.en}
                  </CardTitle>
                  <p className="text-indigo-100 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <Sparkles className="h-8 w-8 text-yellow-300" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : horoscope ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
                  <p className={`text-lg leading-relaxed text-gray-800 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? horoscope.content_ne : horoscope.content_en}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{currentLanguage === 'ne' ? 'अपडेट मिति:' : 'Updated:'} {horoscope.date}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fetchHoroscope(selectedZodiac)}
                    className={currentLanguage === 'ne' ? 'font-nepali' : ''}
                  >
                    {currentLanguage === 'ne' ? 'रिफ्रेस गर्नुहोस्' : 'Refresh'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className={`text-lg font-semibold text-gray-700 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'आजको राशिफल उपलब्ध छैन' : 'No horoscope available today'}
                </h3>
                <p className={`text-gray-500 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' 
                    ? 'यो राशिको लागि आजको राशिफल अझै प्रकाशित भएको छैन'
                    : 'Today\'s horoscope for this sign hasn\'t been published yet'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      {selectedZodiac && horoscope && (
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <CardContent className="p-6 text-center">
            <h3 className={`text-xl font-bold mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'व्यक्तिगत परामर्श चाहिन्छ?' : 'Need Personal Consultation?'}
            </h3>
            <p className={`text-indigo-100 mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'विस्तृत राशिफल र व्यक्तिगत मार्गदर्शनको लागि परामर्श बुक गर्नुहोस्'
                : 'Book a consultation for detailed horoscope and personal guidance'
              }
            </p>
            <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
              {currentLanguage === 'ne' ? 'परामर्श बुक गर्नुहोस्' : 'Book Consultation'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}