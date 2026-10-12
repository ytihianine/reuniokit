import { gristClient } from "@/src/lib/grist/grist-client";
import { mapGristRecordToSupport } from "@/src/lib/grist/mappers";
import { ReunionTypeSupportGristRecord } from "@/src/types/grist/reunion-type-grist";
import { ReunionTypeSupport } from "@/src/types/models/reunion-type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 },
      );
    }

    // Utiliser un filtre pour ne récupérer que les supports de la réunion type spécifique
    const filter = { id_reunion_type: [parseInt(id)] };
    const gristRecords =
      await gristClient.getRecords<ReunionTypeSupportGristRecord>(
        "Reunion_type_support",
        filter,
      );

    // Trier par ordre d'affichage
    const supports: ReunionTypeSupport[] = gristRecords
      .map(mapGristRecordToSupport)
      .sort((a, b) => a.ordreAffichage - b.ordreAffichage);

    return NextResponse.json({ records: supports });
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
