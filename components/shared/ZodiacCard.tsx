'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ZodiacInfo } from '@/types/astrology';
import { useLanguage } from '@/components/LanguageProvider';

interface ZodiacCardProps {
  zodiac: ZodiacInfo;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ZodiacCard({ zodiac, isSelected = false, onClick }: ZodiacCardProps) {
  const { currentLanguage } = useLanguage();

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-indigo-500 bg-indigo-50' 
          : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="text-center">
          <div className="text-3xl mb-2">{zodiac.symbol}</div>
          <h3 className={`font-semibold text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? zodiac.nameNe : zodiac.nameEn}
          </h3>
          <Badge variant="secondary" className="mt-1 text-xs">
            {currentLanguage === 'ne' ? zodiac.elementNe : zodiac.element}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}