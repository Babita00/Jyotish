import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { serviceKey: string } }
) {
  try {
    const service = await api.getService(params.serviceKey);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}
