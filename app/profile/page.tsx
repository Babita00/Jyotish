"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Edit3, Save, X, CheckCircle, AlertCircle } from "lucide-react";

import ProfileLoading from "./ProfileLoading";
import ProfileAuthRequired from "./ProfileAuthRequired";
import ProfileHeader from "./ProfileHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import ProfileAccountDetails from "./ProfileAccountDetails";
import ProfileStats from "./ProfileStats";

export default function ProfilePage() {
  const { user, profile, updateProfile, loading } = useAuth();
  const { t, currentLanguage } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [editForm, setEditForm] = useState({ full_name: "", phone: "" });

  useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
      });
    } else if (user?.user_metadata) {
      setEditForm({
        full_name: user.user_metadata.full_name || "",
        phone: user.user_metadata.phone || "",
      });
    }
  }, [profile, user]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form when canceling
      setEditForm({
        full_name: profile?.full_name || user?.user_metadata?.full_name || "",
        phone: profile?.phone || user?.user_metadata?.phone || "",
      });
    }
    setIsEditing(!isEditing);
    setUpdateMessage(null);
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      await updateProfile({
        full_name: editForm.full_name,
        phone: editForm.phone || undefined,
      });

      setIsEditing(false);
      setUpdateMessage({
        type: "success",
        message: t("profile.profile_updated"),
      });

      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setUpdateMessage({
        type: "error",
        message: t("profile.update_error"),
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <ProfileLoading />;
  if (!user) return <ProfileAuthRequired />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="container mx-auto px-4 space-y-6">
        {/* Page Header */}
        <ProfileHeader currentLanguage={currentLanguage} />

        {/* Avatar + Name + Role */}
        {/* <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <ProfileAvatar user={user} profile={profile} />
            <h2 className="text-xl font-semibold mt-2">
              {profile?.full_name || user.user_metadata?.full_name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </CardContent>
        </Card> */}

        {/* Personal Info Section */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>{t("profile.personal_info")}</CardTitle>
            </div>
            <div className="flex items-center ">
              <Button
                variant={isEditing ? "ghost" : "outline"}
                size="sm"
                onClick={handleEditToggle}
                disabled={isUpdating}
              >
                {isEditing ? <X /> : <Edit3 />}

                              <CardDescription>
                {isEditing
                  ? t("profile.cancel")
                  : t("profile.edit_profile")}
              </CardDescription>
              </Button>

            </div>
          </CardHeader>
          <CardContent>
            <ProfilePersonalInfo
              isEditing={isEditing}
              editForm={editForm}
              setEditForm={setEditForm}
              profile={profile}
              user={user}
              t={t}
              currentLanguage={currentLanguage}
            />

            {isEditing && (
              <Button
                onClick={handleSaveChanges}
                className="w-full mt-4"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Save className="mr-2 animate-spin" />
                    {t("profile.saving")}
                  </>
                ) : (
                  <>
                    <Save className="mr-2" />
                    {t("profile.save_changes")}
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Account Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.account_details")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileAccountDetails
              profile={profile}
              user={user}
              currentLanguage={currentLanguage}
            />
          </CardContent>
        </Card>

        {/* Stats Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.account_statistics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileStats currentLanguage={currentLanguage} />
          </CardContent>
        </Card>

        {/* Update Message */}
        {updateMessage && (
          <div
            className={`mt-4 flex items-center space-x-2 p-2 rounded-md ${
              updateMessage.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {updateMessage.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{updateMessage.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
