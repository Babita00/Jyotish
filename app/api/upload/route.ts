import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { parse, format, isValid as isValidDate } from "date-fns";

// --- Utilities ---
function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeTime(input: string): string {
  try {
    const parsed = parse(input, "hh:mm a", new Date());
    if (isValidDate(parsed)) return format(parsed, "HH:mm:ss");
  } catch {}
  return input;
}

function isISODate(input: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(input);
}

function isHHMMSS(input: string): boolean {
  return /^\d{2}:\d{2}:\d{2}$/.test(input);
}

// --- Route ---
export async function POST(request: NextRequest) {
  try {
    // --- Auth ---
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // --- Supabase client with anon key + JWT ---
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    // --- Verify user ---
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // --- Parse request body ---
    const body = await request.json();

    const requiredFields = [
      "full_name",
      "phone",
      "email",
      "service_id",
      "consultation_type",
      "preferred_date",
      "preferred_time",
      "payment_method",
    ] as const;

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!isValidEmail(String(body.email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // --- Validate payment_method ---
    const validPaymentMethods = [
      "later",
      "khalti",
      "esewa",
      "fonepay",
    ] as const;
    if (!validPaymentMethods.includes(body.payment_method)) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }
    const paymentMethod = body.payment_method as
      | "later"
      | "khalti"
      | "esewa"
      | "fonepay";

    // --- Validate consultation_type ---
    const validConsultationTypes = ["online", "physical"] as const;
    if (!validConsultationTypes.includes(body.consultation_type)) {
      return NextResponse.json(
        { error: "Invalid consultation type" },
        { status: 400 }
      );
    }

    // --- Date & Time ---
    const preferredDate = sanitizeString(body.preferred_date);
    if (!isISODate(preferredDate)) {
      return NextResponse.json(
        { error: "preferred_date must be yyyy-MM-dd" },
        { status: 400 }
      );
    }

    const normalizedTime = normalizeTime(String(body.preferred_time));
    if (!isHHMMSS(normalizedTime)) {
      return NextResponse.json(
        { error: "preferred_time must be HH:mm:ss" },
        { status: 400 }
      );
    }

    // --- Handle optional payment fields ---
    const transactionId =
      paymentMethod === "later"
        ? null
        : body.transaction_id
        ? sanitizeString(body.transaction_id)
        : null;

    const paymentScreenshotUrl =
      paymentMethod === "later"
        ? null
        : body.payment_screenshot_url
        ? sanitizeString(body.payment_screenshot_url)
        : null;

    if (paymentMethod !== "later" && !transactionId) {
      return NextResponse.json(
        {
          error:
            "transaction_id is required when payment_method is not 'later'",
        },
        { status: 400 }
      );
    }

    // --- Build booking payload ---
    const bookingPayload = {
      service_id: String(body.service_id),
      full_name: sanitizeString(body.full_name),
      phone: sanitizeString(body.phone),
      email: String(body.email).toLowerCase().trim(),
      consultation_type: body.consultation_type as "online" | "physical",
      preferred_date: preferredDate,
      preferred_time: normalizedTime,
      payment_method: paymentMethod,
      transaction_id: transactionId,
      payment_screenshot_url: paymentScreenshotUrl,
      notes: body.notes ? sanitizeString(body.notes) : "",
      user_id: user.id, // ✅ must match auth.uid()
    };

    // --- Insert booking directly ---
    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingPayload])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating booking:", error?.message ?? error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to create booking" },
      { status: 500 }
    );
  }
}
