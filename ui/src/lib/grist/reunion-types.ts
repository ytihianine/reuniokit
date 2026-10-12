import type {
  ReunionTypeDerouleGristRecord,
  ReunionTypeGristRecord,
} from "@/src/types/grist/reunion-type-grist";
import type {
  DerouleItemAvant,
  DerouleItemBase,
  DerouleItemPendant,
  ReunionType,
  ReunionTypeDeroule,
} from "@/src/types/models/reunion-type";
import { cacheLife, cacheTag } from "next/cache";
import "server-only";
import { gristClient } from "./grist-client";
import { mapGristRecordToReunionType } from "./mappers";

function groupAndSortDeroules(
  records: ReunionTypeDerouleGristRecord[],
): ReunionTypeDeroule {
  const avant: DerouleItemAvant[] = [];
  const pendant: DerouleItemPendant[] = [];
  const apres: DerouleItemBase[] = [];

  for (const rec of records) {
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
  }

  const sortByOrdre = (a: DerouleItemBase, b: DerouleItemBase) =>
    a.ordreAffichage - b.ordreAffichage;

  return {
    avant: avant.sort(sortByOrdre),
    pendant: pendant.sort(sortByOrdre),
    apres: apres.sort(sortByOrdre),
  };
}

export async function getReunionTypes(): Promise<ReunionType[]> {
  "use cache";
  cacheLife("days");
  cacheTag("reunion-types");

  const records =
    await gristClient.getRecords<ReunionTypeGristRecord>("Reunion_type");
  return records.map(mapGristRecordToReunionType);
}

export async function getReunionType(id: number): Promise<ReunionType> {
  "use cache";
  cacheLife("days");
  cacheTag("reunion-types");

  const record = await gristClient.getRecord<ReunionTypeGristRecord>(
    "Reunion_type",
    id,
  );
  return mapGristRecordToReunionType(record);
}

export async function getReunionTypeDeroule(
  id: number,
): Promise<ReunionTypeDeroule> {
  "use cache";
  cacheLife("days");
  cacheTag("reunion-types");

  const records = await gristClient.getRecords<ReunionTypeDerouleGristRecord>(
    "Reunion_type_deroule",
    { id_reunion_type: [id] },
  );
  return groupAndSortDeroules(records);
}
