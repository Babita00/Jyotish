"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail } from "lucide-react";
import anil_khanal from "../assets/anil.jpg";
import prabhakar_khanal from "../assets/prabhakar.jpg";

interface Astrologer {
  name: string;
  image: StaticImageData; // Use StaticImageData for imported images
  intro: string;
  bio: string;
  experience: string[];
  services: string[];
  specialty: string[];
  contact: {
    phone: string;
    email: string;
    address?: string;
  };
}

export default function ContactPage() {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const isNepali = currentLanguage === "ne";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: isNepali ? "सन्देश पठाइयो!" : "Message Sent!",
        description: isNepali
          ? "तपाईंको सन्देश सफलतापूर्वक पठाइएको छ। हामी चाँडै जवाफ दिनेछौं।"
          : "Your message has been sent successfully. We will respond soon.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: isNepali ? "त्रुटि" : "Error",
        description: isNepali
          ? "सन्देश पठाउन समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।"
          : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const astrologers: Astrologer[] = [
    {
      name: "ज्योतिष अनिल खनाल",
      image: anil_khanal,
      intro: `वैदिक ज्योतिष विद्या मानव जीवनको दर्पण हो। जन्म समय, स्थान र ग्रह–नक्षत्रको स्थिति अनुसार मानिसको जीवनयात्रा—सुख–दुःख, धन, विवाह, सन्तान, स्वास्थ्य, शिक्षा, व्यवसाय र भविष्यको बाटो स्पष्ट हुन्छ।`,
      bio: `श्री खनालजी बाल्यकालदेखि नै धर्म, अध्यात्म र वैदिक ज्योतिष प्रति गहिरो लगाव राख्ने व्यक्तित्व हुनुहुन्छ। गुरुकुलीय परम्परादेखि निरन्तर अध्ययन गर्दै हाल नेपाल संस्कृत विश्वविद्यालयमा फलित ज्योतिष विषयको गहन अध्ययन गरिरहनुभएको छ।`,
      experience: [
        "विगत ४–५ वर्षदेखि निरन्तर चिनाहरू (कुण्डली) निर्माण, विश्लेषण र भविष्यवाणी गर्दै आउनु।",
        "राशि, नक्षत्र, ग्रहदशा, योग, दोष र ग्रह–गोचरको प्रभाव बारे गहन अध्ययन।",
        "विवाह, धन, शिक्षा, स्वास्थ्य, सन्तान, विदेश तथा व्यवसाय सम्बन्धी परामर्शमा विशेष अनुभव।",
        "बृहद्पाराशर होरा शास्त्र, जातक पारिजात, फलदीपिका, सारावली लगायतका प्राचीन ग्रन्थमा आधारित अनुसन्धान र अभ्यास।",
        "गुरुकुलीय साधनादेखि लिएर विश्वविद्यालयीय अध्ययनसम्म निरन्तर फलित ज्योतिषमा साधना।",
      ],
      services: [
        "जन्मकुण्डली निर्माण, विश्लेषण र भविष्यवाणी",
        "विवाह, धन, शिक्षा, स्वास्थ्य, सन्तान, विदेश तथा व्यवसाय सम्बन्धी परामर्श",
        "ग्रह–दोष निवारण: मन्त्र–जप, दान, रत्नधारण, पूजा–विधि",
        "योग–दोष विश्लेषण र समाधान",
        "दशा–गोचर अनुसार जीवन मार्गदर्शन",
      ],
      specialty: [
        "गुरुकुलदेखि विश्वविद्यालयसम्म प्राप्त शास्त्रीय आधार र व्यवहारिक अनुभवको संयोजन",
        "सरल र सहज भाषामा जीवन–मार्गदर्शन",
        "प्रत्येक व्यक्तिको कुण्डली अनुसार विशिष्ट परामर्श",
        "ग्रह–नक्षत्रको प्रभाव र उपायहरूको व्यावहारिक प्रस्तुति",
      ],
      contact: {
        phone: "9866096040",
        email: " anilkhanal012@gmail.com",
        address:
          "शितगंगा नगरपालिका–२, अर्घाखाँची | हाल: टोखा नगरपालिका–६, काठमाडौं",
      },
    },
    {
      name: "ज्योतिष प्रभाकर खनाल",
      image: prabhakar_khanal,
      intro: `वैदिक ज्योतिष शास्त्र मानव जीवनको दर्पण हो। जन्म समय, स्थान र ग्रह–नक्षत्रको स्थिति अनुसार मानिसको जीवनयात्रा, सुख–दुःख, स्वास्थ्य, शिक्षा, विवाह, धन, व्यवसाय तथा भविष्यका सम्भावनाबारे मार्गदर्शन गर्ने गहन विद्या नै ज्योतिष शास्त्र हो।`,
      bio: `यसै गहन विद्याप्रति समर्पित ज्यो. प्रभाकर खनाल विगत तिन वर्षदेखि निरन्तर वैदिक ज्योतिष सेवा प्रदान गर्दै आउनुभएको छ। नेपाल संस्कृत विश्वविद्यालयमा फलित ज्योतिष अध्ययनरत उहाँमा संस्कृत तथा धर्म–संस्कृति प्रतिको लगाव मात्र नभई संस्कृति, पर्यटन तथा नागरिक उड्डयन मन्त्रालय अन्तर्गतको नेपाल पञ्चाङ्ग निर्णायक विकास समितिबाट ज्योतिष प्रशिक्षण लिई सरकारी तवरबाट प्रमाणित (Certified) ज्योतिषी पनि हुनुहुन्छ।`,
      experience: [
        "बृहत् पराशर होरा शास्त्र, बृहत् जातक, जातक पारिजात, सारावली र फलदीपिका जस्ता प्राचीन ग्रन्थहरूमा आधारित अध्ययन।",
        "फलादेश, व्यक्तिगत परामर्श, रत्न ज्ञान, ग्रह पूजा तथा अनलाइन पुजा सेवा।",
        "ग्रह–दोष निवारणका लागि वैज्ञानिक दृष्टिकोणमा आधारित ज्योतिषीय उपाय।",
      ],
      services: [
        "व्यक्तिगत परामर्श",
        "जन्मकुण्डली विश्लेषण",
        "ग्रह पूजा र उपाय",
        "अनलाइन पुजा सेवा",
      ],
      specialty: [
        "सरल र व्यावहारिक परामर्श",
        "शास्त्रीय आधारमा उपाय प्रदान गर्ने दक्षता",
        "वैदिक ज्ञानलाई आधुनिक जीवनमा व्यवहारिक बनाउने दृष्टिकोण",
      ],
      contact: {
        phone: "9863474528",
        email: "prabhakarkhanal4@gmail.com",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-yellow-400 to-purple-600 text-white shadow-lg">
        <h1
          className={`text-4xl md:text-5xl font-bold ${
            isNepali ? "font-nepali" : ""
          }`}
        >
          {isNepali
            ? "हाम्रो ज्योतिषीहरूसँग सम्पर्क गर्नुहोस्"
            : "Get in Touch with Our Astrologers"}
        </h1>
        <p
          className={`mt-4 text-lg md:text-xl ${isNepali ? "font-nepali" : ""}`}
        >
          {isNepali
            ? "सही मार्गदर्शनको लागि अनुभवी ज्योतिषीहरूसँग सम्पर्क गर्नुहोस्।"
            : "Contact our expert astrologers for personalized guidance."}
        </p>
      </div>

      {/* Astrologers Section */}
      <div className="container mx-auto px-4 py-12 grid gap-12 md:grid-cols-2">
        {astrologers.map((astro, idx) => (
          <Card
            key={idx}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 bg-white rounded-xl overflow-hidden pt-44"
          >
            {/* Profile Picture */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div className="w-60 h-60 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-r from-pink-400 to-red-500 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={astro.image}
                    alt={astro.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <CardContent className="pt-20 space-y-4">
              <h2
                className={`text-2xl font-bold text-center ${
                  isNepali ? "font-nepali" : ""
                }`}
              >
                {astro.name}
              </h2>
              <p
                className={`text-gray-700 text-center ${
                  isNepali ? "font-nepali" : ""
                }`}
              >
                {astro.intro}
              </p>
              <p className={`text-gray-600 ${isNepali ? "font-nepali" : ""}`}>
                {astro.bio}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3
                    className={`font-semibold ${isNepali ? "font-nepali" : ""}`}
                  >
                    🔯 अनुभव र अध्ययन
                  </h3>
                  <ul
                    className={`list-disc ml-5 ${
                      isNepali ? "font-nepali" : ""
                    }`}
                  >
                    {astro.experience.map((exp, i) => (
                      <li key={i}>{exp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    className={`font-semibold ${isNepali ? "font-nepali" : ""}`}
                  >
                    🔯 सेवाहरू
                  </h3>
                  <ul
                    className={`list-disc ml-5 ${
                      isNepali ? "font-nepali" : ""
                    }`}
                  >
                    {astro.services.map((srv, i) => (
                      <li key={i}>{srv}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h3
                  className={`font-semibold ${isNepali ? "font-nepali" : ""}`}
                >
                  📞 सम्पर्क
                </h3>
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" /> {astro.contact.phone}
                </p>
                <p className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> {astro.contact.email}
                </p>
                {astro.contact.address && (
                  <p
                    className={`text-gray-500 ${isNepali ? "font-nepali" : ""}`}
                  >
                    {astro.contact.address}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
          <CardHeader>
            <CardTitle
              className={`text-xl font-bold text-center ${
                isNepali ? "font-nepali" : ""
              }`}
            >
              {isNepali ? "सन्देश पठाउनुहोस्" : "Send Us a Message"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder={isNepali ? "तपाईंको नाम" : "Your Name"}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
              <Input
                placeholder={isNepali ? "फोन नम्बर" : "Phone Number"}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
              <Input
                placeholder={isNepali ? "इमेल" : "Email"}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
              <Textarea
                placeholder={
                  isNepali ? "सन्देश लेख्नुहोस्..." : "Write your message..."
                }
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />{" "}
                {isNepali ? "पठाउनुहोस्" : "Send"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
