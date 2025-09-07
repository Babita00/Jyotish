import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface RouteContext {
  params: Promise<{ id: string }>; // must be Promise
}

// GET
export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params; // await the promise

  const supabase = createRouteHandlerClient({ cookies });
  const { data: horoscope, error } = await supabase
    .from("daily_horoscopes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ horoscope });
}

// PUT
export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();

  if (authError || !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || !["admin", "astrologer"].includes(profile.role)) {
    return NextResponse.json(
      { error: "Insufficient permissions" },
      { status: 403 }
    );
  }

  const body = await request.json();

  const { data: horoscope, error } = await supabase
    .from("daily_horoscopes")
    .update({
      date: body.date,
      zodiac_sign: body.zodiac_sign,
      content_en: body.content_en,
      content_ne: body.content_ne,
      is_published: body.is_published,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update horoscope" },
      { status: 500 }
    );
  }

  return NextResponse.json({ horoscope });
}

// DELETE
export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || !["admin", "astrologer"].includes(profile.role)) {
    return NextResponse.json(
      { error: "Insufficient permissions" },
      { status: 403 }
    );
  }

  const { error } = await supabase
    .from("daily_horoscopes")
    .delete()
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
