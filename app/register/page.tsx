'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/components/LanguageProvider';
import { Eye, EyeOff, Mail, Lock, User, Star, ArrowRight, Phone } from 'lucide-react';

export default function RegisterPage() {
  const { currentLanguage } = useLanguage();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = currentLanguage === 'ne' ? 'पूरा नाम आवश्यक छ' : 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = currentLanguage === 'ne' ? 'नाम कम्तिमा २ अक्षरको हुनुपर्छ' : 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = currentLanguage === 'ne' ? 'इमेल आवश्यक छ' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = currentLanguage === 'ne' ? 'वैध इमेल प्रविष्ट गर्नुहोस्' : 'Please enter a valid email';
    }
    
    // Phone validation (optional but if provided should be valid)
    if (formData.phone && !/^(\+977)?[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = currentLanguage === 'ne' ? 'वैध फोन नम्बर प्रविष्ट गर्नुहोस्' : 'Please enter a valid phone number';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = currentLanguage === 'ne' ? 'पासवर्ड आवश्यक छ' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = currentLanguage === 'ne' ? 'पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ' : 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = currentLanguage === 'ne' 
        ? 'पासवर्डमा कम्तिमा एक सानो अक्षर, एक ठूलो अक्षर र एक संख्या हुनुपर्छ'
        : 'Password must contain at least one lowercase, uppercase letter and number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === 'ne' ? 'पासवर्ड पुष्टि आवश्यक छ' : 'Password confirmation is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === 'ne' ? 'पासवर्ड मेल खाँदैन' : 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    console.log('🚀 Starting signup process...');
    
    try {
      console.log('📤 Calling signUp function...');
      const result = await signUp(formData.email, formData.password, formData.fullName, formData.phone);
      console.log('📥 SignUp result:', result);
      
      toast({
        title: currentLanguage === 'ne' ? 'सफल!' : 'Success!',
        description: currentLanguage === 'ne' 
          ? 'खाता सफलतापूर्वक सिर्जना भयो। कृपया लगइन गर्नुहोस्।'
          : 'Account created successfully. Please login.',
      });
      
      router.push('/login');
    } catch (error: any) {
      console.error('💥 Signup error caught:', error);
      
      let errorMessage = error.message || (currentLanguage === 'ne' ? 'खाता सिर्जना गर्न समस्या भयो' : 'Failed to create account');
      
      // Handle specific Supabase errors
      if (error.message?.includes('User already registered')) {
        errorMessage = currentLanguage === 'ne' 
          ? 'यो इमेल पहिले नै दर्ता छ। कृपया लगइन गर्नुहोस्।'
          : 'This email is already registered. Please login.';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = currentLanguage === 'ne' 
          ? 'वैध इमेल प्रविष्ट गर्नुहोस्'
          : 'Please enter a valid email address';
      } else if (error.message?.includes('Password')) {
        errorMessage = currentLanguage === 'ne' 
          ? 'पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ'
          : 'Password must be at least 6 characters long';
      }
      
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 flex md:items-center justify-center p-4 py-8 md:py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg')] bg-cover bg-center bg-fixed opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      
      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold text-white mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'नयाँ खाता बनाउनुहोस्' : 'Create Account'}
          </h1>
          <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'ज्योतिष परामर्शको लागि दर्ता गर्नुहोस्' : 'Register for astrology consultation'}
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className={`text-2xl text-center text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'साइन अप' : 'Sign Up'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'पूरा नाम' : 'Full Name'} *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`pl-10 h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                    placeholder={currentLanguage === 'ne' ? 'आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्' : 'Enter your full name'}
                  />
                </div>
                {errors.fullName && (
                  <p className={`text-red-500 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'इमेल ठेगाना' : 'Email Address'} *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-10 h-12 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder={currentLanguage === 'ne' ? 'आफ्नो इमेल प्रविष्ट गर्नुहोस्' : 'Enter your email'}
                  />
                </div>
                {errors.email && (
                  <p className={`text-red-500 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'फोन नम्बर' : 'Phone Number'} ({currentLanguage === 'ne' ? 'वैकल्पिक' : 'Optional'})
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`pl-10 h-12 ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>
                {errors.phone && (
                  <p className={`text-red-500 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'पासवर्ड' : 'Password'} *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder={currentLanguage === 'ne' ? 'आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्' : 'Enter your password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className={`text-red-500 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'पासवर्ड पुष्टि गर्नुहोस्' : 'Confirm Password'} *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 h-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder={currentLanguage === 'ne' ? 'पासवर्ड फेरि प्रविष्ट गर्नुहोस्' : 'Re-enter your password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className={`text-red-500 text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''} ${isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="spinner mr-2"></div>
                    {currentLanguage === 'ne' ? 'खाता बनाउँदै...' : 'Creating account...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {currentLanguage === 'ne' ? 'खाता बनाउनुहोस्' : 'Create Account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'पहिले नै खाता छ?' : "Already have an account?"}{' '}
                <Link 
                  href="/login" 
                  className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                >
                  {currentLanguage === 'ne' ? 'लगइन गर्नुहोस्' : 'Sign in'}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className={`text-indigo-200 hover:text-white transition-colors ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
          >
            ← {currentLanguage === 'ne' ? 'होम पेजमा फर्कनुहोस्' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}