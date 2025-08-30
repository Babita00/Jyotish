import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, CheckCircle, Star, Heart, Briefcase, Activity } from "lucide-react";

interface Service {
  service_key: string;
  name_en: string;
  name_ne: string;
  price: number;
}

interface PaymentStepProps {
  selectedService: Service | undefined;
  formData: {
    consultationType: string;
    paymentMethod: string;
    transactionId: string;
    paymentScreenshot: File | null;
  };
  handleInputChange: (field: string, value: any) => void;
  currentLanguage: string;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ selectedService, formData, handleInputChange, currentLanguage }) => {
  return (
    <div className="space-y-8">
      {selectedService && (
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {(() => {
                switch (selectedService.service_key) {
                  case "kundali": return <Star className="h-5 w-5 text-yellow-500" />;
                  case "marriage": return <Heart className="h-5 w-5 text-pink-500" />;
                  case "career": return <Briefcase className="h-5 w-5 text-blue-500" />;
                  case "health": return <Activity className="h-5 w-5 text-green-500" />;
                  default: return <Star className="h-5 w-5 text-gray-500" />;
                }
              })()}
              <span className={`text-xl font-semibold ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
                {currentLanguage === "ne" ? selectedService.name_ne : selectedService.name_en}
              </span>
            </div>
            <span className="text-3xl font-bold text-green-600">Rs. {selectedService.price}</span>
          </CardContent>
        </Card>
      )}

      <div>
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => handleInputChange("paymentMethod", value)}
          className="mt-4 space-y-4"
        >
          {["khalti", "esewa", "fonepay"].map((method) => (
            <div key={method} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={method} id={method} />
              <label htmlFor={method} className="text-lg cursor-pointer">{method}</label>
            </div>
          ))}
          {formData.consultationType === "physical" && (
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="later" id="later" />
              <label htmlFor="later" className={`text-lg cursor-pointer ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
                {currentLanguage === "ne" ? "भौतिक भेटमा भुक्तानी गर्नेछु" : "Pay during physical visit"}
              </label>
            </div>
          )}
        </RadioGroup>
      </div>

      {formData.paymentMethod && !["later"].includes(formData.paymentMethod) && (
        <div className="space-y-6">
          <div>
            <input
              type="text"
              placeholder={currentLanguage === "ne" ? "Transaction ID प्रविष्ट गर्नुहोस्" : "Enter transaction ID"}
              value={formData.transactionId}
              onChange={(e) => handleInputChange("transactionId", e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CreditCard className="w-10 h-10 mb-4 text-gray-500" />
                <p>{currentLanguage === "ne" ? "स्क्रिनसट अपलोड गर्नुहोस्" : "Upload screenshot"}</p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleInputChange("paymentScreenshot", e.target.files?.[0] || null)}
                accept="image/*"
              />
            </label>
            {formData.paymentScreenshot && <p className="text-sm text-green-600 mt-2 font-semibold">✓ {formData.paymentScreenshot.name}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
