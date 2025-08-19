import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/supabase"; // still using api, but better if named bookingApi or bookingClient
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Utility: sanitize input (trim + collapse spaces)
function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim();
}

// Utility: check if an email is valid format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Required fields for a booking
    const requiredFields = [
      "full_name",
      "phone",
      "email",
      "service_id",
      "consultation_type",
      "preferred_date",
      "preferred_time",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!isValidEmail(String(body.email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Create booking in Supabase (via api wrapper)
    const booking = await api.createBooking({
      service_id: String(body.service_id),
      full_name: sanitizeString(body.full_name),
      phone: sanitizeString(body.phone),
      email: String(body.email).toLowerCase().trim(),
      consultation_type: body.consultation_type,
      preferred_date: sanitizeString(body.preferred_date),
      preferred_time: sanitizeString(body.preferred_time),
      payment_method: body.payment_method,
      transaction_id: sanitizeString(body.transaction_id),
      payment_screenshot_url: sanitizeString(body.payment_screenshot_url),
      notes: sanitizeString(body.notes),
      user_id: session.user.id,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all bookings for this user
    const bookings = await api.getBookings(session.user.id);

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
