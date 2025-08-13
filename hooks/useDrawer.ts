'use client';

import { useState } from 'react';
import { DrawerState } from '@/types/astrology';

export function useDrawer() {
  const [drawerState, setDrawerState] = useState<DrawerState>({
    isOpen: false,
    selectedZodiac: 'aries'
  });

  const openDrawer = () => {
    setDrawerState(prev => ({ ...prev, isOpen: true }));
  };

  const closeDrawer = () => {
    setDrawerState(prev => ({ ...prev, isOpen: false }));
  };

  const toggleDrawer = () => {
    setDrawerState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const setSelectedZodiac = (zodiac: string) => {
    setDrawerState(prev => ({ ...prev, selectedZodiac: zodiac }));
  };

  return {
    ...drawerState,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    setSelectedZodiac
  };
}