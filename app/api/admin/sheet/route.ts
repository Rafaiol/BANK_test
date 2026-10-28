import { NextRequest, NextResponse } from "next/server";
import {
  isGoogleSheetsConnected,
  getTargetSheetId,
  getAllLookupData,
  getSimulations,
  updateTableData,
} from "@/lib/googleSheets";

export async function GET() {
  try {
    const connected = isGoogleSheetsConnected();
    const sheetId = getTargetSheetId();
    const data = await getAllLookupData();
    const simulations = await getSimulations();

    return NextResponse.json({
      connected,
      sheetId,
      sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit`,
      data,
      simulations,
    });
  } catch (err: any) {
    console.error("[/api/admin/sheet] GET Error:", err);
    return NextResponse.json(
      { error: "Failed to load admin data", details: err?.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tableKey, data } = body;

    if (!tableKey || !Array.isArray(data)) {
      return NextResponse.json(
        { error: "Invalid request payload. Expected { tableKey, data: [] }" },
        { status: 400 },
      );
    }

    const result = await updateTableData(tableKey, data);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[/api/admin/sheet] POST Error:", err);
    return NextResponse.json(
      { error: "Failed to update table data", details: err?.message },
      { status: 500 },
    );
  }
}
