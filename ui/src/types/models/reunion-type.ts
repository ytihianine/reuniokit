export interface ReunionType {
  id: number;
  intitule: string;
  dureeMin: number;
  dureeMax: number;
  participantsMin: number;
  participantsMax: number;
  typologieReunion: string;
  modalitePresentation: string;
  resume: string;
}

// Type de base pour un item de déroulé
export interface DerouleItemBase {
  id: number;
  ordreAffichage: number;
  contenu: string;
}

// Type pour un item "Avant" (sans durée)
export interface DerouleItemAvant extends DerouleItemBase {
  titre: string;
}

// Type pour un item "Pendant" (avec durée et titre)
export interface DerouleItemPendant extends DerouleItemBase {
  dureeMin: number;
  dureeMax: number;
  titre: string;
}

// Type frontend groupé par phase
export interface ReunionTypeDeroule {
  avant: DerouleItemAvant[];
  pendant: DerouleItemPendant[];
  apres: DerouleItemBase[];
}

export interface ReunionTypeSupport {
  id: number;
  ordreAffichage: number;
  attachmentId: number;
  texteRemplacement: string;
  downloadUrl: string;
}
