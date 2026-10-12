"use client";

import { useEffect, useState } from "react";
import styles from "./astuces.module.scss";

import CardIrritant from "@/src/components/Cards/CardIrritant/CardIrritant";
import { wordingHeaders } from "@/src/constants/wording";
import { AstuceAnimation } from "@/src/types/models/astuce";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";

export default function Astuces() {
  const [astuces, setAstuces] = useState<AstuceAnimation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/grist/astuce_animation")
      .then((res) => res.json())
      .then((data) => setAstuces(data.records))
      .catch((err) => console.error("Failed to fetch astuces:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Breadcrumb
        currentPageLabel={wordingHeaders["astuces d'animation"].xl}
        homeLinkProps={{
          href: `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/`,
        }}
        segments={[]}
      />
      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>
            {wordingHeaders["astuces d'animation"].xl}
          </h1>

          <section className={styles.intro}>
            Ici retrouvez la boîte à astuces pour gérer les moments délicats et
            gagner en confiance pendant l'animation :
          </section>

          <div className={styles.grid}>
            {astuces.map((astuce) => (
              <CardIrritant key={astuce.id} {...astuce} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
