import { getFicheMethode } from "@/src/lib/grist/fiche-methode";
import { notFound } from "next/navigation";
import FicheClient from "./FicheClient";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ fiche?: string }>;
}

export default async function FichePage({ searchParams }: Props) {
  const { fiche: ficheParam } = await searchParams;
  const id = ficheParam ? parseInt(ficheParam, 10) : NaN;

  if (isNaN(id)) notFound();

  const fiche = await getFicheMethode(id);

  return <FicheClient fiche={fiche} />;
}
