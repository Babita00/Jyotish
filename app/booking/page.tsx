"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { useToast } from "@/hooks/use-toast";
import { api, Service, supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { parse, format } from "date-fns";
import { ProgressBar } from "./ProgressBar";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { ServiceSelectionStep } from "./ServiceSelectionStep";
import { DateTimeStep } from "./DateTimeStep";
import { PaymentStep } from "./PaymentStep";
import { ConfirmationStep } from "./ConfirmationStep";

export default function BookingPage() {
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    email: "",
    service: preSelectedService || "",
    customService: "",
    consultationType: "",
    date: null as Date | null,
    time: "",
    paymentMethod: "",
    transactionId: "",
    paymentScreenshot: null as File | null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const servicesData = await api.getServices();
      setServices(servicesData);
    };
    fetchServices();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.phone && formData.email;
      case 2:
        if (!formData.consultationType || !formData.service) return false;
        if (formData.service === "other")
          return Boolean(formData.customService?.trim());
        return true;
      case 3:
        return formData.date && formData.time;
      case 4:
        if (formData.paymentMethod === "later") return true;
        return (
          formData.paymentMethod &&
          formData.transactionId &&
          formData.paymentScreenshot
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep((prev) => prev + 1);
    else
      toast({
        title: currentLanguage === "ne" ? "त्रुटि" : "Error",
        description:
          currentLanguage === "ne"
            ? "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्"
            : "Please fill all required fields",
        variant: "destructive",
      });
  };

  const uploadPaymentScreenshot = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("bucket", "payment-screenshots");
    const response = await fetch("/api/upload", { method: "POST", body: form });
    if (!response.ok) throw new Error("Failed to upload screenshot");
    return (await response.json()).url;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let paymentScreenshotUrl = "";
      if (formData.paymentMethod !== "later" && formData.paymentScreenshot) {
        paymentScreenshotUrl = await uploadPaymentScreenshot(
          formData.paymentScreenshot
        );
      }

      // ✅ Format date and time for Postgres
      const formattedDate = formData.date
        ? format(formData.date, "yyyy-MM-dd")
        : "";

      const formattedTime = formData.time
        ? format(parse(formData.time, "hh:mm a", new Date()), "HH:mm:ss")
        : "";

      // ✅ Get service id (UUID) from services list
      const selectedService = services.find(
        (s) => s.service_key === formData.service
      );

      // ✅ Get logged-in user id (for RLS check)
      const session = (await supabase.auth.getSession()).data.session;
      const userId = session?.user?.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const bookingData = {
        user_id: userId, // ✅ Required for RLS
        service_id: selectedService?.id || "", // Must be UUID, not "marriage"
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        consultation_type: formData.consultationType,
        preferred_date: formattedDate,
        preferred_time: formattedTime,
        payment_method: formData.paymentMethod,
        transaction_id:
          formData.paymentMethod === "later" ? null : formData.transactionId,
        payment_screenshot_url:
          formData.paymentMethod === "later" ? null : paymentScreenshotUrl,
        notes:
          formData.service === "other" && formData.customService
            ? `Custom service: ${formData.customService}`
            : "",
      };

      console.log("Booking data:", bookingData);

      const token = session?.access_token;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ ensures Supabase sees the user
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error("Failed to create booking");

      toast({
        title: currentLanguage === "ne" ? "सफल!" : "Success!",
        description:
          currentLanguage === "ne"
            ? "तपाईंको बुकिङ सफलतापूर्वक पेश गरिएको छ। हामी चाँडै सम्पर्क गर्नेछौं।"
            : "Your booking has been submitted successfully. We will contact you soon.",
      });
      setCurrentStep(5);
    } catch (error) {
      toast({
        title: currentLanguage === "ne" ? "त्रुटि" : "Error",
        description:
          currentLanguage === "ne"
            ? "बुकिङ पेश गर्न समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।"
            : "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(
    (s) => s.service_key === formData.service
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <ProgressBar currentStep={currentStep} totalSteps={4} />

            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle
                  className={`text-2xl text-center ${
                    currentLanguage === "ne" ? "font-nepali" : ""
                  }`}
                >
                  {
                    [
                      "",
                      "Personal Information",
                      "Service Selection",
                      "Date & Time",
                      "Payment",
                      "Confirmation",
                    ][currentStep]
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {currentStep === 1 && (
                  <PersonalInfoStep
                    formData={formData}
                    handleInputChange={handleInputChange}
                    currentLanguage={currentLanguage}
                    t={t}
                  />
                )}
                {currentStep === 2 && (
                  <ServiceSelectionStep
                    services={services}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    currentLanguage={currentLanguage}
                  />
                )}
                {currentStep === 3 && (
                  <DateTimeStep
                    formData={formData}
                    handleInputChange={handleInputChange}
                    currentLanguage={currentLanguage}
                  />
                )}
                {currentStep === 4 && (
                  <PaymentStep
                    selectedService={selectedService}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    currentLanguage={currentLanguage}
                  />
                )}
                {currentStep === 5 && (
                  <ConfirmationStep currentLanguage={currentLanguage} />
                )}

                {currentStep < 5 && (
                  <div className="flex justify-between mt-10 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      disabled={currentStep === 1}
                      size="lg"
                    >
                      {currentLanguage === "ne" ? "पछाडि" : "Previous"}
                    </Button>
                    {currentStep < 4 ? (
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        {currentLanguage === "ne" ? "अगाडि" : "Next"}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        size="lg"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting
                          ? currentLanguage === "ne"
                            ? "पेश गर्दै..."
                            : "Submitting..."
                          : currentLanguage === "ne"
                          ? "पेश गर्नुहोस्"
                          : "Submit"}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
