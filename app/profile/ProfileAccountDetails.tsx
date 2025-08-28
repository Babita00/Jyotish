import { Label } from "@/components/ui/label";
import { Calendar, Clock, Shield } from "lucide-react";

export default function ProfileAccountDetails({ profile, user, currentLanguage }: any) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === "ne" ? "ne-NP" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5" />
        {currentLanguage === "ne" ? "खाता विवरण" : "Account Details"}
      </h4>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label className="text-sm font-medium text-gray-700">
            {currentLanguage === "ne" ? "सदस्य भएको मिति" : "Member Since"}
          </Label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{user?.created_at ? formatDate(user.created_at) : "-"}</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">
            {currentLanguage === "ne" ? "अन्तिम अपडेट" : "Last Updated"}
          </Label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{profile?.updated_at ? formatDate(profile.updated_at) : "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
