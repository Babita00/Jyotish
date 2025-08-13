/*
  # Astrology Consultation Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `phone` (text)
      - `role` (text, default 'client')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `services`
      - `id` (uuid, primary key)
      - `name_en` (text)
      - `name_ne` (text)
      - `description_en` (text)
      - `description_ne` (text)
      - `price` (integer)
      - `duration_minutes` (integer)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `service_id` (uuid, references services)
      - `consultation_type` (text: 'online' or 'physical')
      - `preferred_date` (date)
      - `preferred_time` (time)
      - `status` (text, default 'pending')
      - `payment_method` (text)
      - `payment_status` (text, default 'pending')
      - `transaction_id` (text)
      - `payment_screenshot_url` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (text, default 'unread')
      - `created_at` (timestamp)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title_en` (text)
      - `title_ne` (text)
      - `content_en` (text)
      - `content_ne` (text)
      - `excerpt_en` (text)
      - `excerpt_ne` (text)
      - `category` (text)
      - `featured_image_url` (text)
      - `is_published` (boolean, default false)
      - `is_featured` (boolean, default false)
      - `author_id` (uuid, references profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only policies for management operations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  role text DEFAULT 'client' CHECK (role IN ('client', 'admin', 'astrologer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_key text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_ne text NOT NULL,
  description_en text NOT NULL,
  description_ne text NOT NULL,
  detailed_description_en text,
  detailed_description_ne text,
  price integer NOT NULL,
  duration_minutes integer DEFAULT 45,
  features jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE RESTRICT,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  consultation_type text NOT NULL CHECK (consultation_type IN ('online', 'physical')),
  preferred_date date NOT NULL,
  preferred_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_method text CHECK (payment_method IN ('khalti', 'esewa', 'fonepay', 'later')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  transaction_id text,
  payment_screenshot_url text,
  notes text,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  admin_reply text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ne text NOT NULL,
  content_en text NOT NULL,
  content_ne text NOT NULL,
  excerpt_en text,
  excerpt_ne text,
  category text NOT NULL,
  category_ne text,
  featured_image_url text,
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Services policies
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contacts policies
CREATE POLICY "Anyone can create contacts"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all contacts"
  ON contacts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog posts policies
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default services
INSERT INTO services (service_key, name_en, name_ne, description_en, description_ne, detailed_description_en, detailed_description_ne, price, duration_minutes, features) VALUES
(
  'kundali',
  'Birth Chart Reading',
  'कुण्डली पढाइ',
  'Complete horoscope analysis and life predictions based on your birth chart',
  'तपाईंको जन्म कुण्डलीको आधारमा पूर्ण राशिफल विश्लेषण र जीवन भविष्यवाणी',
  'Get a comprehensive analysis of your birth chart with detailed predictions about your personality, career, relationships, health, and future prospects. Our expert astrologers use traditional Vedic astrology methods to provide accurate insights.',
  'तपाईंको व्यक्तित्व, करियर, सम्बन्ध, स्वास्थ्य र भविष्यका सम्भावनाहरूको बारेमा विस्तृत भविष्यवाणीसहित आफ्नो जन्म कुण्डलीको व्यापक विश्लेषण प्राप्त गर्नुहोस्। हाम्रा विशेषज्ञ ज्योतिषीहरूले सटीक अन्तर्दृष्टि प्रदान गर्न पारम्परिक वैदिक ज्योतिष विधिहरू प्रयोग गर्छन्।',
  2000,
  60,
  '[
    {"en": "Complete birth chart analysis", "ne": "पूर्ण जन्म कुण्डली विश्लेषण"},
    {"en": "Personality traits and characteristics", "ne": "व्यक्तित्व गुणहरू र विशेषताहरू"},
    {"en": "Career and profession guidance", "ne": "करियर र पेशा मार्गदर्शन"},
    {"en": "Relationship compatibility", "ne": "सम्बन्ध मेल"},
    {"en": "Health predictions and remedies", "ne": "स्वास्थ्य भविष्यवाणी र उपचार"},
    {"en": "Lucky numbers, colors, and gemstones", "ne": "भाग्यशाली संख्या, रंग र रत्न"},
    {"en": "Detailed written report", "ne": "विस्तृत लिखित रिपोर्ट"}
  ]'::jsonb
),
(
  'marriage',
  'Marriage Matching',
  'विवाह मिलान',
  'Traditional gun milan and compatibility analysis for perfect matches',
  'उत्तम मेलको लागि पारम्परिक गुण मिलान र मेल खोज विश्लेषण',
  'Ensure a harmonious and prosperous married life with our traditional gun milan service. We analyze the compatibility between partners using ancient Vedic methods to predict marital happiness and suggest remedies if needed.',
  'हाम्रो पारम्परिक गुण मिलान सेवाको साथ एक सामंजस्यपूर्ण र समृद्ध वैवाहिक जीवन सुनिश्चित गर्नुहोस्। हामी वैवाहिक खुशीको भविष्यवाणी गर्न र आवश्यक भएमा उपचारहरू सुझाउन पुरातन वैदिक विधिहरू प्रयोग गरेर साझेदारहरू बीचको मेलको विश्लेषण गर्छौं।',
  1500,
  45,
  '[
    {"en": "36-point gun milan analysis", "ne": "३६ बिन्दु गुण मिलान विश्लेषण"},
    {"en": "Mangal dosha check", "ne": "मंगल दोष जाँच"},
    {"en": "Compatibility percentage", "ne": "मेल प्रतिशत"},
    {"en": "Marital happiness prediction", "ne": "वैवाहिक खुशी भविष्यवाणी"},
    {"en": "Remedial measures for doshas", "ne": "दोषहरूको लागि उपचारात्मक उपायहरू"},
    {"en": "Auspicious wedding dates", "ne": "शुभ विवाह मितिहरू"},
    {"en": "Detailed compatibility report", "ne": "विस्तृत मेल रिपोर्ट"}
  ]'::jsonb
),
(
  'career',
  'Career Guidance',
  'करियर मार्गदर्शन',
  'Professional path guidance and business timing advice for success',
  'सफलताको लागि व्यावसायिक मार्ग मार्गदर्शन र व्यापार समय सल्लाह',
  'Discover your ideal career path and business opportunities with our comprehensive career guidance service. We analyze your birth chart to identify your natural talents, suitable professions, and the best timing for career changes or business ventures.',
  'हाम्रो व्यापक करियर मार्गदर्शन सेवाको साथ आफ्नो आदर्श करियर मार्ग र व्यापारिक अवसरहरू पत्ता लगाउनुहोस्। हामी तपाईंको प्राकृतिक प्रतिभा, उपयुक्त पेशाहरू, र करियर परिवर्तन वा व्यापारिक उद्यमहरूको लागि उत्तम समय पहिचान गर्न तपाईंको जन्म कुण्डलीको विश्लेषण गर्छौं।',
  1800,
  50,
  '[
    {"en": "Career aptitude analysis", "ne": "करियर योग्यता विश्लेषण"},
    {"en": "Suitable profession identification", "ne": "उपयुक्त पेशा पहिचान"},
    {"en": "Business timing guidance", "ne": "व्यापार समय मार्गदर्शन"},
    {"en": "Job change predictions", "ne": "जागिर परिवर्तन भविष्यवाणी"},
    {"en": "Financial growth prospects", "ne": "आर्थिक वृद्धि सम्भावनाहरू"},
    {"en": "Partnership compatibility", "ne": "साझेदारी मेल"},
    {"en": "Success timeline forecast", "ne": "सफलता समयरेखा पूर्वानुमान"}
  ]'::jsonb
),
(
  'health',
  'Health Predictions',
  'स्वास्थ्य भविष्यवाणी',
  'Health forecasts and remedial measures for wellness and longevity',
  'कल्याण र दीर्घायुको लागि स्वास्थ्य पूर्वानुमान र उपचारात्मक उपायहरू',
  'Maintain optimal health and prevent potential health issues with our detailed health predictions. We analyze planetary influences on your health and provide personalized remedies, dietary suggestions, and lifestyle recommendations.',
  'हाम्रो विस्तृत स्वास्थ्य भविष्यवाणीको साथ इष्टतम स्वास्थ्य कायम राख्नुहोस् र सम्भावित स्वास्थ्य समस्याहरू रोक्नुहोस्। हामी तपाईंको स्वास्थ्यमा ग्रहीय प्रभावहरूको विश्लेषण गर्छौं र व्यक्तिगत उपचार, आहार सुझावहरू, र जीवनशैली सिफारिसहरू प्रदान गर्छौं।',
  1500,
  45,
  '[
    {"en": "Health vulnerability analysis", "ne": "स्वास्थ्य जोखिम विश्लेषण"},
    {"en": "Disease prediction and prevention", "ne": "रोग भविष्यवाणी र रोकथाम"},
    {"en": "Dietary recommendations", "ne": "आहार सिफारिसहरू"},
    {"en": "Lifestyle modifications", "ne": "जीवनशैली परिमार्जनहरू"},
    {"en": "Healing gemstone suggestions", "ne": "निको पार्ने रत्न सुझावहरू"},
    {"en": "Yoga and meditation guidance", "ne": "योग र ध्यान मार्गदर्शन"},
    {"en": "Recovery timeline predictions", "ne": "रिकभरी समयरेखा भविष्यवाणी"}
  ]'::jsonb
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();