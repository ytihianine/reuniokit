export interface FicheMethodeGristRecord {
  id: number;
  fields: FicheMethodeGristFields;
}

export interface FicheMethodeGristFields {
  Intitule: string;
  Modalite: string;
  Duree_min: number;
  Duree_max: number;
  Utilisable_par_le_generateur: boolean;
  Difficulte: number;
  Participant_min: number;
  Participant_max: number;
  Support: [string, ...number[]]; // Grist Attachments : ["L", id1, id2, ...]
  Materiel: string;
  Est_publiee: boolean;
  Objectif: number; // Reference('Ref_objectif')
  objectif_txt: string;
  Sous_objectif: number; // Reference('Ref_objectif_sous_objectif')
  sous_objectif_txt?: string;
  Resume: string;
}

export interface FicheMethodeDerouleGristRecord {
  id: number;
  fields: FicheMethodeDerouleGristFields;
}

export interface FicheMethodeDerouleGristFields {
  Intitule: number; // Reference('Fiche_methode') — c'est la clé étrangère vers Fiche_methode
  Titre: string;
  ordre_affichage: number;
  Contenu: string;
}
