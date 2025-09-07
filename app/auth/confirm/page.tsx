// app/auth/confirm/page.tsx
import { Suspense } from "react";
import ConfirmEmailPage from "@/components/ConfirmEmailPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmailPage />
    </Suspense>
  );
}
