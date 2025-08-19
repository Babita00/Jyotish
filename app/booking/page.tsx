'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, CheckCircle, Upload, CreditCard, Star, Heart, Briefcase, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { api, Service } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function BookingPage() {
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get('service');
  
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preSelectedService || '',
    consultationType: '',
    date: null as Date | null,
    time: '',
    paymentMethod: '',
    transactionId: '',
    paymentScreenshot: null as File | null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await api.getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, paymentScreenshot: file }));
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.phone && formData.email;
      case 2:
        return formData.service && formData.consultationType;
      case 3:
        return formData.date && formData.time;
      case 4:
        if (formData.paymentMethod === 'later') return true;
        return formData.paymentMethod && formData.transactionId && formData.paymentScreenshot;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' ? 'कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्' : 'Please fill all required fields',
        variant: 'destructive'
      });
    }
  };

  const uploadPaymentScreenshot = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'payment-screenshots');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload screenshot');
    }

    const { url } = await response.json();
    return url;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      let paymentScreenshotUrl = '';
      
      // Upload payment screenshot if provided
      if (formData.paymentScreenshot) {
        paymentScreenshotUrl = await uploadPaymentScreenshot(formData.paymentScreenshot);
      }

      // Create booking
      const bookingData = {
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service_id: formData.service,
        consultation_type: formData.consultationType as 'online' | 'physical',
        preferred_date: formData.date ? format(formData.date, 'yyyy-MM-dd') : '',
        preferred_time: formData.time,
        payment_method: formData.paymentMethod as any,
        transaction_id: formData.transactionId,
        payment_screenshot_url: paymentScreenshotUrl
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      toast({
        title: currentLanguage === 'ne' ? 'सफल!' : 'Success!',
        description: currentLanguage === 'ne' 
          ? 'तपाईंको बुकिङ सफलतापूर्वक पेश गरिएको छ। हामी चाँडै सम्पर्क गर्नेछौं।'
          : 'Your booking has been submitted successfully. We will contact you soon.',
      });
      
      setCurrentStep(5);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' 
          ? 'बुकिङ पेश गर्न समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।'
          : 'Failed to submit booking. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(s => s.service_key === formData.service);

  const getServiceIcon = (serviceKey: string) => {
    switch (serviceKey) {
      case 'kundali': return <Star className="h-5 w-5 text-yellow-500" />;
      case 'marriage': return <Heart className="h-5 w-5 text-pink-500" />;
      case 'career': return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'health': return <Activity className="h-5 w-5 text-green-500" />;
      default: return <Star className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {t('booking.title')}
            </h1>
            
            {/* Progress Bar */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar px-2 py-1">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                      currentStep >= step 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-10 sm:w-16 h-1 rounded ${
                        currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* Step Labels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm max-w-2xl mx-auto">
              <div className={`text-center ${currentStep >= 1 ? 'text-indigo-600 font-semibold' : 'text-gray-500'} ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'व्यक्तिगत जानकारी' : 'Personal Info'}
              </div>
              <div className={`text-center ${currentStep >= 2 ? 'text-indigo-600 font-semibold' : 'text-gray-500'} ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'सेवा छनोट' : 'Service Selection'}
              </div>
              <div className={`text-center ${currentStep >= 3 ? 'text-indigo-600 font-semibold' : 'text-gray-500'} ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'मिति र समय' : 'Date & Time'}
              </div>
              <div className={`text-center ${currentStep >= 4 ? 'text-indigo-600 font-semibold' : 'text-gray-500'} ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'भुक्तानी' : 'Payment'}
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className={`text-2xl text-center ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentStep === 1 && (currentLanguage === 'ne' ? 'व्यक्तिगत जानकारी' : 'Personal Information')}
                {currentStep === 2 && (currentLanguage === 'ne' ? 'सेवा छनोट' : 'Service Selection')}
                {currentStep === 3 && (currentLanguage === 'ne' ? 'मिति र समय' : 'Date & Time')}
                {currentStep === 4 && (currentLanguage === 'ne' ? 'भुक्तानी' : 'Payment')}
                {currentStep === 5 && (currentLanguage === 'ne' ? 'पुष्टि' : 'Confirmation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {t('booking.name')} *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2 h-12 text-lg"
                      placeholder={currentLanguage === 'ne' ? 'तपाईंको पूरा नाम' : 'Your full name'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {t('booking.phone')} *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2 h-12 text-lg"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {t('booking.email')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2 h-12 text-lg"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <Label className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {t('booking.service')} *
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {services.map((service) => (
                        <Card 
                          key={service.service_key} 
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            formData.service === service.service_key 
                              ? 'ring-2 ring-indigo-500 bg-indigo-50' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleInputChange('service', service.service_key)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {getServiceIcon(service.service_key)}
                                <div>
                                  <h3 className={`font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                                    {currentLanguage === 'ne' ? service.name_ne : service.name_en}
                                  </h3>
                                  <p className="text-green-600 font-bold">Rs. {service.price}</p>
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                formData.service === service.service_key 
                                  ? 'bg-indigo-500 border-indigo-500' 
                                  : 'border-gray-300'
                              }`}>
                                {formData.service === service.service_key && (
                                  <CheckCircle className="w-5 h-5 text-white" />
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {t('booking.consultation_type')} *
                    </Label>
                    <RadioGroup 
                      value={formData.consultationType} 
                      onValueChange={(value) => handleInputChange('consultationType', value)}
                      className="mt-4 space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className={`text-lg cursor-pointer ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {t('booking.online')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="physical" id="physical" />
                        <Label htmlFor="physical" className={`text-lg cursor-pointer ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {t('booking.physical')}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <Label className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {t('booking.date')} *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-4 h-12 text-lg"
                        >
                          <CalendarIcon className="mr-3 h-5 w-5" />
                          {formData.date ? format(formData.date, 'PPP') : 
                            (currentLanguage === 'ne' ? 'मिति छान्नुहोस्' : 'Pick a date')
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date || undefined}
                          onSelect={(date) => handleInputChange('date', date)}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {t('booking.time')} *
                    </Label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={formData.time === time ? "default" : "outline"}
                          className={`h-12 ${formData.time === time ? 'bg-indigo-600' : ''}`}
                          onClick={() => handleInputChange('time', time)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  {selectedService && (
                    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            {getServiceIcon(selectedService.service_key)}
                            <span className={`text-xl font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {currentLanguage === 'ne' ? selectedService.name_ne : selectedService.name_en}
                            </span>
                          </div>
                          <span className="text-3xl font-bold text-green-600">
                            Rs. {selectedService.price}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <div>
                    <Label className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {currentLanguage === 'ne' ? 'भुक्तानी विधि' : 'Payment Method'} *
                    </Label>
                    <RadioGroup 
                      value={formData.paymentMethod} 
                      onValueChange={(value) => handleInputChange('paymentMethod', value)}
                      className="mt-4 space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="khalti" id="khalti" />
                        <Label htmlFor="khalti" className="text-lg cursor-pointer">Khalti</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="esewa" id="esewa" />
                        <Label htmlFor="esewa" className="text-lg cursor-pointer">eSewa</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="fonepay" id="fonepay" />
                        <Label htmlFor="fonepay" className="text-lg cursor-pointer">FonePay</Label>
                      </div>
                      {formData.consultationType === 'physical' && (
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="later" id="later" />
                          <Label htmlFor="later" className={`text-lg cursor-pointer ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                            {currentLanguage === 'ne' ? 'भौतिक भेटमा भुक्तानी गर्नेछु' : 'Pay during physical visit'}
                          </Label>
                        </div>
                      )}
                    </RadioGroup>
                  </div>

                  {formData.paymentMethod && !['later'].includes(formData.paymentMethod) && (
                    <div className="space-y-6">
                      <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <h3 className={`text-xl font-semibold mb-4 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {currentLanguage === 'ne' ? 'QR कोड स्क्यान गर्नुहोस्' : 'Scan QR Code'}
                            </h3>
                            <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-6 flex items-center justify-center">
                              <div className="text-gray-500 text-center">
                                <CreditCard className="h-16 w-16 mx-auto mb-4" />
                                <p className="text-lg font-semibold">
                                  {formData.paymentMethod.toUpperCase()} QR Code
                                </p>
                              </div>
                            </div>
                            <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {currentLanguage === 'ne' 
                                ? 'भुक्तानी गरेपछि स्क्रिनसट र लेनदेन आईडी अपलोड गर्नुहोस्'
                                : 'Upload screenshot and transaction ID after payment'
                              }
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div>
                        <Label htmlFor="transactionId" className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {currentLanguage === 'ne' ? 'लेनदेन आईडी' : 'Transaction ID'} *
                        </Label>
                        <Input
                          id="transactionId"
                          value={formData.transactionId}
                          onChange={(e) => handleInputChange('transactionId', e.target.value)}
                          className="mt-2 h-12 text-lg"
                          placeholder={currentLanguage === 'ne' ? 'लेनदेन आईडी प्रविष्ट गर्नुहोस्' : 'Enter transaction ID'}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="screenshot" className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                          {currentLanguage === 'ne' ? 'भुक्तानी स्क्रिनसट' : 'Payment Screenshot'} *
                        </Label>
                        <div className="mt-2">
                          <label className="flex items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-10 h-10 mb-4 text-gray-500" />
                              <p className={`mb-2 text-lg text-gray-500 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                                {currentLanguage === 'ne' ? 'स्क्रिनसट अपलोड गर्नुहोस्' : 'Upload screenshot'}
                              </p>
                              <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                          </label>
                          {formData.paymentScreenshot && (
                            <p className="text-sm text-green-600 mt-2 font-semibold">
                              ✓ {formData.paymentScreenshot.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h2 className={`text-3xl font-bold mb-6 text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'बुकिङ सफल!' : 'Booking Successful!'}
                  </h2>
                  <p className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' 
                      ? 'तपाईंको परामर्श बुकिङ सफलतापूर्वक पेश गरिएको छ। हामी २४ घण्टा भित्र सम्पर्क गर्नेछौं।'
                      : 'Your consultation booking has been submitted successfully. We will contact you within 24 hours.'
                    }
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    size="lg"
                    className={`bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                  >
                    {currentLanguage === 'ne' ? 'होम पेजमा फर्कनुहोस्' : 'Return to Home'}
                  </Button>
                </div>
              )}

              {currentStep < 5 && (
                <div className="flex justify-between mt-10 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 1}
                    size="lg"
                    className={`px-8 py-3 text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                  >
                    {currentLanguage === 'ne' ? 'पछाडि' : 'Previous'}
                  </Button>
                  {currentStep < 4 ? (
                    <Button 
                      onClick={handleNext} 
                      size="lg"
                      className={`bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                    >
                      {currentLanguage === 'ne' ? 'अगाडि' : 'Next'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      size="lg"
                      className={`bg-green-600 hover:bg-green-700 px-8 py-3 text-lg ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                    >
                      {isSubmitting 
                        ? (currentLanguage === 'ne' ? 'पेश गर्दै...' : 'Submitting...') 
                        : (currentLanguage === 'ne' ? 'पेश गर्नुहोस्' : 'Submit')
                      }
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
    </ProtectedRoute>
  );
}