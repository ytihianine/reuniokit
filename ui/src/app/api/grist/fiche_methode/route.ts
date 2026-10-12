import { getFichesMethode } from "@/src/lib/grist/fiche-methode";
import { NextResponse } from "next/server";

/**
 * GET /api/grist/fiche_methode
 * Retourne toutes les fiches méthode.
 */
export async function GET() {
  try {
    const records = await getFichesMethode();
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
