import { getReunionTypes } from "@/src/lib/grist/reunion-types";
import DerouleTypeClient from "./DerouleTypeClient";

export default async function DerouleTypePage() {
  const reunionTypes = await getReunionTypes();
  return <DerouleTypeClient reunionTypes={reunionTypes} />;
}
