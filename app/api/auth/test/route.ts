import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.auth.getSession();

    return NextResponse.json({
      status: "success",
      supabaseConnected: true,
      session: data.session ? "Active session found" : "No active session",
      error: error ? error.message : null,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        supabaseConnected: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone } = body;

    console.log("🧪 Testing signup with debug API:", {
      email,
      fullName,
      phone,
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone || null,
        },
      },
    });

    return NextResponse.json({
      status: error ? "error" : "success",
      data: data,
      error: error ? error.message : null,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("🚨 Debug API error:", error);
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

