'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      const target = `${redirectTo}?redirectTo=${encodeURIComponent(pathname)}`;
      router.push(target);
    }
  }, [user, loading, requireAuth, redirectTo, router, pathname]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                <Star className="h-8 w-8 text-white animate-pulse" />
              </div>
            </div>
            <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'लोड हुँदै...' : 'Loading...'}
            </h3>
            <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'कृपया पर्खनुहोस्' : 'Please wait'}
            </p>
            <div className="mt-4">
              <div className="spinner mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show unauthorized message if auth is required but user is not logged in
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'पहुँच अस्वीकृत' : 'Access Denied'}
            </h3>
            <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' 
                ? 'यो पृष्ठ पहुँच गर्न कृपया लगइन गर्नुहोस्'
                : 'Please login to access this page'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render children if authorized or auth not required
  return <>{children}</>;
}