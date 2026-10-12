import { gristClient } from "@/src/lib/grist/grist-client";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route API pour récupérer les records d'une table Grist.
 *
 * Ceci est nécessaire pour éviter les problèmes de CORS en faisant les appels côté serveur.
 *
 * GET /api/grist/tables/{tableName}/records
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tableName: string }> },
) {
  try {
    const records = await gristClient.getRecords((await params).tableName);
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
