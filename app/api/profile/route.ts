import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET - Get current user's profile
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.json(
        { error: "Failed to fetch profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error in profile GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update current user's profile
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate and sanitize input
    const updates: any = {};

    if (body.full_name !== undefined) {
      if (
        typeof body.full_name !== "string" ||
        body.full_name.trim().length === 0
      ) {
        return NextResponse.json(
          { error: "Full name must be a non-empty string" },
          { status: 400 }
        );
      }
      updates.full_name = body.full_name.trim();
    }

    if (body.phone !== undefined) {
      if (body.phone !== null && typeof body.phone !== "string") {
        return NextResponse.json(
          { error: "Phone must be a string or null" },
          { status: 400 }
        );
      }
      updates.phone = body.phone ? body.phone.trim() : null;
    }

    // Don't allow role updates through this endpoint (security)
    if (body.role !== undefined) {
      return NextResponse.json(
        { error: "Role cannot be updated through this endpoint" },
        { status: 403 }
      );
    }

    updates.updated_at = new Date().toISOString();

    // Try to update first, then insert if doesn't exist
    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", session.user.id)
      .select()
      .single();

    if (error) {
      // If profile doesn't exist, create it
      if (error.code === "PGRST116") {
        // No rows found
        const newProfile = {
          id: session.user.id,
          full_name:
            updates.full_name ||
            session.user.user_metadata?.full_name ||
            "User",
          phone: updates.phone || session.user.user_metadata?.phone || null,
          role: "client" as const,
          ...updates,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from("profiles")
          .insert([newProfile])
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          return NextResponse.json(
            { error: "Failed to create profile" },
            { status: 500 }
          );
        }

        return NextResponse.json({ profile: createdProfile });
      }

      console.error("Error updating profile:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    console.error("Error in profile PATCH:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
