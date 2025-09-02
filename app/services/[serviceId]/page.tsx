"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  Briefcase,
  Activity,
  Clock,
  CheckCircle,
  Calendar,
  Phone,
  Video,
  MapPin,
  Award,
  Users,
  ArrowRight,
  Sparkles,
  Type,
} from "lucide-react";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const serviceId = params.serviceId as string;

  const services = {
    "all-services": {
      id: "all-services",
      icon: <Star className="h-16 w-16 text-yellow-400" />,
      titleEn: "Complete Astrology Services",
      titleNe: "सम्पूर्ण ज्योतिषीय सेवाहरु",
      shortDescEn: "Comprehensive astrology package for all life aspects",
      shortDescNe: "जीवनका सबै पक्षहरूका लागि व्यापक ज्योतिष प्याकेज",
      detailedDescEn:
        "We provide a complete range of professional astrology services including birth chart reading, marriage matching, career guidance, health predictions, vastu consultation, religious ceremonies, kundali creation, and gemstone recommendations — tailored to your life path and goals.",
      detailedDescNe:
        "हामीले जन्म कुण्डली पढाइ, विवाह मिलान, करियर मार्गदर्शन, स्वास्थ्य भविष्यवाणी, वास्तु परामर्श, धार्मिक कर्मकाण्ड, कुण्डली निर्माण र रत्न परामर्श सहित सम्पूर्ण ज्योतिषीय सेवाहरु तपाईंको जीवनमार्ग र लक्ष्यअनुसार प्रदान गर्दछौँ।",
      price: 5000,
      duration: "120-150 minutes",
      gradient: "from-yellow-400 to-purple-600",
      features: [
        {
          en: "Complete birth chart analysis",
          ne: "पूर्ण जन्म कुण्डली विश्लेषण",
        },
        {
          en: "Personality, career, and relationship guidance",
          ne: "व्यक्तित्व, करियर र सम्बन्ध मार्गदर्शन",
        },
        {
          en: "Marriage matching & compatibility check",
          ne: "विवाह मिलान र मेल जाँच",
        },
        {
          en: "Career and business timing advice",
          ne: "करियर र व्यापार समय सल्लाह",
        },
        {
          en: "Health forecasts with remedies",
          ne: "स्वास्थ्य पूर्वानुमान र उपचार",
        },
        {
          en: "Vastu consultation for home/office",
          ne: "घर/कार्यालयको लागि वास्तु परामर्श",
        },
        { en: "Religious ceremony coordination", ne: "धार्मिक संस्कार समन्वय" },
        {
          en: "Personalized kundali creation",
          ne: "व्यक्तिगत कुण्डली निर्माण",
        },
        { en: "Planetary gemstone recommendations", ne: "ग्रह रत्न सिफारिस" },
        {
          en: "Lucky numbers, colors, and mantras",
          ne: "भाग्यशाली संख्या, रंग र मन्त्र",
        },
        {
          en: "Detailed written astrology report",
          ne: "विस्तृत ज्योतिष रिपोर्ट",
        },
      ],
    },

    marriage: {
      id: "marriage",
      icon: <Heart className="h-16 w-16 text-pink-400" />,
      titleEn: "Marriage Matching",
      titleNe: "विवाह मिलान",
      shortDescEn: "Traditional gun milan and compatibility analysis",
      shortDescNe: "पारम्परिक गुण मिलान र मेल खोज विश्लेषण",
      detailedDescEn:
        "Ensure a harmonious and prosperous married life with our traditional gun milan service. We analyze the compatibility between partners using ancient Vedic methods to predict marital happiness and suggest remedies if needed.",
      detailedDescNe:
        "हाम्रो पारम्परिक गुण मिलान सेवाको साथ एक सामंजस्यपूर्ण र समृद्ध वैवाहिक जीवन सुनिश्चित गर्नुहोस्। हामी वैवाहिक खुशीको भविष्यवाणी गर्न र आवश्यक भएमा उपचारहरू सुझाउन पुरातन वैदिक विधिहरू प्रयोग गरेर साझेदारहरू बीचको मेलको विश्लेषण गर्छौं।",
      price: 1500,
      duration: "30-45 minutes",
      gradient: "from-pink-400 to-red-500",
      features: [
        {
          en: "36-point gun milan analysis",
          ne: "३६ बिन्दु गुण मिलान विश्लेषण",
        },
        { en: "Mangal dosha check", ne: "मंगल दोष जाँच" },
        { en: "Compatibility percentage", ne: "मेल प्रतिशत" },
        { en: "Marital happiness prediction", ne: "वैवाहिक खुशी भविष्यवाणी" },
        {
          en: "Remedial measures for doshas",
          ne: "दोषहरूको लागि उपचारात्मक उपायहरू",
        },
        { en: "Auspicious wedding dates", ne: "शुभ विवाह मितिहरू" },
        { en: "Detailed compatibility report", ne: "विस्तृत मेल रिपोर्ट" },
      ],
    },
    career: {
      id: "career",
      icon: <Briefcase className="h-16 w-16 text-blue-400" />,
      titleEn: "Career Guidance",
      titleNe: "करियर मार्गदर्शन",
      shortDescEn: "Professional path and business timing advice",
      shortDescNe: "व्यावसायिक मार्ग र व्यापार समय सल्लाह",
      detailedDescEn:
        "Discover your ideal career path and business opportunities with our comprehensive career guidance service. We analyze your birth chart to identify your natural talents, suitable professions, and the best timing for career changes or business ventures.",
      detailedDescNe:
        "हाम्रो व्यापक करियर मार्गदर्शन सेवाको साथ आफ्नो आदर्श करियर मार्ग र व्यापारिक अवसरहरू पत्ता लगाउनुहोस्। हामी तपाईंको प्राकृतिक प्रतिभा, उपयुक्त पेशाहरू, र करियर परिवर्तन वा व्यापारिक उद्यमहरूको लागि उत्तम समय पहिचान गर्न तपाईंको जन्म कुण्डलीको विश्लेषण गर्छौं।",
      price: 1800,
      duration: "40-50 minutes",
      gradient: "from-blue-400 to-indigo-500",
      features: [
        { en: "Career aptitude analysis", ne: "करियर योग्यता विश्लेषण" },
        { en: "Suitable profession identification", ne: "उपयुक्त पेशा पहिचान" },
        { en: "Business timing guidance", ne: "व्यापार समय मार्गदर्शन" },
        { en: "Job change predictions", ne: "जागिर परिवर्तन भविष्यवाणी" },
        { en: "Financial growth prospects", ne: "आर्थिक वृद्धि सम्भावनाहरू" },
        { en: "Partnership compatibility", ne: "साझेदारी मेल" },
        { en: "Success timeline forecast", ne: "सफलता समयरेखा पूर्वानुमान" },
      ],
    },
    health: {
      id: "health",
      icon: <Activity className="h-16 w-16 text-green-400" />,
      titleEn: "Health Predictions",
      titleNe: "स्वास्थ्य भविष्यवाणी",
      shortDescEn: "Health forecasts and remedial measures",
      shortDescNe: "स्वास्थ्य पूर्वानुमान र उपचारात्मक उपायहरू",
      detailedDescEn:
        "Maintain optimal health and prevent potential health issues with our detailed health predictions. We analyze planetary influences on your health and provide personalized remedies, dietary suggestions, and lifestyle recommendations.",
      detailedDescNe:
        "हाम्रो विस्तृत स्वास्थ्य भविष्यवाणीको साथ इष्टतम स्वास्थ्य कायम राख्नुहोस् र सम्भावित स्वास्थ्य समस्याहरू रोक्नुहोस्। हामी तपाईंको स्वास्थ्यमा ग्रहीय प्रभावहरूको विश्लेषण गर्छौं र व्यक्तिगत उपचार, आहार सुझावहरू, र जीवनशैली सिफारिसहरू प्रदान गर्छौं।",
      price: 1500,
      duration: "35-45 minutes",
      gradient: "from-green-400 to-emerald-500",
      features: [
        { en: "Health vulnerability analysis", ne: "स्वास्थ्य जोखिम विश्लेषण" },
        {
          en: "Disease prediction and prevention",
          ne: "रोग भविष्यवाणी र रोकथाम",
        },
        { en: "Dietary recommendations", ne: "आहार सिफारिसहरू" },
        { en: "Lifestyle modifications", ne: "जीवनशैली परिमार्जनहरू" },
        { en: "Healing gemstone suggestions", ne: "निको पार्ने रत्न सुझावहरू" },
        { en: "Yoga and meditation guidance", ne: "योग र ध्यान मार्गदर्शन" },
        {
          en: "Recovery timeline predictions",
          ne: "रिकभरी समयरेखा भविष्यवाणी",
        },
      ],
    },
    vastu: {
      id: "vastu",
      icon: <Type className="h-16 w-16 text-purple-400" />,
      titleEn: "Vastu Consultation Service",
      titleNe: "वास्तु परामर्श सेवा",
      shortDescEn:
        "Classical Vastu principles for positive energy and prosperity",
      shortDescNe:
        "सकारात्मक ऊर्जा र समृद्धिको लागि शास्त्रीय वास्तु सिद्धान्त",
      detailedDescEn:
        "We provide consultation according to classical Vastu principles to ensure positive energy, peace and prosperity in homes, offices, business places and other environments. Our service includes Vastu analysis and suggestions, environmental energy balance, home/office/shop Vastu improvement, and classical remedies for personal life and business.",
      detailedDescNe:
        "हामीले घर, कार्यालय, व्यवसायिक स्थल तथा अन्य वातावरणको सकारात्मक ऊर्जा, शान्ति र समृद्धि सुनिश्चित गर्न शास्त्रीय वास्तु सिद्धान्त अनुसार परामर्श प्रदान गर्दछौँ। हाम्रो सेवा अन्तर्गत वास्तु विश्लेषण र सुझाव, वातावरणीय ऊर्जा सन्तुलन, घर/कार्यालय/पसलको वास्तु सुधार, व्यक्तिगत जीवन र व्यवसायका लागि शास्त्रीय उपाय समावेश छ।",
      price: 2500,
      duration: "60-75 minutes",
      gradient: "from-purple-400 to-violet-500",
      features: [
        { en: "Vastu analysis and suggestions", ne: "वास्तु विश्लेषण र सुझाव" },
        { en: "Environmental energy balance", ne: "वातावरणीय ऊर्जा सन्तुलन" },
        {
          en: "Home/office/shop Vastu improvement",
          ne: "घर/कार्यालय/पसलको वास्तु सुधार",
        },
        {
          en: "Classical remedies for personal life",
          ne: "व्यक्तिगत जीवनका लागि शास्त्रीय उपाय",
        },
        {
          en: "Business prosperity guidance",
          ne: "व्यापारिक समृद्धि मार्गदर्शन",
        },
        { en: "Direction and placement advice", ne: "दिशा र स्थान सल्लाह" },
        { en: "Detailed Vastu report", ne: "विस्तृत वास्तु रिपोर्ट" },
      ],
    },
    karmakanda: {
      id: "karmakanda",
      icon: <Phone className="h-16 w-16 text-orange-400" />,
      titleEn: "Religious Ceremony Service",
      titleNe: "कर्मकाण्ड सेवा",
      shortDescEn: "Complete guidance for all Vedic religious ceremonies",
      shortDescNe: "सम्पूर्ण वैदिक धार्मिक कर्मकाण्डको मार्गदर्शन",
      detailedDescEn:
        "We provide complete guidance and services for all religious ceremonies according to Vedic tradition including marriage, sacred thread ceremony, planetary worship, Rudra worship, goddess worship, havan, Bhagwat and all religious rituals. These bring peace, prosperity and positive energy to life.",
      detailedDescNe:
        "हामीले वैदिक परम्परा अनुसार विवाह, ब्रतबन्ध, ग्रह पूजा, रुद्राभिषेक, देवी पूजा, हवन, भागवत र समस्त धार्मिक कर्मकाण्डको सम्पूर्ण मार्गदर्शन तथा सेवा प्रदान गर्दछौँ। जसले जीवनमा शान्ति, समृद्धि र सकारात्मक ऊर्जा ल्याउँछ।",
      price: 3000,
      duration: "90-120 minutes",
      gradient: "from-orange-400 to-red-500",
      features: [
        { en: "Marriage ceremony guidance", ne: "विवाह संस्कार मार्गदर्शन" },
        { en: "Sacred thread ceremony (Bratabandha)", ne: "ब्रतबन्ध संस्कार" },
        { en: "Planetary worship rituals", ne: "ग्रह पूजा विधि" },
        { en: "Rudra worship (Rudrabhishek)", ne: "रुद्राभिषेक पूजा" },
        { en: "Goddess worship ceremonies", ne: "देवी पूजा संस्कार" },
        { en: "Havan and fire rituals", ne: "हवन र अग्नि संस्कार" },
        { en: "Complete ceremony coordination", ne: "सम्पूर्ण संस्कार समन्वय" },
      ],
    },
    "kundali-creation": {
      id: "kundali-creation",
      icon: <Video className="h-16 w-16 text-indigo-400" />,
      titleEn: "Kundali (Chart) Creation Service",
      titleNe: "कुण्डली (चिना) निर्माण सेवा",
      shortDescEn: "Personalized birth chart creation with detailed analysis",
      shortDescNe: "व्यक्तिगत जन्म कुण्डली निर्माण र विस्तृत विश्लेषण",
      detailedDescEn:
        "We create personalized Kundali (charts) according to birth date, time and place and provide clear guidance according to Vedic astrology about various aspects of life—health, education, marriage, wealth, business and future. We also arrange delivery to your location if possible.",
      detailedDescNe:
        "हामीले जन्ममिति, समय र स्थानअनुसार व्यक्तिगत कुण्डली (चिना) निर्माण गरी जीवनका विविध पक्ष—स्वास्थ्य, शिक्षा, विवाह, धन, व्यवसाय र भविष्य—बारे वैदिक ज्योतिष अनुसार स्पष्ट मार्गदर्शन प्रदान गर्दछौँ। साथै सम्भव भए सम्म तपाईं स्थान सम्म delivery को व्यवस्था समेत गर्ने छौँ।",
      price: 1800,
      duration: "45-60 minutes",
      gradient: "from-indigo-400 to-blue-500",
      features: [
        {
          en: "Personalized birth chart creation",
          ne: "व्यक्तिगत जन्म कुण्डली निर्माण",
        },
        { en: "Life aspect analysis", ne: "जीवन पक्ष विश्लेषण" },
        { en: "Health predictions", ne: "स्वास्थ्य भविष्यवाणी" },
        {
          en: "Education and career guidance",
          ne: "शिक्षा र करियर मार्गदर्शन",
        },
        {
          en: "Marriage and relationship insights",
          ne: "विवाह र सम्बन्ध अन्तर्दृष्टि",
        },
        { en: "Business and wealth forecasts", ne: "व्यापार र धन पूर्वानुमान" },
        { en: "Home delivery service", ne: "घर पुर्याउने सेवा" },
      ],
    },
    gemstone: {
      id: "gemstone",
      icon: <MapPin className="h-16 w-16 text-emerald-400" />,
      titleEn: "Planetary Gemstone Service",
      titleNe: "ग्रह रत्न सेवा",
      shortDescEn:
        "Classical gemstone consultation for planetary defect removal",
      shortDescNe: "ग्रह दोष निवारणको लागि शास्त्रीय रत्न परामर्श",
      detailedDescEn:
        "We provide gemstone consultation in a classical way for planetary defect removal and positive influence in life. Suitable gemstone, wearing time, mantra chanting or worship method is suggested according to each person's birth chart. This service helps ensure health, prosperity, success and mental peace.",
      detailedDescNe:
        "हामीले ग्रह दोष निवारण र जीवनमा सकारात्मक प्रभावको लागि शास्त्रीय तवरबाट रत्न परामर्श प्रदान गर्छौँ। प्रत्येक व्यक्तिको जन्मकुण्डली अनुसार उपयुक्त रत्न, धारण समय, मन्त्र–जप वा पूजा विधि सुझाव गरिन्छ। यस सेवाले स्वास्थ्य, समृद्धि, सफलता र मानसिक शान्ति सुनिश्चित गर्न मद्दत गर्दछ।",
      price: 2200,
      duration: "50-60 minutes",
      gradient: "from-emerald-400 to-green-500",
      features: [
        { en: "Planetary defect analysis", ne: "ग्रह दोष विश्लेषण" },
        { en: "Suitable gemstone recommendation", ne: "उपयुक्त रत्न सिफारिस" },
        { en: "Wearing time guidance", ne: "धारण समय मार्गदर्शन" },
        { en: "Mantra chanting instructions", ne: "मन्त्र जप निर्देशन" },
        { en: "Worship method guidance", ne: "पूजा विधि मार्गदर्शन" },
        {
          en: "Health and prosperity benefits",
          ne: "स्वास्थ्य र समृद्धि फाइदा",
        },
        { en: "Mental peace assurance", ne: "मानसिक शान्ति आश्वासन" },
      ],
    },
  };

  const service = services[serviceId as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The requested service could not be found.
          </p>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`}
        ></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg mr-4`}
                >
                  {service.icon}
                </div>
                <Badge
                  className={`bg-gradient-to-r ${service.gradient} text-white px-4 py-2 text-lg`}
                >
                  Rs. {service.price}
                </Badge>
              </div>

              <h1
                className={`text-4xl md:text-5xl font-bold mb-6 text-gray-900 ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne" ? service.titleNe : service.titleEn}
              </h1>

              <p
                className={`text-xl text-gray-600 mb-8 leading-relaxed ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne"
                  ? service.detailedDescNe
                  : service.detailedDescEn}
              </p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-2" />
                  <span>
                    {currentLanguage === "ne"
                      ? "विशेषज्ञ ज्योतिषी"
                      : "Expert Astrologer"}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold px-8 py-4 text-lg`}
                onClick={() => router.push(`/booking?service=${service.id}`)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {currentLanguage === "ne" ? "अहिले बुक गर्नुहोस्" : "Book Now"}
              </Button>
            </div>

            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-2xl border-0">
                <CardHeader
                  className={`bg-gradient-to-r ${service.gradient} text-white text-center`}
                >
                  <CardTitle
                    className={`text-2xl ${
                      currentLanguage === "ne" ? "font-nepali" : ""
                    }`}
                  >
                    {currentLanguage === "ne"
                      ? "सेवा समावेश"
                      : "Service Includes"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span
                          className={`text-gray-700 ${
                            currentLanguage === "ne" ? "font-nepali" : ""
                          }`}
                        >
                          {currentLanguage === "ne" ? feature.ne : feature.en}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${
                currentLanguage === "ne" ? "font-nepali" : ""
              }`}
            >
              {currentLanguage === "ne"
                ? "परामर्श विकल्पहरू"
                : "Consultation Options"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 text-gray-900 ${
                    currentLanguage === "ne" ? "font-nepali" : ""
                  }`}
                >
                  {currentLanguage === "ne"
                    ? "फोन परामर्श"
                    : "Phone Consultation"}
                </h3>
                <p
                  className={`text-gray-600 ${
                    currentLanguage === "ne" ? "font-nepali" : ""
                  }`}
                >
                  {currentLanguage === "ne"
                    ? "घरबाट आरामदायक फोन कलमार्फत परामर्श"
                    : "Comfortable consultation via phone call from home"}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <Video className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 text-gray-900 ${
                    currentLanguage === "ne" ? "font-nepali" : ""
                  }`}
                >
                  {currentLanguage === "ne" ? "भिडियो कल" : "Video Call"}
                </h3>
                <p
                  className={`text-gray-600 ${
                    currentLanguage === "ne" ? "font-nepali" : ""
                  }`}
                >
                  {currentLanguage === "ne"
                    ? "आमने-सामने भिडियो कलमार्फत व्यक्तिगत परामर्श"
                    : "Personal consultation via face-to-face video call"}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-purple-100 rounded-full">
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 text-gray-900 ${
                    currentLanguage === "ne" ? "font-nepali" : ""
                  }`}
                >
                  {currentLanguage === "ne"
                    ? "व्यक्तिगत भेट"
                    : "In-Person Visit"}
                </h3>
                <p
                  className={`text-gray-600 ${
                    currentLanguage === "ne" ? "font-nepali" : ""
                  }`}
                >
                  {currentLanguage === "ne"
                    ? "हाम्रो कार्यालयमा आएर प्रत्यक्ष परामर्श"
                    : "Direct consultation by visiting our office"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Time Slots */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${
                currentLanguage === "ne" ? "font-nepali" : ""
              }`}
            >
              {currentLanguage === "ne"
                ? "उपलब्ध समयहरू"
                : "Available Time Slots"}
            </h2>
            <p
              className={`text-lg text-gray-600 ${
                currentLanguage === "ne" ? "font-nepali" : ""
              }`}
            >
              {currentLanguage === "ne"
                ? "आफ्नो सुविधाजनक समय छान्नुहोस्"
                : "Choose your convenient time slot"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {timeSlots.map((time, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <div className="text-center">
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  <span className="font-semibold">{time}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold px-8 py-4 text-lg`}
              onClick={() => router.push(`/booking?service=${service.id}`)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {currentLanguage === "ne"
                ? "बुकिङ प्रक्रिया सुरु गर्नुहोस्"
                : "Start Booking Process"}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${
                currentLanguage === "ne" ? "font-nepali" : ""
              }`}
            >
              {currentLanguage === "ne"
                ? "हामीलाई किन छान्नुहोस्?"
                : "Why Choose Us?"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-yellow-100 rounded-full">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <h3
                className={`text-xl font-semibold mb-3 text-gray-900 ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne"
                  ? "१५+ वर्ष अनुभव"
                  : "15+ Years Experience"}
              </h3>
              <p
                className={`text-gray-600 ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne"
                  ? "वैदिक ज्योतिषमा व्यापक अनुभव र विशेषज्ञता"
                  : "Extensive experience and expertise in Vedic astrology"}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3
                className={`text-xl font-semibold mb-3 text-gray-900 ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne"
                  ? "५०००+ खुसी ग्राहक"
                  : "5000+ Happy Clients"}
              </h3>
              <p
                className={`text-gray-600 ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne"
                  ? "हजारौं सन्तुष्ट ग्राहकहरूको भरपर्दो सेवा"
                  : "Trusted service with thousands of satisfied clients"}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3
                className={`text-xl font-semibold mb-3 text-gray-900 ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne"
                  ? "९८% सटीकता दर"
                  : "98% Accuracy Rate"}
              </h3>
              <p
                className={`text-gray-600 ${
                  currentLanguage === "ne" ? "font-nepali" : ""
                }`}
              >
                {currentLanguage === "ne"
                  ? "उच्च सटीकता र भरपर्दो भविष्यवाणीहरू"
                  : "High accuracy and reliable predictions"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              currentLanguage === "ne" ? "font-nepali" : ""
            }`}
          >
            {currentLanguage === "ne"
              ? "आजै आफ्नो परामर्श बुक गर्नुहोस्"
              : "Book Your Consultation Today"}
          </h2>
          <p
            className={`text-xl mb-8 text-indigo-200 max-w-2xl mx-auto ${
              currentLanguage === "ne" ? "font-nepali" : ""
            }`}
          >
            {currentLanguage === "ne"
              ? "विशेषज्ञ ज्योतिषीसँग व्यक्तिगत परामर्श लिनुहोस्"
              : "Get personalized consultation with expert astrologer"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold"
              onClick={() => router.push(`/booking?service=${service.id}`)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {currentLanguage === "ne" ? "अहिले बुक गर्नुहोस्" : "Book Now"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <a
                href="https://wa.me/9779801234567"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="mr-2 h-5 w-5" />
                {currentLanguage === "ne" ? "व्हाट्सएप गर्नुहोस्" : "WhatsApp"}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
