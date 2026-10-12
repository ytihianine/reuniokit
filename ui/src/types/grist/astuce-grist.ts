export interface AstuceAnimationIrritantGristRecord {
  id: number;
  fields: AstuceAnimationIrritantGristFields;
}

export interface AstuceAnimationIrritantGristFields {
  Irritant: string;
  emoji?: string;
}

export interface AstuceAnimationSolutionGristRecord {
  id: number;
  fields: AstuceAnimationSolutionGristFields;
}

export interface AstuceAnimationSolutionGristFields {
  ordre_affichage: number;
  Irritant: number; // clé vers astuce_animation_irritant
  Solution: string;
}
