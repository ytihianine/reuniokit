import { gristClient } from "@/src/lib/grist/grist-client";
import { mapGristRecordToReunionType } from "@/src/lib/grist/mappers";
import type { ReunionTypeGristRecord } from "@/src/types/grist/reunion-type-grist";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route API pour récupérer un seul record de la table Grist "Reunion_type" par ID.
 *
 * GET /api/grist/reunion_type/[id]
 */

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

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: "Invalid id parameter: must be a number" },
        { status: 400 },
      );
    }

    const gristRecord = await gristClient.getRecord<ReunionTypeGristRecord>(
      "Reunion_type",
      parsedId,
    );

    if (!gristRecord) {
      return NextResponse.json(
        { error: "Reunion type not found" },
        { status: 404 },
      );
    }

    const record = mapGristRecordToReunionType(gristRecord);
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
