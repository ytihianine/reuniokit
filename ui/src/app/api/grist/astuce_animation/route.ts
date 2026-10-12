import { getAstuces } from "@/src/lib/grist/astuces";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const records = await getAstuces();
    return NextResponse.json({ records });
  } catch (error) {
    console.error("Grist API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
