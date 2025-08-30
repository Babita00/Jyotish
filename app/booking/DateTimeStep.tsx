import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

interface DateTimeStepProps {
  formData: { date: Date | null; time: string };
  handleInputChange: (field: string, value: any) => void;
  currentLanguage: string;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({ formData, handleInputChange, currentLanguage }) => {
  const timeSlots = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];
  return (
    <div className="space-y-8">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal mt-4 h-12 text-lg">
              <CalendarIcon className="mr-3 h-5 w-5" />
              {formData.date ? format(formData.date, "PPP") : currentLanguage === "ne" ? "मिति छान्नुहोस्" : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.date || undefined}
              onSelect={(date) => handleInputChange("date", date)}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant={formData.time === time ? "default" : "outline"}
            className={`h-12 ${formData.time === time ? "bg-indigo-600" : ""}`}
            onClick={() => handleInputChange("time", time)}
          >
            <Clock className="mr-2 h-4 w-4" />
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};
