import type { RevalidateCacheGristRecord } from "@/src/types/grist/cache-grist";
import "server-only";
import { gristClient } from "./grist-client";

export async function getRevalidateCacheKey(): Promise<string | null> {
  const records =
    await gristClient.getRecords<RevalidateCacheGristRecord>(
      "Revalidate_cache",
    );
  return records[0]?.fields.cle ?? null;
}
