import { gristClient } from "@/src/lib/grist/grist-client";
import { mapGristRecordToReunionType } from "@/src/lib/grist/mappers";
import type { ReunionTypeGristRecord } from "@/src/types/grist/reunion-type-grist";
import { connection, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Route API pour récupérer les records de la table Grist "Reunion_type".
 *
 * GET /api/grist/reunion_type
 * @param duree - Durée en minutes (optionnelle)
 * @param typologie - Type de réunion: "Atelier" ou "Réunion de service" (optionnel)
 */

// Schéma de validation des query parameters
const queryParamsSchema = z.object({
  duree: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "La durée doit être un nombre valide",
    }),
  typologie: z
    .enum(["Atelier", "Réunion de service"])
    .optional()
    .catch(undefined),
});

export async function GET(request: Request) {
  await connection(); // indique à Next.js que cette route est dynamique

  try {
    // Extraction et validation des query parameters
    const { searchParams } = new URL(request.url);
    const rawParams = {
      duree: searchParams.get("duree") ?? undefined,
      typologie: searchParams.get("typologie") ?? undefined,
    };

    const validationResult = queryParamsSchema.safeParse(rawParams);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Paramètres invalides",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const { duree, typologie } = validationResult.data;

    // Construction du filtre pour Grist (seulement pour la typologie)
    const filter: Record<string, any> = {};

    if (typologie) {
      filter.typologie_reunion = [typologie];
    }

    const gristRecords = await gristClient.getRecords<ReunionTypeGristRecord>(
      "Reunion_type",
      Object.keys(filter).length > 0 ? filter : undefined,
    );

    // Filtre côté serveur sur la durée
    let filteredRecords = gristRecords;
    if (duree !== undefined) {
      filteredRecords = gristRecords.filter(
        (record) =>
          record.fields.duree_min <= duree && record.fields.duree_max >= duree,
      );
    }

    const records = filteredRecords.map(mapGristRecordToReunionType);

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
