import { NextResponse } from "next/server";
import { getAllLookupData } from "@/lib/googleSheets";

// ISR-style cache — revalidate every 5 minutes server-side
export const revalidate = 300;
export const dynamic = "force-static";

export async function GET() {
  try {
    const data = await getAllLookupData();
    return NextResponse.json(data, {
      headers: {
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
