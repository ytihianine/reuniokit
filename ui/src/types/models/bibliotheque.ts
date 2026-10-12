export interface FicheMethode {
  id: number;
  intitule: string;
  modalite: string;
  dureeMin: number;
  dureeMax: number;
  utilisableParLeGenerateur: boolean;
  difficulte: number;
  participantMin: number;
  participantMax: number;
  supportIds: number[]; // IDs des pièces jointes Grist
  materiel: string;
  estPubliee: boolean;
  objectif: number;
  objectifText: string;
  sousObjectif?: number;
  sousObjectifText?: string;
  resume: string;
}

export interface FicheMethodeDerouleItem {
  id: number;
  titre: string;
  ordreAffichage: number;
  contenu: string;
}

export interface FicheMethodeWithDeroule extends FicheMethode {
  deroule: FicheMethodeDerouleItem[];
}

export interface FicheMethodeWithObjectifContenu extends FicheMethode {
  objectifContenu?: string;
}
