import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

function s(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim();
}

interface BookingRouteContext {
  params: Promise<{ id: string }>; // <- matches Next.js generated type
}

export async function PATCH(
  request: NextRequest,
  context: BookingRouteContext
) {
  const resolvedParams = await context.params;
  const bookingId = resolvedParams.id;

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (body.status) {
    await api.updateBookingStatus(
      bookingId,
      s(body.status) as any,
      s(body.admin_notes)
    );
  }

  if (body.payment_status) {
    await api.updatePaymentStatus(bookingId, s(body.payment_status) as any);
  }

  return NextResponse.json({ success: true });
}
