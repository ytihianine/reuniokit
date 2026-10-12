"use server";

import { getRevalidateCacheKey } from "@/src/lib/grist/revalidate-cache";
import { revalidateTag } from "next/cache";

export async function verifyKey(key: string): Promise<boolean> {
  const validKey = await getRevalidateCacheKey();
  return validKey !== null && key === validKey;
}

export async function revalidateAstuces(): Promise<void> {
  revalidateTag("astuces", "max");
}

export async function revalidateReunionTypes(): Promise<void> {
  revalidateTag("reunion-types", "max");
}
