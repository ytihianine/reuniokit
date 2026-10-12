/**
 * Fonctions de mapping pour convertir les records Grist en types frontend
 */

import type {
  ReunionTypeGristRecord,
  ReunionTypeSupportGristRecord,
} from "@/src/types/grist/reunion-type-grist";
import type {
  ReunionType,
  ReunionTypeSupport,
} from "@/src/types/models/reunion-type";

/**
 * Convertit un record Grist Reunion_type en objet ReunionType
 */
export function mapGristRecordToReunionType({
  fields,
  id,
}: ReunionTypeGristRecord): ReunionType {
  return {
    id,
    intitule: fields.intitule,
    dureeMin: fields.duree_min,
    dureeMax: fields.duree_max,
    participantsMin: fields.participant_min,
    participantsMax: fields.participant_max,
    typologieReunion: fields.typologie_reunion,
    modalitePresentation: fields.modalite_presentation,
    resume: fields.resume,
  };
}

export function mapGristRecordToSupport({
  fields,
  id,
}: ReunionTypeSupportGristRecord): ReunionTypeSupport {
  const attachmentId = fields.document[1];
  const downloadUrl = `/api/grist/reunion_type_support/${attachmentId}/download`;

  return {
    id,
    ordreAffichage: fields.ordre_affichage,
    attachmentId,
    texteRemplacement: fields.texte_remplacement,
    downloadUrl,
  };
}
