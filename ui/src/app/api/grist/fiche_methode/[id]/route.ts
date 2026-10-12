import { getFicheMethode } from "@/src/lib/grist/fiche-methode";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/grist/fiche_methode/[id]
 * Retourne une fiche méthode avec son déroulé complet.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: "Invalid id parameter: must be a number" },
        { status: 400 },
      );
    }

    const record = await getFicheMethode(parsedId);
    return NextResponse.json({ record });
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
