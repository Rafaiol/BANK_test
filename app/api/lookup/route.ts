import { NextResponse } from "next/server";
import { getAllLookupData } from "@/lib/googleSheets";

export async function GET() {
  try {
    const data = await getAllLookupData();
    return NextResponse.json(data, {
      headers: {
        // Cache at CDN/browser edge for 1 minute, stale-while-revalidate 2 min
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("[/api/lookup] Error:", error);
    return NextResponse.json(
      { error: "Failed to load lookup data" },
      { status: 500 },
    );
  }
}
