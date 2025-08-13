import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/supabase";

export async function GET() {
  try {
    const services = await api.getServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
