import { getFichesMethodeForBibliotheque } from "@/src/lib/grist/fiche-methode";
import BibliothequeClient from "./BibliothequeClient";

export default async function Bibliotheque() {
  const fiches = await getFichesMethodeForBibliotheque();
  return <BibliothequeClient fiches={fiches} />;
}
