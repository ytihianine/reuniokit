import { FicheSynthese, Objectifs } from "./models/fiche";

// Récole les informations fournies via le formulaire
export interface FormData {
  sujet_reunion: string;
  sujet_detail: string;
  lieu: string;
  participants: string | null;
  duree: string | null;
  objectifs: Objectifs;
}

export interface Proposition {
  "Briser la glace": FicheSynthese[];
  "Partager la vision"?: FicheSynthese[];
  "Générer des idées"?: FicheSynthese[];
  "Résoudre un problème"?: FicheSynthese[];
  "Prendre une décision"?: FicheSynthese[];
  Formaliser?: FicheSynthese[];
  "Répartir les tâches"?: FicheSynthese[];
  Prototyper?: FicheSynthese[];
  "Faire le bilan"?: FicheSynthese[];
  Clôturer: FicheSynthese[];
}

export interface DureeCorpsReunion {
  "Partager la vision"?: number;
  "Générer des idées"?: number;
  "Résoudre un problème"?: number;
  "Prendre une décision"?: number;
  Formaliser?: number;
  "Répartir les tâches"?: number;
  Prototyper?: number;
  "Faire le bilan"?: number;
}
