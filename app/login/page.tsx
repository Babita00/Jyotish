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
import { Eye, EyeOff, Mail, Lock, Star, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { currentLanguage } = useLanguage();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = currentLanguage === 'ne' ? 'इमेल आवश्यक छ' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = currentLanguage === 'ne' ? 'वैध इमेल प्रविष्ट गर्नुहोस्' : 'Please enter a valid email';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = currentLanguage === 'ne' ? 'पासवर्ड आवश्यक छ' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = currentLanguage === 'ne' ? 'पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ' : 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      
      toast({
        title: currentLanguage === 'ne' ? 'सफल!' : 'Success!',
        description: currentLanguage === 'ne' ? 'सफलतापूर्वक लगइन भयो' : 'Successfully logged in',
      });
      
      router.push('/');
    } catch (error: any) {
      // Check if it's an email confirmation error
      if (error.message?.toLowerCase().includes('email not confirmed') || 
          error.message?.toLowerCase().includes('confirm')) {
        setShowEmailConfirmation(true);
      } else {
        toast({
          title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
          description: error.message || (currentLanguage === 'ne' ? 'लगइन गर्न समस्या भयो' : 'Failed to login'),
          variant: 'destructive'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!formData.email || isResending) return;
    
    setIsResending(true);
    
    try {
      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: currentLanguage === 'ne' ? 'सफल!' : 'Success!',
          description: currentLanguage === 'ne' 
            ? 'पुष्टिकरण इमेल पठाइयो। कृपया आफ्नो इनबक्स जाँच गर्नुहोस्।'
            : 'Confirmation email sent. Please check your inbox.',
        });
      } else {
        toast({
          title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
          description: data.error || (currentLanguage === 'ne' ? 'इमेल पठाउन समस्या भयो' : 'Failed to send email'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' ? 'इमेल पठाउन समस्या भयो' : 'Failed to send confirmation email',
        variant: 'destructive'
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
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
            {currentLanguage === 'ne' ? 'लगइन गर्नुहोस्' : 'Welcome Back'}
          </h1>
          <p className={`text-indigo-200 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'आफ्नो खातामा प्रवेश गर्नुहोस्' : 'Sign in to your account'}
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className={`text-2xl text-center text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'साइन इन' : 'Sign In'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}
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

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                  {currentLanguage === 'ne' ? 'पासवर्ड' : 'Password'}
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''} ${isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="spinner mr-2"></div>
                    {currentLanguage === 'ne' ? 'लगइन गर्दै...' : 'Signing in...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {currentLanguage === 'ne' ? 'लगइन गर्नुहोस्' : 'Sign In'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Email Confirmation Section */}
            {showEmailConfirmation && (
              <div className="space-y-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-center">
                  <Mail className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className={`font-semibold text-yellow-800 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'इमेल पुष्टिकरण आवश्यक' : 'Email Confirmation Required'}
                  </h3>
                  <p className={`text-sm text-yellow-700 mt-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' 
                      ? 'कृपया आफ्नो इमेल पुष्टि गर्नुहोस्। पुष्टिकरण इमेल आफ्नो इनबक्स वा स्प्याम फोल्डरमा जाँच गर्नुहोस्।'
                      : 'Please confirm your email address. Check your inbox or spam folder for the confirmation email.'
                    }
                  </p>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResendConfirmation}
                    disabled={isResending || !formData.email}
                    className={`w-full ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                  >
                    {isResending ? (
                      <div className="flex items-center">
                        <div className="spinner mr-2"></div>
                        {currentLanguage === 'ne' ? 'पठाउँदै...' : 'Sending...'}
                      </div>
                    ) : (
                      currentLanguage === 'ne' ? 'पुष्टिकरण इमेल फेरि पठाउनुहोस्' : 'Resend Confirmation Email'
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowEmailConfirmation(false)}
                    className={`w-full text-sm ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                  >
                    {currentLanguage === 'ne' ? 'फिर्ता लगइन गर्नुहोस्' : 'Back to Login'}
                  </Button>
                </div>
              </div>
            )}

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                {currentLanguage === 'ne' ? 'खाता छैन?' : "Don't have an account?"}{' '}
                <Link 
                  href="/register" 
                  className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                >
                  {currentLanguage === 'ne' ? 'साइन अप गर्नुहोस्' : 'Sign up'}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className={`text-white hover:font-medium transition-colors ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
          >
            ← {currentLanguage === 'ne' ? 'होम पेजमा फर्कनुहोस्' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}