export interface ReunionTypeGristRecord {
  id: number;
  fields: ReunionTypeGristFields;
}

export interface ReunionTypeGristFields {
  intitule: string;
  duree_min: number;
  duree_max: number;
  participant_min: number;
  participant_max: number;
  typologie_reunion: string;
  modalite_presentation: string;
  resume: string;
  avant: string | null;
}

export interface ReunionTypeDerouleGristRecord {
  id: number;
  fields: ReunionTypeDerouleGristFields;
}

export interface ReunionTypeDerouleGristFields {
  phase: string;
  ordre_affichage: number;
  duree_min: number;
  duree_max: number;
  contenu: string;
  titre: string;
  id_reunion_type: number;
}

export interface ReunionTypeSupportGristRecord {
  id: number;
  fields: ReunionTypeSupportGristFields;
}

export interface ReunionTypeSupportGristFields {
  id_reunion_type: number;
  ordre_affichage: number;
  document: [string, number]; // Grist renvoie un tuple de la forme ["L", attachmentId]. On ignore le premier élément.
  texte_remplacement: string;
}
