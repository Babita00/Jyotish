// app/booking/page.tsx
import { Suspense } from "react";
import BookingPage from "./BookingPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPage />
    </Suspense>
  );
}
