import type {
  FicheMethodeDerouleGristRecord,
  FicheMethodeGristRecord,
} from "@/src/types/grist/bibliotheque-grist";
import type {
  FicheMethode,
  FicheMethodeDerouleItem,
  FicheMethodeWithDeroule,
  FicheMethodeWithObjectifContenu,
} from "@/src/types/models/bibliotheque";
import "server-only";
import { gristClient } from "./grist-client";

function mapFicheMethode({
  id,
  fields,
}: FicheMethodeGristRecord): FicheMethode {
  return {
    id,
    intitule: fields.Intitule,
    modalite: fields.Modalite,
    dureeMin: fields.Duree_min,
    dureeMax: fields.Duree_max,
    utilisableParLeGenerateur: fields.Utilisable_par_le_generateur,
    difficulte: fields.Difficulte,
    participantMin: fields.Participant_min,
    participantMax: fields.Participant_max,
    // Grist Attachments : ["L", id1, id2, ...] — on ignore le premier élément
    supportIds: fields.Support?.slice(1) as number[],
    materiel: fields.Materiel,
    estPubliee: fields.Est_publiee,
    objectif: fields.Objectif,
    objectifText: fields.objectif_txt,
    sousObjectif: fields.Sous_objectif,
    sousObjectifText: fields.sous_objectif_txt,
    resume: fields.Resume,
  };
}

function mapFicheMethodeDerouleItem({
  id,
  fields,
}: FicheMethodeDerouleGristRecord): FicheMethodeDerouleItem {
  return {
    id,
    titre: fields.Titre,
    ordreAffichage: fields.ordre_affichage,
    contenu: fields.Contenu,
  };
}

export async function getFichesMethodeForBibliotheque(): Promise<
  FicheMethodeWithObjectifContenu[]
> {
  const [ficheRecords, derouleRecords] = await Promise.all([
    gristClient.getRecords<FicheMethodeGristRecord>("Fiche_methode"),
    gristClient.getRecords<FicheMethodeDerouleGristRecord>(
      "Fiche_methode_deroule",
      { Titre: ["Objectif"] },
    ),
  ]);

  const objectifContenuByFicheId = new Map<number, string>();
  for (const record of derouleRecords) {
    objectifContenuByFicheId.set(record.fields.Intitule, record.fields.Contenu);
  }

  return ficheRecords
    .filter((r) => r.fields.Est_publiee)
    .map((r) => ({
      ...mapFicheMethode(r),
      objectifContenu: objectifContenuByFicheId.get(r.id),
    }));
}

export async function getFichesMethode(): Promise<FicheMethode[]> {
  const records =
    await gristClient.getRecords<FicheMethodeGristRecord>("Fiche_methode");
  return records.map(mapFicheMethode);
}

export async function getFicheMethode(
  id: number,
): Promise<FicheMethodeWithDeroule> {
  const [ficheRecord, derouleRecords] = await Promise.all([
    gristClient.getRecord<FicheMethodeGristRecord>("Fiche_methode", id),
    // Intitule est la clé étrangère vers Fiche_methode dans Fiche_methode_deroule
    gristClient.getRecords<FicheMethodeDerouleGristRecord>(
      "Fiche_methode_deroule",
      { Intitule: [id] },
    ),
  ]);

  return {
    ...mapFicheMethode(ficheRecord),
    deroule: derouleRecords
      .map(mapFicheMethodeDerouleItem)
      .sort((a, b) => a.ordreAffichage - b.ordreAffichage),
  };
}
