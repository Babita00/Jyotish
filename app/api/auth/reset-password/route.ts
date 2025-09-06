import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req: NextRequest) {
  const { email, token, newPassword } = await req.json();
  if (!email || !token || !newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Find token
  const tokenHash = hashToken(token);
  const { data: reset, error } = await supabase
    .from("password_resets")
    .select("*")
    .eq("email", email)
    .eq("token_hash", tokenHash)
    .gte("expires_at", new Date().toISOString())
    .single();
  if (error || !reset) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // Update password (Supabase)
  const { error: pwError } = await supabase.auth.admin.updateUserById(
    reset.user_id,
    {
      password: newPassword,
    }
  );
  if (pwError) {
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }

  // Clean up token
  await supabase.from("password_resets").delete().eq("id", reset.id);

  // Log event
  console.log(`Password reset for ${email}`);

  return NextResponse.json({ success: true });
}
