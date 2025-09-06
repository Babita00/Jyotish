'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from './LanguageProvider';
import { useDrawerContext } from '@/context/DrawerContext';
import { Button } from './ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Star, Phone, User, LogOut, Menu, UserCircle } from 'lucide-react';
import AstrologyDrawer from '@/components/layout/AstrologyDrawer';

export default function Header() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { openDrawer } = useDrawerContext();
  const { user, signOut, loading, profile } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo + Drawer */}
          <div className="flex items-center gap-3">
            {/* Drawer trigger (mobile menu button) */}
            <Button
              onClick={openDrawer}
              size="sm"
              className="bg-indigo-700 hover:bg-indigo-600 px-2 sm:px-3 py-2"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-500 rounded-full">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="leading-tight">
                <h1
                  className={`text-lg sm:text-xl font-bold ${
                    currentLanguage === 'ne' ? 'font-nepali' : ''
                  }`}
                >
                  {currentLanguage === 'ne' ? 'ग्रह मन्त्र' : 'Graha Mantra'}
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-indigo-200">
                  Professional Astrology
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/booking" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.booking')}
            </Link>
            <Link href="/our-service" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.service')}
            </Link>
            <Link href="/contact" className="hover:text-yellow-300 transition-colors font-medium">
              {t('nav.contact')}
            </Link>
            {profile?.role === "admin" && (
              <Link href="/admin" className="hover:text-yellow-300 transition-colors font-medium">
                {currentLanguage === "ne" ? "एडमिन प्यानल" : "Admin Panel"}
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant={currentLanguage === 'ne' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('ne')}
                className={
                  currentLanguage === 'ne'
                    ? 'bg-yellow-500 text-black'
                    : 'text-white hover:bg-indigo-700'
                }
              >
                नेपाली
              </Button>
              <Button
                variant={currentLanguage === 'en' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={
                  currentLanguage === 'en'
                    ? 'bg-yellow-500 text-black'
                    : 'text-white hover:bg-indigo-700'
                }
              >
                EN
              </Button>
            </div>

            {/* Call Button */}
            <a
              href="tel:+9779801234567"
              className="sm:hidden inline-flex items-center justify-center bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-400 transition-colors"
              aria-label="Call Now"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="tel:+9779801234567"
              className="hidden sm:flex items-center space-x-1 bg-yellow-500 text-black px-3 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>

            {/* Authentication Section */}
            {!loading && (
              <div className="flex items-center">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 p-0 border border-gray-300"
                        aria-label={t('profile.profile')}
                      >
                        <User className="h-4 w-4 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => (window.location.href = '/profile')}
                      >
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>{t('profile.view_profile')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('profile.logout')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-700">
                        {currentLanguage === 'ne' ? 'लगइन' : 'Login'}
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-yellow-500 text-black hover:bg-yellow-400"
                      >
                        {currentLanguage === 'ne' ? 'साइन अप' : 'Sign Up'}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer lives here for mobile nav */}
      <AstrologyDrawer />
    </header>
  );
}
