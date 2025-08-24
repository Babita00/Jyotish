'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { Profile } from '@/lib/supabase';

export default function ProfilePage() {
  const { user, profile, updateProfile, loading } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: ''
  });

  React.useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        phone: profile.phone || ''
      });
    }
  }, [profile]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form when canceling
      setEditForm({
        full_name: profile?.full_name || '',
        phone: profile?.phone || ''
      });
    }
    setIsEditing(!isEditing);
    setUpdateMessage(null);
  };

  const handleSaveChanges = async () => {
    if (!user || !profile) return;

    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      await updateProfile({
        full_name: editForm.full_name,
        phone: editForm.phone || undefined
      });
      
      setIsEditing(false);
      setUpdateMessage({
        type: 'success',
        message: t('profile.profile_updated')
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setUpdateMessage({
        type: 'error',
        message: t('profile.update_error')
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'ne' ? 'ne-NP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      client: currentLanguage === 'ne' ? 'ग्राहक' : 'Client',
      admin: currentLanguage === 'ne' ? 'एडमिन' : 'Admin',
      astrologer: currentLanguage === 'ne' ? 'ज्योतिषी' : 'Astrologer'
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'astrologer':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-8 w-48 mb-6" />
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
            <Button asChild>
              <a href="/login">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        
      <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
          <div className="mb-6 flex justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2 text-2xl" />
              {currentLanguage === 'ne' ? 'फिर्ता' : 'Back'}
            </Button>
          </div>
        <div className="max-w-2xl mx-auto">


          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold text-white mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {t('profile.profile')}
            </h1>
            <p className="text-indigo-200">
              {currentLanguage === 'ne' ? 'आफ्नो प्रोफाइल जानकारी हेर्नुहोस् र सम्पादन गर्नुहोस्' : 'View and manage your profile information'}
            </p>
          </div>

          {/* Update Message */}
          {updateMessage && (
            <Alert className={`mb-6 ${updateMessage.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <div className="flex items-center">
                {updateMessage.type === 'success' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription className={`ml-2 ${updateMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {updateMessage.message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Unified Profile Card */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t('profile.profile')}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'ne' ? 'आफ्नो व्यक्तिगत र खाता जानकारी' : 'Your personal and account information'}
                  </CardDescription>
                </div>
                <Button
                  variant={isEditing ? "ghost" : "outline"}
                  size="sm"
                  onClick={handleEditToggle}
                  disabled={isUpdating}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      {t('profile.cancel')}
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-1" />
                      {t('profile.edit_profile')}
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage 
                    src={user.user_metadata?.avatar_url} 
                    alt={profile?.full_name || user.email || 'User'} 
                  />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl font-semibold">
                    {profile?.full_name 
                      ? profile.full_name.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase() || 'U'
                    }
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-xl">
                    {profile?.full_name || user.email?.split('@')[0] || 'User'}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-2">
                    <Badge variant={getRoleBadgeVariant(profile?.role || 'client')}>
                      {getRoleDisplay(profile?.role || 'client')}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Personal Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('profile.personal_info')}
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
                      {t('profile.full_name')}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="full_name"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                        className="mt-1"
                        placeholder={t('profile.full_name')}
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{profile?.full_name || '-'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      {t('profile.phone')}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1"
                        placeholder={t('profile.phone')}
                        type="tel"
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{profile?.phone || '-'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {t('profile.email')}
                    </Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{user.email}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {currentLanguage === 'ne' ? 'सत्यापित' : 'Verified'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t('profile.account_details')}
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {t('profile.member_since')}
                    </Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{user.created_at ? formatDate(user.created_at) : '-'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {t('profile.last_updated')}
                    </Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {profile?.updated_at ? formatDate(profile.updated_at) : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Statistics Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentLanguage === 'ne' ? 'खाता तथ्याङ्क' : 'Account Statistics'}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg border">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">0</div>
                    <div className="text-sm font-medium text-gray-600">
                      {currentLanguage === 'ne' ? 'बुकिङहरू' : 'Bookings'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border">
                    <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
                    <div className="text-sm font-medium text-gray-600">
                      {currentLanguage === 'ne' ? 'परामर्शहरू' : 'Consultations'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <>
                  <Separator />
                  <Button
                    onClick={handleSaveChanges}
                    disabled={isUpdating}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isUpdating ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>{currentLanguage === 'ne' ? 'सुरक्षित गर्दै...' : 'Saving...'}</span>
                      </div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {t('profile.save_changes')}
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
