"use client";

import { useAuth } from "@/hooks/useAuth";  // adjust path if different
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AdminProtectedRoute({ children }: Props) {
  const { user, profile, loading } = useAuth();

  // wait until auth finishes loading
  if (loading) {
    return <div className="p-4">Loading authentication...</div>;
  }

  // no user
  if (!user) {
    return <div className="p-4 text-red-500">Please login</div>;
  }

  // user is not admin
  if (profile?.role !== "admin") {
    return <div className="p-4 text-red-500">Admin access required</div>;
  }

  // user is admin -> show content
  return <>{children}</>;
}
