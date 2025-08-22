import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "app", "assets", "horoscope.svg");
    const svgBuffer = await fs.readFile(filePath);
    return new Response(new Uint8Array(svgBuffer), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Failed to read horoscope.svg:", error);
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }
}
