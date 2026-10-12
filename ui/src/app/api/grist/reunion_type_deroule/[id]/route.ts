import { gristClient } from "@/src/lib/grist/grist-client";
import { ReunionTypeDerouleGristRecord } from "@/src/types/grist/reunion-type-grist";
import type {
  DerouleItemAvant,
  DerouleItemBase,
  DerouleItemPendant,
  ReunionTypeDeroule,
} from "@/src/types/models/reunion-type";
import { NextRequest, NextResponse } from "next/server";

function groupAndSortDeroules(
  records: ReunionTypeDerouleGristRecord[],
): ReunionTypeDeroule {
  const avant: DerouleItemAvant[] = [];
  const pendant: DerouleItemPendant[] = [];
  const apres: DerouleItemBase[] = [];

  records.forEach((rec) => {
    if (rec.fields.phase === "1. Avant") {
      avant.push({
        id: rec.id,
        ordreAffichage: rec.fields.ordre_affichage,
        contenu: rec.fields.contenu,
        titre: rec.fields.titre,
      });
    } else if (rec.fields.phase === "2. Pendant") {
      pendant.push({
        id: rec.id,
        ordreAffichage: rec.fields.ordre_affichage,
        dureeMin: rec.fields.duree_min,
        dureeMax: rec.fields.duree_max,
        contenu: rec.fields.contenu,
        titre: rec.fields.titre,
      });
    } else if (rec.fields.phase === "3. Après") {
      apres.push({
        id: rec.id,
        ordreAffichage: rec.fields.ordre_affichage,
        contenu: rec.fields.contenu,
      });
    }
  });

  // Trier chaque tableau par ordre d'affichage
  const sortByOrdre = (a: DerouleItemBase, b: DerouleItemBase) =>
    a.ordreAffichage - b.ordreAffichage;

  avant.sort(sortByOrdre);
  pendant.sort(sortByOrdre);
  apres.sort(sortByOrdre);

  return { avant, pendant, apres };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    console.log("Fetching Reunion_type_deroule for id:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 },
      );
    }

    // Utiliser un filtre pour ne récupérer que les déroulés de la réunion type spécifique
    const filter = { id_reunion_type: [parseInt(id)] };
    const gristRecords =
      await gristClient.getRecords<ReunionTypeDerouleGristRecord>(
        "Reunion_type_deroule",
        filter,
      );
    const deroules = groupAndSortDeroules(gristRecords);
    return NextResponse.json({ records: deroules });
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
