// Déprécié, à remplacer par les types de l'API Grist
export interface Objectifs {
  inclusion: string[];
  corps_reunion: string[];
  cloture: boolean;
}

export interface FicheSynthese {
  id: number;
  nom: string;
  objectif: {
    id: number;
    objectif: string;
    ordre: number;
  };
  duree_max: number;
  difficulte: number;
  description_courte: string;
  compatible_visio: boolean;
}

export interface FicheComplete {
  id: string;
  nom: string;
  objectif: {
    id: number;
    objectif: string;
    ordre: number;
  };
  difficulte: number;
  compatible_visio: boolean;
  temps_preparation: string;
  duree_max: number;
  participant_max: number;
  description_courte: string;
  description_longue: string;
  materiel: string[];
  preparation: string;
  fiche_complement: FicheComplement[];
  points_de_vigilance: string;
  conseil: string;
  a_savoir: string;
  url_image: string;
}

export interface FicheComplement {
  id: number;
  ordre: number;
  categorie: string;
  contenu: string;
  precisions: string[];
  exemples: string[];
}
