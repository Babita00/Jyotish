"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { Eye, EyeOff, Mail, Lock, Star, ArrowRight } from "lucide-react";

export default function LoginForm() {
  const { currentLanguage } = useLanguage();
  const { signIn, profile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = currentLanguage === "ne" ? "इमेल आवश्यक छ" : "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = currentLanguage === "ne" ? "वैध इमेल प्रविष्ट गर्नुहोस्" : "Please enter a valid email";

    if (!formData.password) newErrors.password = currentLanguage === "ne" ? "पासवर्ड आवश्यक छ" : "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = currentLanguage === "ne" ? "पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ" : "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await signIn(formData.email, formData.password);

      if (data?.session) {
        toast({
          title: currentLanguage === "ne" ? "सफल!" : "Success!",
          description: currentLanguage === "ne" ? "सफलतापूर्वक लगइन भयो" : "Successfully logged in",
        });

        // Redirect logic
        const redirectTo = searchParams.get("redirectTo");
        if (redirectTo) router.replace(redirectTo);
        else if (profile?.role === "admin") router.replace("/admin");
        else router.replace("/");
      }
    } catch (error: any) {
      toast({
        title: currentLanguage === "ne" ? "त्रुटि" : "Error",
        description: error.message || (currentLanguage === "ne" ? "लगइन असफल भयो" : "Failed to login"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-purple-50 to-white">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <Star className="h-12 w-12 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {currentLanguage === "ne" ? "फेरि स्वागत छ" : "Welcome back"}
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            {currentLanguage === "ne" ? "लगइन गरेर आफ्नो ज्योतिष खाता पहुँच गर्नुहोस्" : "Sign in to access your astrology account"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{currentLanguage === "ne" ? "इमेल" : "Email"}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={currentLanguage === "ne" ? "तपाईंको इमेल" : "Your email"}
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{currentLanguage === "ne" ? "पासवर्ड" : "Password"}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={currentLanguage === "ne" ? "तपाईंको पासवर्ड" : "Your password"}
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-2">
              <Link href="/forgot-password" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                {currentLanguage === "ne" ? "पासवर्ड बिर्सनुभयो?" : "Forgot Password?"}
              </Link>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading
                ? currentLanguage === "ne" ? "लगइन गर्दै..." : "Signing in..."
                : currentLanguage === "ne" ? "लगइन" : "Sign In"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>

            {/* Register link */}
            <div className="text-center text-sm text-gray-600">
              {currentLanguage === "ne" ? "खाता छैन?" : "Don't have an account?"}{" "}
              <Link href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                {currentLanguage === "ne" ? "रजिस्टर गर्नुहोस्" : "Register"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
