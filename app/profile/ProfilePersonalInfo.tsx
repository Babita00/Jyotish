import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, User } from "lucide-react";

export default function ProfilePersonalInfo({ 
  isEditing, editForm, setEditForm, profile, user, t, currentLanguage 
}: any) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <User className="h-5 w-5" />
        {t("profile.personal_info")}
      </h4>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <Label htmlFor="full_name">{t("profile.full_name")}</Label>
          {isEditing ? (
            <Input
              id="full_name"
              value={editForm.full_name}
              onChange={(e) => setEditForm((prev: any) => ({ ...prev, full_name: e.target.value }))}
            />
          ) : (
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>{profile?.full_name || user.user_metadata?.full_name || "-"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">{t("profile.phone")}</Label>
          {isEditing ? (
            <Input
              id="phone"
              value={editForm.phone}
              onChange={(e) => setEditForm((prev: any) => ({ ...prev, phone: e.target.value }))}
              type="tel"
            />
          ) : (
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{profile?.phone || user.user_metadata?.phone || "-"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <Label htmlFor="email">{t("profile.email")}</Label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{user.email}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {currentLanguage === "ne" ? "सत्यापित" : "Verified"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
