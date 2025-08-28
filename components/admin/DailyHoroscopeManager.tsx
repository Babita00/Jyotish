'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageProvider';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Star, Edit, Trash2, Eye, Plus, Save } from 'lucide-react';
import { format } from 'date-fns';

interface DailyHoroscope {
  id?: string;
  date: string;
  zodiac_sign: string;
  content_en: string;
  content_ne: string;
  is_published: boolean;
}

const ZODIAC_SIGNS = [
  { key: 'aries', en: 'Aries', ne: 'मेष' },
  { key: 'taurus', en: 'Taurus', ne: 'वृषभ' },
  { key: 'gemini', en: 'Gemini', ne: 'मिथुन' },
  { key: 'cancer', en: 'Cancer', ne: 'कर्कट' },
  { key: 'leo', en: 'Leo', ne: 'सिंह' },
  { key: 'virgo', en: 'Virgo', ne: 'कन्या' },
  { key: 'libra', en: 'Libra', ne: 'तुला' },
  { key: 'scorpio', en: 'Scorpio', ne: 'वृश्चिक' },
  { key: 'sagittarius', en: 'Sagittarius', ne: 'धनु' },
  { key: 'capricorn', en: 'Capricorn', ne: 'मकर' },
  { key: 'aquarius', en: 'Aquarius', ne: 'कुम्भ' },
  { key: 'pisces', en: 'Pisces', ne: 'मीन' }
];

export default function DailyHoroscopeManager() {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [horoscopes, setHoroscopes] = useState<DailyHoroscope[]>([]);
  const [editingHoroscope, setEditingHoroscope] = useState<DailyHoroscope | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<DailyHoroscope>({
    date: format(new Date(), 'yyyy-MM-dd'),
    zodiac_sign: '',
    content_en: '',
    content_ne: '',
    is_published: false
  });

  useEffect(() => {
    fetchHoroscopes();
  }, []);

  const fetchHoroscopes = async () => {
    try {
      const response = await fetch('/api/horoscopes');
      if (response.ok) {
        const data = await response.json();
        setHoroscopes(data.horoscopes || []);
      }
    } catch (error) {
      console.error('Error fetching horoscopes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.zodiac_sign || !formData.content_en || !formData.content_ne) {
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' ? 'सबै फिल्डहरू भर्नुहोस्' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    try {
      const url = editingHoroscope ? `/api/horoscopes/${editingHoroscope.id}` : '/api/horoscopes';
      const method = editingHoroscope ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: currentLanguage === 'ne' ? 'सफल!' : 'Success!',
          description: editingHoroscope 
            ? (currentLanguage === 'ne' ? 'राशिफल अपडेट भयो' : 'Horoscope updated')
            : (currentLanguage === 'ne' ? 'राशिफल सिर्जना भयो' : 'Horoscope created')
        });
        
        resetForm();
        fetchHoroscopes();
      }
    } catch (error) {
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' ? 'राशिफल सेभ गर्न समस्या भयो' : 'Failed to save horoscope',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (horoscope: DailyHoroscope) => {
    setEditingHoroscope(horoscope);
    setFormData(horoscope);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(currentLanguage === 'ne' ? 'के तपाईं यो राशिफल मेटाउन चाहनुहुन्छ?' : 'Are you sure you want to delete this horoscope?')) {
      return;
    }

    try {
      const response = await fetch(`/api/horoscopes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: currentLanguage === 'ne' ? 'सफल!' : 'Success!',
          description: currentLanguage === 'ne' ? 'राशिफल मेटाइयो' : 'Horoscope deleted'
        });
        fetchHoroscopes();
      }
    } catch (error) {
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' ? 'राशिफल मेटाउन समस्या भयो' : 'Failed to delete horoscope',
        variant: 'destructive'
      });
    }
  };

  const togglePublish = async (horoscope: DailyHoroscope) => {
    try {
      const response = await fetch(`/api/horoscopes/${horoscope.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...horoscope,
          is_published: !horoscope.is_published
        })
      });

      if (response.ok) {
        toast({
          title: currentLanguage === 'ne' ? 'सफल!' : 'Success!',
          description: horoscope.is_published 
            ? (currentLanguage === 'ne' ? 'राशिफल अप्रकाशित भयो' : 'Horoscope unpublished')
            : (currentLanguage === 'ne' ? 'राशिफल प्रकाशित भयो' : 'Horoscope published')
        });
        fetchHoroscopes();
      }
    } catch (error) {
      toast({
        title: currentLanguage === 'ne' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'ne' ? 'स्थिति परिवर्तन गर्न समस्या भयो' : 'Failed to change status',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      zodiac_sign: '',
      content_en: '',
      content_ne: '',
      is_published: false
    });
    setEditingHoroscope(null);
    setIsCreating(false);
  };

  const getZodiacName = (key: string) => {
    const zodiac = ZODIAC_SIGNS.find(z => z.key === key);
    return currentLanguage === 'ne' ? zodiac?.ne : zodiac?.en;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold text-gray-900 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
          {currentLanguage === 'ne' ? 'दैनिक राशिफल व्यवस्थापन' : 'Daily Horoscope Management'}
        </h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {currentLanguage === 'ne' ? 'नयाँ राशिफल' : 'New Horoscope'}
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
              {editingHoroscope 
                ? (currentLanguage === 'ne' ? 'राशिफल सम्पादन' : 'Edit Horoscope')
                : (currentLanguage === 'ne' ? 'नयाँ राशिफल' : 'New Horoscope')
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                    {currentLanguage === 'ne' ? 'मिति' : 'Date'} *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zodiac" className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                    {currentLanguage === 'ne' ? 'राशि' : 'Zodiac Sign'} *
                  </Label>
                  <Select
                    value={formData.zodiac_sign}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, zodiac_sign: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={currentLanguage === 'ne' ? 'राशि छान्नुहोस्' : 'Select zodiac sign'} />
                    </SelectTrigger>
                    <SelectContent>
                      {ZODIAC_SIGNS.map((zodiac) => (
                        <SelectItem key={zodiac.key} value={zodiac.key}>
                          <span className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                            {currentLanguage === 'ne' ? zodiac.ne : zodiac.en}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="content-en">Content (English) *</Label>
                <Textarea
                  id="content-en"
                  value={formData.content_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_en: e.target.value }))}
                  className="mt-2 min-h-[120px]"
                  placeholder="Enter horoscope content in English..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="content-ne" className="font-nepali">Content (नेपाली) *</Label>
                <Textarea
                  id="content-ne"
                  value={formData.content_ne}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_ne: e.target.value }))}
                  className="mt-2 min-h-[120px] font-nepali"
                  placeholder="नेपालीमा राशिफल लेख्नुहोस्..."
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded"
                  />
                  <span className={currentLanguage === 'ne' ? 'font-nepali' : ''}>
                    {currentLanguage === 'ne' ? 'तुरुन्त प्रकाशित गर्नुहोस्' : 'Publish immediately'}
                  </span>
                </label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  {currentLanguage === 'ne' ? 'सेभ गर्नुहोस्' : 'Save'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  {currentLanguage === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Horoscopes List */}
      <div className="grid grid-cols-1 gap-4">
        {horoscopes.map((horoscope) => (
          <Card key={horoscope.id} className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <h3 className={`text-lg font-semibold ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                      {getZodiacName(horoscope.zodiac_sign)}
                    </h3>
                    <Badge variant={horoscope.is_published ? 'default' : 'secondary'}>
                      {horoscope.is_published 
                        ? (currentLanguage === 'ne' ? 'प्रकाशित' : 'Published')
                        : (currentLanguage === 'ne' ? 'अप्रकाशित' : 'Draft')
                      }
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {horoscope.date}
                  </p>
                  <p className={`text-gray-700 line-clamp-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
                    {currentLanguage === 'ne' ? horoscope.content_ne : horoscope.content_en}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublish(horoscope)}
                    className={horoscope.is_published ? 'text-orange-600' : 'text-green-600'}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(horoscope)}
                    className="text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(horoscope.id!)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {horoscopes.length === 0 && (
        <Card className="shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-lg font-semibold text-gray-700 mb-2 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'कुनै राशिफल फेला परेन' : 'No horoscopes found'}
            </h3>
            <p className={`text-gray-500 ${currentLanguage === 'ne' ? 'font-nepali' : ''}`}>
              {currentLanguage === 'ne' ? 'पहिलो राशिफल सिर्जना गर्नुहोस्' : 'Create your first horoscope'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}