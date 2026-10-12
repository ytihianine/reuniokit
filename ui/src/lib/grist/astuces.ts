import type {
  AstuceAnimationIrritantGristRecord,
  AstuceAnimationSolutionGristRecord,
} from "@/src/types/grist/astuce-grist";
import type { AstuceAnimation } from "@/src/types/models/astuce";
import { cacheLife, cacheTag } from "next/cache";
import "server-only";
import { gristClient } from "./grist-client";

export async function getAstuces(): Promise<AstuceAnimation[]> {
  "use cache";
  cacheLife("days");
  cacheTag("astuces");

  const [irritants, solutions] = await Promise.all([
    gristClient.getRecords<AstuceAnimationIrritantGristRecord>(
      "Astuce_animation_irritant",
    ),
    gristClient.getRecords<AstuceAnimationSolutionGristRecord>(
      "Astuce_animation_solution",
    ),
  ]);

  return irritants.map(({ id, fields }) => ({
    id,
    emoji: fields.emoji,
    irritant: fields.Irritant,
    solutions: solutions
      .filter((s) => s.fields.Irritant === id)
      .sort((a, b) => a.fields.ordre_affichage - b.fields.ordre_affichage)
      .map((s) => s.fields.Solution),
  }));
}
