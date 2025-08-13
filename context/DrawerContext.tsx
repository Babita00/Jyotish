'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useDrawer } from '@/hooks/useDrawer';
import { DrawerState } from '@/types/astrology';

interface DrawerContextType extends DrawerState {
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setSelectedZodiac: (zodiac: string) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const drawerState = useDrawer();

  return (
    <DrawerContext.Provider value={drawerState}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
}