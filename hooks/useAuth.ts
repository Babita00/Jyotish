import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, api, Profile } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          const userProfile = await api.getProfile(session.user.id);
          if (mounted) setProfile(userProfile);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
        }
      }

      setLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          const userProfile = await api.getProfile(session.user.id);
          setProfile(userProfile);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone?: string
  ) => api.signUp(email, password, fullName, phone);

  const signIn = async (email: string, password: string) => {
    const data = await api.signIn(email, password);

    if (data?.session) {
      try {
        const userProfile = await api.getProfile(data.session.user.id);
        setProfile(userProfile);

        if (userProfile?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Failed to fetch profile after sign-in", err);
      }
    }

    return data;
  };

  const signOut = async () => {
    await api.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("No user logged in");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update profile");
    }

    const { profile: updatedProfile } = await response.json();
    setProfile(updatedProfile);
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
