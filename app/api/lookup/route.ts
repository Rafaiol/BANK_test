import { NextResponse } from "next/server";
import { getAllLookupData } from "@/lib/googleSheets";

export async function GET() {
  try {
    const data = await getAllLookupData();
    return NextResponse.json(data, {
      headers: {
        // Cache at CDN/browser edge for 5 minutes, stale-while-revalidate 10 min
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
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
