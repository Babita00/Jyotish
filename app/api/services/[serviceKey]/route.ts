import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/supabase";

interface RouteContext {
  params: Promise<{ serviceKey: string }>; // Must be a Promise
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { serviceKey } = await context.params; // await the promise
    const service = await api.getService(serviceKey);

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
