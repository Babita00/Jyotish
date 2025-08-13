'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import ZodiacCard from './ZodiacCard';
import { ZODIAC_DATA, ZODIAC_LIST } from '@/constants/zodiac';

interface ZodiacSelectorProps {
  selectedZodiac: string;
  onZodiacSelect: (zodiac: string) => void;
}

export default function ZodiacSelector({ selectedZodiac, onZodiacSelect }: ZodiacSelectorProps) {
  const { currentLanguage } = useLanguage();

  return (
    <div className="p-4 border-b">
      <h3 className={`text-lg font-semibold mb-3 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
        {currentLanguage === 'ne' ? 'राशी छान्नुहोस्' : 'Select Zodiac Sign'}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {ZODIAC_LIST.map((zodiacKey) => (
          <ZodiacCard
            key={zodiacKey}
            zodiac={ZODIAC_DATA[zodiacKey]}
            isSelected={selectedZodiac === zodiacKey}
            onClick={() => onZodiacSelect(zodiacKey)}
          />
        ))}
      </div>
    </div>
  );
}