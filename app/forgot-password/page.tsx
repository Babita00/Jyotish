"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageProvider";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      return currentLanguage === "ne" ? "इमेल आवश्यक छ" : "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      return currentLanguage === "ne"
        ? "वैध इमेल प्रविष्ट गर्नुहोस्"
        : "Please enter a valid email";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validation = validateEmail(email);
    if (validation) {
      setError(validation);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(
          currentLanguage === "ne"
            ? "यदि यो इमेल दर्ता छ भने, पासवर्ड रिसेट लिंक पठाइएको छ।"
            : "If this email is registered, a password reset link has been sent."
        );
        setEmail("");
      } else {
        setError(
          data.error ||
            (currentLanguage === "ne"
              ? "केही गलत भयो"
              : "Something went wrong")
        );
      }
    } catch (err: any) {
      setError(
        err.message ||
          (currentLanguage === "ne"
            ? "सर्भर त्रुटि"
            : "Server error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-purple-50 to-white">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <Mail className="h-12 w-12 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {currentLanguage === "ne" ? "पासवर्ड बिर्सनुभयो?" : "Forgot Password?"}
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            {currentLanguage === "ne"
              ? "तपाईंको इमेल प्रविष्ट गर्नुहोस् र हामी रिसेट लिंक पठाउनेछौं"
              : "Enter your email and we'll send you a reset link"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">
                {currentLanguage === "ne" ? "इमेल" : "Email"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    currentLanguage === "ne" ? "तपाईंको इमेल" : "Your email"
                  }
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading
                ? currentLanguage === "ne"
                  ? "पठाउँदै..."
                  : "Sending..."
                : currentLanguage === "ne"
                ? "लिंक पठाउनुहोस्"
                : "Send Link"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
            <div className="text-center text-sm text-gray-600">
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentLanguage === "ne" ? "लगइनमा फर्कनुहोस्" : "Back to Login"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
