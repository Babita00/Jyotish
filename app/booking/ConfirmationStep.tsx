import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmationStepProps {
  currentLanguage: string;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ currentLanguage }) => {
  return (
    <div className="text-center py-12">
      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
      <h2 className={`text-3xl font-bold mb-6 text-gray-900 ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
        {currentLanguage === "ne" ? "बुकिङ सफल!" : "Booking Successful!"}
      </h2>
      <p className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
        {currentLanguage === "ne"
          ? "तपाईंको परामर्श बुकिङ सफलतापूर्वक पेश गरिएको छ। हामी २४ घण्टा भित्र सम्पर्क गर्नेछौं।"
          : "Your consultation booking has been submitted successfully. We will contact you within 24 hours."}
      </p>
      <Button onClick={() => (window.location.href = "/")} size="lg" className={`bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-lg ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
        {currentLanguage === "ne" ? "होम पेजमा फर्कनुहोस्" : "Return to Home"}
      </Button>
    </div>
  );
};
