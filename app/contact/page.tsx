'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send,
  Star,
  Calendar,
  Users
} from 'lucide-react';

export default function ContactPage() {
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: currentLanguage === 'ne' ? 'सन्देश पठाइयो!' : 'Message Sent!',
        description: currentLanguage === 'ne' 
          ? 'तपाईंको सन्देश सफलतापूर्वक पठाइएको छ। हामी चाँडै जवाफ दिनेछौं।'
          : 'Your message has been sent successfully. We will respond soon.',
      });
      
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' 
          ? 'सन्देश पठाउन समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।'
          : 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      titleEn: 'Office Address',
      titleNe: 'कार्यालयको ठेगाना',
      valueEn: 'Thamel, Kathmandu-29, Nepal',
      valueNe: 'थमेल, काठमाडौं-२९, नेपाल',
      color: 'text-blue-600'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      titleEn: 'Phone Number',
      titleNe: 'फोन नम्बर',
      valueEn: '+977 9801234567',
      valueNe: '+९७७ ९८०१२३४५६७',
      color: 'text-green-600'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      titleEn: 'Email Address',
      titleNe: 'इमेल ठेगाना',
      valueEn: 'info@jyotishcenter.com',
      valueNe: 'info@jyotishcenter.com',
      color: 'text-purple-600'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      titleEn: 'Working Hours',
      titleNe: 'कार्य समय',
      valueEn: 'Sun-Fri: 9:00 AM - 6:00 PM',
      valueNe: 'आइत-शुक्र: बिहान ९:०० - साँझ ६:००',
      color: 'text-orange-600'
    }
  ];

  const quickStats = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      value: '5000+',
      labelEn: 'Happy Clients',
      labelNe: 'खुसी ग्राहकहरू'
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      value: '15+',
      labelEn: 'Years Experience',
      labelNe: 'वर्ष अनुभव'
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      value: '98%',
      labelEn: 'Accuracy Rate',
      labelNe: 'सटीकता दर'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {t('contact.title')}
          </h1>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto mb-8 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'हाम्रो विशेषज्ञ ज्योतिषीहरूसँग सम्पर्क राख्नुहोस् र आफ्नो जीवनको लागि सही मार्गदर्शन पाउनुहोस्'
              : 'Get in touch with our expert astrologers and receive the right guidance for your life'
            }
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className={`text-sm text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? stat.labelNe : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className={`text-2xl font-bold text-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'सन्देश पठाउनुहोस्' : 'Send us a Message'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                    {currentLanguage === 'ne' ? 'पूरा नाम' : 'Full Name'} *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-2"
                    placeholder={currentLanguage === 'ne' ? 'तपाईंको नाम लेख्नुहोस्' : 'Enter your name'}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                      {currentLanguage === 'ne' ? 'फोन नम्बर' : 'Phone Number'} *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                      placeholder="+977 98XXXXXXXX"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                      {currentLanguage === 'ne' ? 'इमेल ठेगाना' : 'Email Address'} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                    {currentLanguage === 'ne' ? 'विषय' : 'Subject'} *
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="mt-2"
                    placeholder={currentLanguage === 'ne' ? 'सन्देशको विषय' : 'Message subject'}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                    {currentLanguage === 'ne' ? 'सन्देश' : 'Message'} *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`mt-2 min-h-[120px] ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                    placeholder={currentLanguage === 'ne' ? 'तपाईंको सन्देश यहाँ लेख्नुहोस्...' : 'Write your message here...'}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                >
                  {isSubmitting ? (
                    currentLanguage === 'ne' ? 'पठाउँदै...' : 'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {currentLanguage === 'ne' ? 'सन्देश पठाउनुहोस्' : 'Send Message'}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className={`text-2xl font-bold text-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'सम्पर्क जानकारी' : 'Contact Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${info.color} mt-1`}>
                        {info.icon}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-gray-900 mb-1 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {currentLanguage === 'ne' ? info.titleNe : info.titleEn}
                        </h3>
                        <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {currentLanguage === 'ne' ? info.valueNe : info.valueEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'तुरुन्त जवाफको लागि' : 'For Instant Response'}
                </h3>
                <p className={`mb-4 text-green-100 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' 
                    ? 'व्हाट्सएपमा सन्देश पठाउनुहोस् र तुरुन्त जवाफ पाउनुहोस्'
                    : 'Message us on WhatsApp for instant response'
                  }
                </p>
                <Button 
                  asChild
                  className={`bg-white text-green-600 hover:bg-green-50 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                >
                  <a 
                    href="https://wa.me/9779801234567" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {currentLanguage === 'ne' ? 'व्हाट्सएप गर्नुहोस्' : 'Chat on WhatsApp'}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-indigo-500 mx-auto mb-3" />
                    <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {currentLanguage === 'ne' ? 'नक्सा लोड हुँदै...' : 'Map Loading...'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-16 shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className={`text-2xl font-bold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'बारम्बार सोधिने प्रश्नहरू' : 'Frequently Asked Questions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'परामर्श कत्ति समयको हुन्छ?' : 'How long is a consultation?'}
                  </h4>
                  <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' 
                      ? 'सामान्यतः एक परामर्श ३०-४५ मिनेटको हुन्छ।'
                      : 'Typically, a consultation lasts 30-45 minutes.'
                    }
                  </p>
                </div>
                <div>
                  <h4 className={`font-semibold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'अनलाइन परामर्श कसरी हुन्छ?' : 'How does online consultation work?'}
                  </h4>
                  <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne'
                      ? 'फोन वा भिडियो कलमार्फत अनलाइन परामर्श गर्न सकिन्छ।'
                      : 'Online consultation is conducted via phone or video call.'
                    }
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'रिपोर्ट कहिले पाइन्छ?' : 'When will I receive the report?'}
                  </h4>
                  <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne'
                      ? 'परामर्श पछि २४ घण्टा भित्र विस्तृत रिपोर्ट पाइन्छ।'
                      : 'You will receive a detailed report within 24 hours after consultation.'
                    }
                  </p>
                </div>
                <div>
                  <h4 className={`font-semibold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'के कुराहरू आवश्यक छ?' : 'What information is needed?'}
                  </h4>
                  <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne'
                      ? 'जन्म मिति, समय र स्थान आवश्यक हुन्छ।'
                      : 'Birth date, time, and place are required.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}