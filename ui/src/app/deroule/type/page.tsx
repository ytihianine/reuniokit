"use client";

import { useEffect, useState } from "react";
import DerouleTypeClient from "./DerouleTypeClient";
import { ReunionType } from "@/src/types/models/reunion-type";

export default function DerouleTypePage() {
  const [reunionTypes, setReunionTypes] = useState<ReunionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/grist/reunion_type")
      .then((res) => res.json())
      .then((data) => setReunionTypes(data.records))
      .catch((err) => console.error("Failed to fetch reunion types:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return <DerouleTypeClient reunionTypes={reunionTypes} />;
}
