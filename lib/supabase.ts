import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createPagesBrowserClient();

// Database types
export interface Profile {
  id: string;
  full_name: string;
  phone?: string;
  role: "client" | "admin" | "astrologer";
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  service_key: string;
  name_en: string;
  name_ne: string;
  description_en: string;
  description_ne: string;
  detailed_description_en?: string;
  detailed_description_ne?: string;
  price: number;
  duration_minutes: number;
  features: Array<{ en: string; ne: string }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id?: string;
  service_id: string;
  full_name: string;
  phone: string;
  email: string;
  consultation_type: "online" | "physical";
  preferred_date: string;
  preferred_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_method?: "khalti" | "esewa" | "fonepay" | "later";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  transaction_id?: string;
  payment_screenshot_url?: string;
  notes?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  service?: Service;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  admin_reply?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title_en: string;
  title_ne: string;
  content_en: string;
  content_ne: string;
  excerpt_en?: string;
  excerpt_ne?: string;
  category: string;
  category_ne?: string;
  featured_image_url?: string;
  is_published: boolean;
  is_featured: boolean;
  author_id?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface DailyHoroscope {
  id: string;
  date: string;
  zodiac_sign: string;
  content_en: string;
  content_ne: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// API functions
export const api = {
  // Services
  async getServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("created_at");

    if (error) throw error;
    return data || [];
  },

  async getService(serviceKey: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("service_key", serviceKey)
      .eq("is_active", true)
      .single();

    if (error) return null;
    return data;
  },

  // Bookings
  async createBooking(
    booking: Omit<
      Booking,
      "id" | "created_at" | "updated_at" | "status" | "payment_status"
    >
  ): Promise<Booking> {
    const { data, error } = await supabase
      .from("bookings")
      .insert([booking])
      .select("*, service:services(*)")
      .single();

    if (error) throw error;
    return data;
  },

  async getBookings(userId?: string): Promise<Booking[]> {
    let query = supabase.from("bookings").select("*, service:services(*)");

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  },

  async updateBookingStatus(
    bookingId: string,
    status: Booking["status"],
    adminNotes?: string
  ): Promise<void> {
    const updateData: any = { status };
    if (adminNotes) updateData.admin_notes = adminNotes;

    const { error } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", bookingId);

    if (error) throw error;
  },

  async updatePaymentStatus(
    bookingId: string,
    paymentStatus: Booking["payment_status"]
  ): Promise<void> {
    const { error } = await supabase
      .from("bookings")
      .update({ payment_status: paymentStatus })
      .eq("id", bookingId);

    if (error) throw error;
  },

  // Contacts
  async createContact(
    contact: Omit<Contact, "id" | "created_at" | "updated_at" | "status">
  ): Promise<Contact> {
    const { data, error } = await supabase
      .from("contacts")
      .insert([contact])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getContacts(): Promise<Contact[]> {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateContactStatus(
    contactId: string,
    status: Contact["status"],
    adminReply?: string
  ): Promise<void> {
    const updateData: any = { status };
    if (adminReply) updateData.admin_reply = adminReply;

    const { error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", contactId);

    if (error) throw error;
  },

  // Blog Posts
  // async getBlogPosts(published = true): Promise<BlogPost[]> {
  //   let query = supabase.from("blog_posts").select("*");

  //   if (published) {
  //     query = query.eq("is_published", true);
  //   }

  //   const { data, error } = await query.order("created_at", {
  //     ascending: false,
  //   });

  //   if (error) throw error;
  //   return data || [];
  // },

  // async createBlogPost(
  //   post: Omit<BlogPost, "id" | "created_at" | "updated_at" | "view_count">
  // ): Promise<BlogPost> {
  //   const { data, error } = await supabase
  //     .from("blog_posts")
  //     .insert([post])
  //     .select()
  //     .single();

  //   if (error) throw error;
  //   return data;
  // },

  // async updateBlogPost(
  //   postId: string,
  //   updates: Partial<BlogPost>
  // ): Promise<void> {
  //   const { error } = await supabase
  //     .from("blog_posts")
  //     .update(updates)
  //     .eq("id", postId);

  //   if (error) throw error;
  // },

  // Daily Horoscopes
  async getHoroscopes(published = true): Promise<DailyHoroscope[]> {
    let query = supabase.from("daily_horoscopes").select("*");

    if (published) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query.order("date", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createHoroscope(
    horoscope: Omit<DailyHoroscope, "id" | "created_at" | "updated_at">
  ): Promise<DailyHoroscope> {
    const { data, error } = await supabase
      .from("daily_horoscopes")
      .insert([horoscope])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateHoroscope(
    horoscopeId: string,
    updates: Partial<DailyHoroscope>
  ): Promise<void> {
    const { error } = await supabase
      .from("daily_horoscopes")
      .update(updates)
      .eq("id", horoscopeId);

    if (error) throw error;
  },

  async deleteHoroscope(horoscopeId: string): Promise<void> {
    const { error } = await supabase
      .from("daily_horoscopes")
      .delete()
      .eq("id", horoscopeId);

    if (error) throw error;
  },

  // File Upload
  async uploadFile(file: File, bucket: string, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    return publicUrl;
  },

  // Authentication
  async signUp(
    email: string,
    password: string,
    fullName: string,
    phone?: string
  ) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone: phone || null } },
    });

    if (authError) throw authError;

    // Insert into profiles
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: fullName,
        phone: phone || null,
        role: "client", // default role
      });

      if (profileError) throw profileError;
    }

    return authData;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) return null;
    return data;
  },

  async updateProfile(
    userId: string,
    updates: Partial<Profile>
  ): Promise<void> {
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
  },
};
