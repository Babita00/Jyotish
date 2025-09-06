import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper: hash token
function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Helper: generate secure token
function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Helper: rate limit (simple, per email, 1/minute)
async function isRateLimited(email: string) {
  const { count } = await supabase
    .from("password_resets")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", new Date(Date.now() - 60 * 1000).toISOString());
  return (count ?? 0) > 0;
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Rate limit
  if (await isRateLimited(email)) {
    return NextResponse.json(
      { error: "Too many requests. Try again soon." },
      { status: 429 }
    );
  }

  // Check user exists
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();
  if (userError || !user) {
    // Don't reveal if user exists
    return NextResponse.json({ success: true });
  }

  // Generate and hash token
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 20).toISOString(); // 20 min

  // Store token
  await supabase.from("password_resets").insert({
    user_id: user.id,
    email,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  // Send email (pseudo, replace with actual email logic)
  // await sendResetEmail(email, token);

  // Log event
  console.log(`Password reset requested for ${email}`);

  return NextResponse.json({ success: true });
}
