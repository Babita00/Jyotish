import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// ---------------------- GET Handler ----------------------
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published") !== "false";
    const zodiac = searchParams.get("zodiac");
    const date = searchParams.get("date");

    let query = supabase
      .from("daily_horoscopes")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (published) query = query.eq("is_published", true);
    if (zodiac) query = query.eq("zodiac_sign", zodiac);
    if (date) query = query.eq("date", date);

    const { data: horoscopes, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ horoscopes });
  } catch (error) {
    console.error("Unexpected error in GET /horoscopes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ---------------------- POST Handler ----------------------
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

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
    const requiredFields = ["date", "zodiac_sign", "content_en", "content_ne"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const { data: horoscope, error } = await supabase
      .from("daily_horoscopes")
      .insert([
        {
          date: body.date,
          zodiac_sign: body.zodiac_sign,
          content_en: body.content_en,
          content_ne: body.content_ne,
          is_published: body.is_published || false,
          author_id: session.user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create horoscope" },
        { status: 500 }
      );
    }

    return NextResponse.json({ horoscope }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error in POST /horoscopes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
