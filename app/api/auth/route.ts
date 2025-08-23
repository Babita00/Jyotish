import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter for signin/signup
const attempts = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 10; // per window per IP

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  return request.headers.get("user-agent") || "unknown";
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    attempts.set(ip, { count: 1, ts: now });
    return true;
  }
  if (rec.count >= MAX_ATTEMPTS) return false;
  rec.count += 1;
  return true;
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function s(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim();
}

export async function POST(request: NextRequest) {
  const { email, password, action, fullName, phone } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  try {
    if (action === "signup") {
      const ip = getClientIp(request);
      if (!rateLimit(ip)) {
        return NextResponse.json(
          { error: "Too many attempts. Try again later." },
          { status: 429 }
        );
      }

      const e = s(email).toLowerCase();
      const p = String(password || "");
      const name = s(fullName);
      const ph = s(phone || "");

      if (!validEmail(e))
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
      if (p.length < 8)
        return NextResponse.json(
          { error: "Password must be at least 8 characters" },
          { status: 400 }
        );
      if (!name)
        return NextResponse.json(
          { error: "Full name is required" },
          { status: 400 }
        );

      const { data, error } = await supabase.auth.signUp({
        email: e,
        password: p,
        options: {
          data: { full_name: name, phone: ph || null },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
        },
      });

      if (error) {
        const status = error.message?.toLowerCase().includes("already")
          ? 409
          : 400;
        return NextResponse.json({ error: error.message }, { status });
      }

      return NextResponse.json({
        message: "User created successfully",
        user: data.user,
      });
    }

    if (action === "signin") {
      const ip = getClientIp(request);
      if (!rateLimit(ip)) {
        return NextResponse.json(
          { error: "Too many attempts. Try again later." },
          { status: 429 }
        );
      }

      const e = s(email).toLowerCase();
      const p = String(password || "");

      if (!validEmail(e) || !p) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 400 }
        );
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: e,
        password: p,
      });
      if (error) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        message: "Signed in successfully",
        user: data.user,
        session: data.session,
      });
    }

    if (action === "signout") {
      const { error } = await supabase.auth.signOut();
      if (error)
        return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ message: "Signed out successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
