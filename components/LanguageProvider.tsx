"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ne";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.booking": "Book Consultation",
    "nav.service": "Our Service",
    "nav.contact": "Contact",
    "nav.admin": "Admin",

    // Homepage
    "hero.title": "Professional Nepali Astrology Consultation",
    "hero.subtitle":
      "Get accurate predictions and guidance for your life with traditional Vedic astrology",
    "hero.cta": "Book Consultation Now",
    "about.title": "About Our Services",
    "about.description":
      "We provide authentic Nepali astrology consultations with over 15 years of experience in Vedic astrology and Kundali reading.",

    // Services
    "services.title": "Our Services",
    "services.kundali": "Kundali Reading",
    "services.marriage": "Marriage Matching",
    "services.career": "Career Guidance",
    "services.health": "Health Predictions",
    "services.business": "Business Consultation",
    "services.naming": "Name Analysis",

    // Testimonials
    "testimonials.title": "What Our Clients Say",

    // Booking
    "booking.title": "Book Your Consultation",
    "booking.name": "Full Name",
    "booking.phone": "Phone Number",
    "booking.email": "Email Address",
    "booking.service": "Select Service",
    "booking.consultation_type": "Consultation Type",
    "booking.online": "Online (Phone/Video Call)",
    "booking.physical": "In-Person Visit",
    "booking.date": "Preferred Date",
    "booking.time": "Preferred Time",
    "booking.submit": "Submit Booking",

    // Contact
    "contact.title": "Contact Us",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.whatsapp": "WhatsApp",

    // Profile
    "profile.profile": "Profile",
    "profile.view_profile": "View Profile",
    "profile.logout": "Logout",
    "profile.account": "Account",
    "profile.personal_info": "Personal Information",
    "profile.account_details": "Account Details",
    "profile.edit_profile": "Edit Profile",
    "profile.save_changes": "Save Changes",
    "profile.saving": "Saving Changes",
    "profile.cancel": "Cancel",
    "profile.account_statistics": "Account Statistics",
    "profile.full_name": "Full Name",
    "profile.email": "Email Address",
    "profile.phone": "Phone Number",
    "profile.role": "Role",
    "profile.member_since": "Member Since",
    "profile.last_updated": "Last Updated",
    "profile.profile_updated": "Profile updated successfully!",
    "profile.update_error": "Failed to update profile. Please try again.",
    "profile.loading": "Loading profile...",

    // Common
    "common.loading": "Loading...",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
  },
  ne: {
    // Navigation
    "nav.home": "होम",
    "nav.services": "सेवाहरू",
    "nav.booking": "परामर्श बुक गर्नुहोस्",
    "nav.service": "हाम्रा सेवा",
    "nav.contact": "सम्पर्क",
    "nav.admin": "एडमिन",

    // Homepage
    "hero.title": "व्यावसायिक नेपाली ज्योतिष परामर्श",
    "hero.subtitle":
      "पारम्परिक वैदिक ज्योतिषको माध्यमबाट आफ्नो जीवनका लागि सटीक भविष्यवाणी र मार्गदर्शन प्राप्त गर्नुहोस्",
    "hero.cta": "अहिले परामर्श बुक गर्नुहोस्",
    "about.title": "हाम्रा सेवाहरूको बारेमा",
    "about.description":
      "हामी वैदिक ज्योतिष र कुण्डली पढाइमा १५ वर्षभन्दा बढी अनुभवका साथ प्रामाणिक नेपाली ज्योतिष परामर्श प्रदान गर्छौं।",

    // Services
    "services.title": "हाम्रा सेवाहरू",
    "services.kundali": "कुण्डली पढाइ",
    "services.marriage": "विवाह मिलान",
    "services.career": "करियर मार्गदर्शन",
    "services.health": "स्वास्थ्य भविष्यवाणी",
    "services.business": "व्यापार परामर्श",
    "services.naming": "नाम विश्लेषण",

    // Testimonials
    "testimonials.title": "हाम्रा ग्राहकहरूको मत",

    // Booking
    "booking.title": "आफ्नो परामर्श बुक गर्नुहोस्",
    "booking.name": "पूरा नाम",
    "booking.phone": "फोन नम्बर",
    "booking.email": "इमेल ठेगाना",
    "booking.service": "सेवा छान्नुहोस्",
    "booking.consultation_type": "परामर्श प्रकार",
    "booking.online": "अनलाइन (फोन/भिडियो कल)",
    "booking.physical": "व्यक्तिगत भेट",
    "booking.date": "मनपर्ने मिति",
    "booking.time": "मनपर्ने समय",
    "booking.submit": "बुकिङ पेश गर्नुहोस्",

    // Contact
    "contact.title": "सम्पर्क गर्नुहोस्",
    "contact.address": "ठेगाना",
    "contact.phone": "फोन",
    "contact.email": "इमेल",
    "contact.whatsapp": "व्हाट्सएप",

    // Profile
    "profile.profile": "प्रोफाइल",
    "profile.view_profile": "प्रोफाइल हेर्नुहोस्",
    "profile.logout": "लगआउट",
    "profile.account": "खाता",
    "profile.personal_info": "व्यक्तिगत जानकारी",
    "profile.account_details": "खाता विवरण",
    "profile.edit_profile": "प्रोफाइल सम्पादन गर्नुहोस्",
    "profile.save_changes": "परिवर्तनहरू सुरक्षित गर्नुहोस्",
    "profile.saving": "परिवर्तनहरू सुरक्षित हुदैँ ",
    "profile.account_statistics": "खाता तथ्याङ्क",
    "profile.cancel": "रद्द गर्नुहोस्",
    "profile.full_name": "पूरा नाम",
    "profile.email": "इमेल ठेगाना",
    "profile.phone": "फोन नम्बर",
    "profile.role": "भूमिका",
    "profile.member_since": "सदस्यता मिति",
    "profile.last_updated": "अन्तिम अपडेट",
    "profile.profile_updated": "प्रोफाइल सफलतापूर्वक अपडेट भयो!",
    "profile.update_error":
      "प्रोफाइल अपडेट गर्न असफल। कृपया फेरि प्रयास गर्नुहोस्।",
    "profile.loading": "प्रोफाइल लोड हुँदै...",

    // Common
    "common.loading": "लोड हुँदै...",
    "common.submit": "पेश गर्नुहोस्",
    "common.cancel": "रद्द गर्नुहोस्",
    "common.save": "सुरक्षित गर्नुहोस्",
    "common.delete": "मेटाउनुहोस्",
    "common.edit": "सम्पादन गर्नुहोस्",
    "common.view": "हेर्नुहोस्",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ne");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "ne"].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[currentLanguage][key as keyof (typeof translations)["en"]] ||
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
