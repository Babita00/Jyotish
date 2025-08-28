// app/profile/ProfileAvatar.tsx
"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Helper to display role text
const getRoleDisplay = (role: string) => {
  switch (role) {
    case "admin":
      return "Admin";
    case "coach":
      return "Coach";
    case "athlete":
      return "Athlete";
    default:
      return "Client";
  }
};

// Helper to set badge color variant
const getRoleBadgeVariant = (role: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (role) {
    case "admin":
      return "destructive"; // red
    case "coach":
      return "secondary"; // gray
    case "athlete":
      return "default"; // primary
    default:
      return "outline"; // neutral
  }
};

export default function ProfileAvatar({ user, profile }: any) {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <Avatar className="h-20 w-20">
        <AvatarFallback>
          {profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h2 className="mt-3 text-xl font-semibold">
        {profile?.full_name || user?.user_metadata?.full_name || "Unnamed User"}
      </h2>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-2">
        <Badge variant={getRoleBadgeVariant(profile?.role || "client")}>
          {getRoleDisplay(profile?.role || "client")}
        </Badge>
      </div>
    </div>
  );
}
