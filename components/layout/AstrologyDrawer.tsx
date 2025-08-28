"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { useDrawerContext } from "@/context/DrawerContext";
import { MENU_ITEMS } from "@/constants/menuData";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Home, Calendar, FileText, Phone, LogIn, UserPlus } from "lucide-react";

export default function AstrologyDrawer() {
const { currentLanguage, setLanguage } = useLanguage();
  const { isOpen, openDrawer, closeDrawer } = useDrawerContext();

  return (
    <>
      {/* Menu Button */}
      {/* Trigger handled by Header; internal floating button disabled */}
      <div className="hidden" />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 drawer-overlay z-[60] transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full drawer-responsive bg-white shadow-2xl z-[70] transform transition-transform duration-300 overflow-y-auto max-w-[90vw] sm:max-w-sm ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header - compact padding to avoid large empty area on wide screens */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 md:p-5">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <h2
              className={`text-2xl font-bold ${
                currentLanguage === "ne" ? "font-nepali" : ""
              }`}
            >
              {currentLanguage === "ne" ? "ज्योतिष मेनु" : "Astrology Menu"}
            </h2>
            <Button
              onClick={closeDrawer}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p
            className={`text-indigo-100 ${
              currentLanguage === "ne" ? "font-nepali" : ""
            }`}
          >
            {currentLanguage === "ne"
              ? "ज्योतिष जानकारी र सेवाहरू"
              : "Astrology information and services"}
          </p>
        </div>

        {/* Quick links visible on all devices */}
        <div className="p-4">
          {/* Quick links visible only on small screens */}
          <div className="space-y-3 mb-6 block sm:hidden">
            <Link
              href="/"
              onClick={closeDrawer}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-900">Home</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/booking"
              onClick={closeDrawer}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-900">Booking</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/blog"
              onClick={closeDrawer}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-900">Blog</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/contact"
              onClick={closeDrawer}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-900">Contact</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/login"
              onClick={closeDrawer}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <LogIn className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-900">Login</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/register"
              onClick={closeDrawer}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <UserPlus className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-900">Sign Up</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <a
              href="tel:+9779801234567"
              onClick={closeDrawer}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg font-semibold text-black hover:from-yellow-600 hover:to-yellow-500 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </a>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.route}
                onClick={closeDrawer}
                className="block"
              >
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3
                        className={`font-semibold text-gray-900 ${
                          currentLanguage === "ne" ? "font-nepali" : ""
                        }`}
                      >
                        {currentLanguage === "ne" ? item.titleNe : item.titleEn}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Language toggles + Footer */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="text-center mb-4">
            {/* Language toggle - mobile only */}
            <div className="flex items-center justify-center gap-2 mb-3 sm:hidden">
              <Button
                variant={currentLanguage === "ne" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLanguage("ne")}
                className={
                  currentLanguage === "ne"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }
              >
                नेपाली
              </Button>

              <Button
                variant={currentLanguage === "en" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className={
                  currentLanguage === "en"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }
              >
                EN
              </Button>
            </div>

            <p
              className={`text-sm text-gray-600 mb-3 ${
                currentLanguage === "ne" ? "font-nepali" : ""
              }`}
            >
              {currentLanguage === "ne"
                ? "व्यक्तिगत परामर्शको लागि"
                : "For personal consultation"}
            </p>
            <Link href="/booking">
              <Button
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
                onClick={closeDrawer}
              >
                {currentLanguage === "ne"
                  ? "परामर्श बुक गर्नुहोस्"
                  : "Book Consultation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
