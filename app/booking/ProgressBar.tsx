import React from "react";
import { CheckCircle } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar px-2 py-1">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                currentStep >= step ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
            </div>
            {step < totalSteps && (
              <div
                className={`w-10 sm:w-16 h-1 rounded ${
                  currentStep > step ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
