import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Star, Heart, Briefcase, Activity, Type, Phone, Video, MapPin } from "lucide-react";

interface Service {
  service_key: string;
  name_en: string;
  name_ne: string;
  price: number;
}

interface ServiceSelectionStepProps {
  services: Service[];
  formData: {
    service: string;
    customService: string;
    consultationType: string;
  };
  handleInputChange: (field: string, value: any) => void;
  currentLanguage: string;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  services,
  formData,
  handleInputChange,
  currentLanguage,
}) => {
  const getServiceIcon = (serviceKey: string) => {
  switch (serviceKey) {
    case "all-services":
      return <Star className="h-5 w-5 text-yellow-500" />;
    case "marriage":
      return <Heart className="h-5 w-5 text-pink-500" />;
    case "career":
      return <Briefcase className="h-5 w-5 text-blue-500" />;
    case "health":
      return <Activity className="h-5 w-5 text-green-500" />;
    case "vastu":
      return <Type className="h-5 w-5 text-purple-500" />;
    case "karmakanda":
      return <Phone className="h-5 w-5 text-orange-500" />;
    case "kundali-creation":
      return <Video className="h-5 w-5 text-indigo-500" />;
    case "gemstone":
      return <MapPin className="h-5 w-5 text-emerald-500" />;
    default:
      return <Star className="h-5 w-5 text-gray-500" />;
  }
};


  return (
    <div className="space-y-8">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {services.map((service) => (
            <Card
              key={service.service_key}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                formData.service === service.service_key
                  ? "ring-2 ring-indigo-500 bg-indigo-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleInputChange("service", service.service_key)}
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {getServiceIcon(service.service_key)}
                  <div>
                    <h3 className={`font-semibold ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
                      {currentLanguage === "ne" ? service.name_ne : service.name_en}
                    </h3>
                    <p className="text-green-600 font-bold">Rs. {service.price}</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    formData.service === service.service_key ? "bg-indigo-500 border-indigo-500" : "border-gray-300"
                  }`}
                >
                  {formData.service === service.service_key && <CheckCircle className="w-5 h-5 text-white" />}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Other service */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              formData.service === "other" ? "ring-2 ring-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
            }`}
            onClick={() => handleInputChange("service", "other")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full bg-gray-300" />
                  <div>
                    <h3 className={`font-semibold ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
                      {currentLanguage === "ne" ? "अन्य सेवा (आफ्नै लेख्नुहोस्)" : "Other Service (write your own)"}
                    </h3>
                    <p className="text-gray-600">
                      {currentLanguage === "ne"
                        ? "कृपया तल विवरण लेख्नुहोस्"
                        : "Please describe the service below"}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    formData.service === "other" ? "bg-indigo-500 border-indigo-500" : "border-gray-300"
                  }`}
                >
                  {formData.service === "other" && <CheckCircle className="w-5 h-5 text-white" />}
                </div>
              </div>
              {formData.service === "other" && (
                <div className="mt-4">
                  <input
                    value={formData.customService}
                    onChange={(e) => handleInputChange("customService", e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder={currentLanguage === "ne" ? "उदाहरण: मुहूर्त परामर्श" : "e.g., Muhurat consultation"}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <RadioGroup
          value={formData.consultationType}
          onValueChange={(value) => handleInputChange("consultationType", value)}
          className="mt-4 space-y-4"
        >
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="online" id="online" />
            <label htmlFor="online" className={`text-lg cursor-pointer ${currentLanguage === "ne" ? "font-nepali" : ""}`}>
              Online
            </label>
          </div>
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="physical" id="physical" />
            <label
              htmlFor="physical"
              className={`text-lg cursor-pointer ${currentLanguage === "ne" ? "font-nepali" : ""}`}
            >
              Physical
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
