import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoStepProps {
  formData: { name: string; phone: string; email: string };
  handleInputChange: (field: string, value: string) => void;
  currentLanguage: string;
  t: (key: string) => string;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  handleInputChange,
  currentLanguage,
  t,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className={`text-lg font-semibold ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
          {t("booking.name")} *
        </Label>
        <Input
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="mt-2 h-12 text-lg"
          placeholder={currentLanguage === "ne" ? "तपाईंको पूरा नाम" : "Your full name"}
        />
      </div>
      <div>
        <Label className={`text-lg font-semibold ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
          {t("booking.phone")} *
        </Label>
        <Input
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="mt-2 h-12 text-lg"
          placeholder="+977 98XXXXXXXX"
        />
      </div>
      <div>
        <Label className={`text-lg font-semibold ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
          {t("booking.email")} *
        </Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="mt-2 h-12 text-lg"
          placeholder="your.email@example.com"
        />
      </div>
    </div>
  );
};
