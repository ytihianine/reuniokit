"use client";

import { useEffect, useState } from "react";
import BibliothequeClient from "./BibliothequeClient";
import { FicheMethodeWithObjectifContenu } from "@/src/types/models/bibliotheque";

export default function Bibliotheque() {
  const [fiches, setFiches] = useState<FicheMethodeWithObjectifContenu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/grist/fiche_methode")
      .then((res) => res.json())
      .then((data) => setFiches(data.records))
      .catch((err) => console.error("Failed to fetch fiches:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return <BibliothequeClient fiches={fiches} />;
}
