"use client";

import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { LanguageProvider } from "@/components/LanguageProvider";
import { DrawerProvider } from "@/context/DrawerContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <LanguageProvider>
        <DrawerProvider>
          {children}
          <Toaster />
        </DrawerProvider>
      </LanguageProvider>
    </SessionContextProvider>
  );
}
