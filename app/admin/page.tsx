'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { api, Booking, Contact } from '@/lib/supabase';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X,
  Plus,
  Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
  const { currentLanguage, t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [blogPost, setBlogPost] = useState({
    title: '',
    titleNe: '',
    content: '',
    contentNe: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsData, contactsData] = await Promise.all([
        api.getBookings(),
        api.getContacts()
      ]);
      
      setBookings(bookingsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      await fetchData();
      toast({
        title: 'Success',
        description: 'Booking status updated successfully'
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to update booking status',
        variant: 'destructive'
      });
    }
  };

  const updateContactStatus = async (contactId: string, status: Contact['status']) => {
    try {
      await api.updateContactStatus(contactId, status);
      await fetchData();
      toast({
        title: 'Success',
        description: 'Contact status updated successfully'
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: 'Error',
        description: 'Failed to update contact status',
        variant: 'destructive'
      });
    }
  };

  const createBlogPost = async () => {
    try {
      await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_en: blogPost.title,
          title_ne: blogPost.titleNe,
          content_en: blogPost.content,
          content_ne: blogPost.contentNe,
          category: 'General',
          is_published: true
        })
      });
      
      setBlogPost({ title: '', titleNe: '', content: '', contentNe: '' });
      toast({
        title: 'Success',
        description: 'Blog post created successfully'
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create blog post',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceName = (service: any) => {
    if (!service) return 'Unknown Service';
    return currentLanguage === 'ne' ? service.name_ne : service.name_en;
  };

  const stats = [
    {
      title: currentLanguage === 'ne' ? 'कुल बुकिङ' : 'Total Bookings',
      value: bookings.length.toString(),
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-blue-600'
    },
    {
      title: currentLanguage === 'ne' ? 'यस महिना' : 'This Month',
      value: bookings.filter(b => new Date(b.created_at).getMonth() === new Date().getMonth()).length.toString(),
      icon: <Users className="h-6 w-6" />,
      color: 'text-green-600'
    },
    {
      title: currentLanguage === 'ne' ? 'कुल आम्दानी' : 'Total Revenue',
      value: `Rs. ${bookings.filter(b => b.payment_status === 'paid').reduce((sum, b) => sum + (b.service?.price || 0), 0).toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-600'
    },
    {
      title: currentLanguage === 'ne' ? 'नयाँ सन्देश' : 'New Messages',
      value: contacts.filter(c => c.status === 'unread').length.toString(),
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'text-orange-600'
    }
  ];

  // Custom admin check component
  const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <Header />
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-8">Please login to access admin panel</p>
          </div>
          <Footer />
        </div>
      );
    }

    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <Header />
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
            <p className="text-gray-600 mb-8">You need admin privileges to access this page</p>
          </div>
          <Footer />
        </div>
      );
    }

    return <>{children}</>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-lg">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <AdminProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'एडमिन प्यानल' : 'Admin Panel'}
          </h1>
          <p className={`text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
            {currentLanguage === 'ne' ? 'बुकिङ र सामग्री व्यवस्थापन गर्नुहोस्' : 'Manage bookings and content'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm text-gray-600 mb-1 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
              {currentLanguage === 'ne' ? 'बुकिङहरू' : 'Bookings'}
            </TabsTrigger>
            <TabsTrigger value="contacts" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
              {currentLanguage === 'ne' ? 'सम्पर्कहरू' : 'Contacts'}
            </TabsTrigger>
            <TabsTrigger value="blog" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
              {currentLanguage === 'ne' ? 'ब्लग' : 'Blog'}
            </TabsTrigger>
            <TabsTrigger value="panchang" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
              {currentLanguage === 'ne' ? 'पञ्चाङ्ग' : 'Panchang'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                    {currentLanguage === 'ne' ? 'बुकिङ व्यवस्थापन' : 'Booking Management'}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder={currentLanguage === 'ne' ? 'खोज्नुहोस्...' : 'Search...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-indigo-500">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <h3 className={`font-semibold text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {booking.full_name}
                            </h3>
                            <p className="text-sm text-gray-600">{booking.phone}</p>
                            <p className="text-sm text-gray-600">{booking.email}</p>
                          </div>
                          <div>
                            <p className={`font-medium ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {getServiceName(booking.service)}
                            </p>
                            <p className={`text-sm text-gray-600 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {booking.consultation_type === 'online' 
                                ? (currentLanguage === 'ne' ? 'अनलाइन' : 'Online')
                                : (currentLanguage === 'ne' ? 'भौतिक' : 'Physical')
                              }
                            </p>
                            <p className="text-sm font-semibold text-green-600">Rs. {booking.service?.price}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{booking.preferred_date}</p>
                            <p className="text-sm text-gray-600">{booking.preferred_time}</p>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 justify-end">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600"
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                  {currentLanguage === 'ne' ? 'सम्पर्क सन्देशहरू' : 'Contact Messages'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <Card key={contact.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className={`font-semibold text-gray-900 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {contact.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                            <p className="text-sm text-gray-600 mb-3">{contact.phone}</p>
                            <p className={`text-gray-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                              {contact.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{new Date(contact.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={contact.status === 'unread' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                              {contact.status}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateContactStatus(contact.id, contact.status === 'unread' ? 'read' : 'unread')}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                  {currentLanguage === 'ne' ? 'नयाँ ब्लग पोस्ट' : 'New Blog Post'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title-en">Title (English)</Label>
                    <Input
                      id="title-en"
                      value={blogPost.title}
                      onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-2"
                      placeholder="Enter title in English"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title-ne" className="font-nepali">Title (नेपाली)</Label>
                    <Input
                      id="title-ne"
                      value={blogPost.titleNe}
                      onChange={(e) => setBlogPost(prev => ({ ...prev, titleNe: e.target.value }))}
                      className="mt-2 font-nepali"
                      placeholder="नेपालीमा शीर्षक लेख्नुहोस्"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="content-en">Content (English)</Label>
                    <Textarea
                      id="content-en"
                      value={blogPost.content}
                      onChange={(e) => setBlogPost(prev => ({ ...prev, content: e.target.value }))}
                      className="mt-2 min-h-[200px]"
                      placeholder="Write your blog content in English..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="content-ne" className="font-nepali">Content (नेपाली)</Label>
                    <Textarea
                      id="content-ne"
                      value={blogPost.contentNe}
                      onChange={(e) => setBlogPost(prev => ({ ...prev, contentNe: e.target.value }))}
                      className="mt-2 min-h-[200px] font-nepali"
                      placeholder="नेपालीमा ब्लग सामग्री लेख्नुहोस्..."
                    />
                  </div>
                </div>
                <Button 
                  onClick={createBlogPost}
                  className={`bg-indigo-600 hover:bg-indigo-700 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {currentLanguage === 'ne' ? 'पोस्ट प्रकाशित गर्नुहोस्' : 'Publish Post'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="panchang">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                  {currentLanguage === 'ne' ? 'दैनिक पञ्चाङ्ग अपडेट' : 'Daily Panchang Update'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className={`text-lg font-semibold text-gray-700 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? 'पञ्चाङ्ग फिचर आउँदै छ' : 'Panchang Feature Coming Soon'}
                  </h3>
                  <p className={`text-gray-500 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' 
                      ? 'दैनिक पञ्चाङ्ग र राशिफल अपडेट गर्न यो सेक्शन प्रयोग गर्नुहोस्'
                      : 'Use this section to update daily Panchang and horoscope'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
    </AdminProtectedRoute>
  );
}