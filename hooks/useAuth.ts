import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, api, Profile } from "@/lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const userProfile = await api.getProfile(session.user.id);
        setProfile(userProfile);
      }

      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const userProfile = await api.getProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone?: string
  ) => {
    const data = await api.signUp(email, password, fullName, phone);
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const data = await api.signIn(email, password);
    return data;
  };

  const signOut = async () => {
    await api.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("No user logged in");

    try {
      // get current session token from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`, // 👈 add this
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const { profile: updatedProfile } = await response.json();
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAdmin: profile?.role === "admin",
    isAuthenticated: !!user,
  };
}
