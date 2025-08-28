'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { canAccessResource } from '@/lib/permissions';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface RoleGuardProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export default function RoleGuard({ 
  children, 
  permission, 
  fallback,
  showFallback = true 
}: RoleGuardProps) {
  const { profile, loading } = useAuth();
  const { currentLanguage } = useLanguage();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="spinner"></div>
      </div>
    );
  }

  const hasAccess = canAccessResource(profile, permission);

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (!showFallback) {
      return null;
    }

    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h3 className={`text-lg font-semibold text-red-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'पहुँच अस्वीकृत' : 'Access Denied'}
          </h3>
          <p className={`text-red-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' 
              ? 'यो सुविधा प्रयोग गर्न तपाईंसँग अनुमति छैन।'
              : 'You do not have permission to access this feature.'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
}