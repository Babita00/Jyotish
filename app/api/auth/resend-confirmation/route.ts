import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Rate limiting for resend confirmation
const resendAttempts = new Map<string, { count: number; ts: number }>();
const RESEND_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_RESEND_ATTEMPTS = 3; // per window per email

function rateLimit(email: string): boolean {
  const now = Date.now();
  const rec = resendAttempts.get(email);
  if (!rec || now - rec.ts > RESEND_WINDOW_MS) {
    resendAttempts.set(email, { count: 1, ts: now });
    return true;
  }
  if (rec.count >= MAX_RESEND_ATTEMPTS) return false;
  rec.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limiting
    if (!rateLimit(normalizedEmail)) {
      return NextResponse.json(
        {
          error:
            "Too many confirmation emails sent. Please wait 15 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // Resend confirmation email
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: normalizedEmail,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      message: "Confirmation email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    console.error("Resend confirmation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

