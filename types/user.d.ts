export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    phone?: string;
  };
}

export interface Profile {
  id: string;
  full_name: string;
  phone?: string;
  role: 'client' | 'admin' | 'astrologer';
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  role: 'client' | 'admin' | 'astrologer';
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface DailyHoroscope {
  id: string;
  date: string;
  zodiac_sign: string;
  content_en: string;
  content_ne: string;
  author_id: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}