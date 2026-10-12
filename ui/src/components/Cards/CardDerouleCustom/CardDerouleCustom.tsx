// Types
import { FicheSynthese } from "@/src/types/models/fiche";

// Style
import styles from "./cardDerouleCustom.module.scss";

// Lib
import Badge from "@codegouvfr/react-dsfr/Badge";
import React, { useEffect, useState } from "react";

// Constantes
const barre_rose = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/barre_rose.svg`;
const timer_rose = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/timer_rose.svg`;
const flashlight = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/flashlight.svg`;
const star_rose = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/star_rose.svg`;
const star_grise = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/star_grise.svg`;
const arrow_left = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/arrow_left.svg`;
const arrow_right = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/arrow_right.svg`;

// Si on doit afficher uniquement une seule fiche sans autre possibilité
// on envoie liste de FicheSynthese avec 1 seul élément
export default function CardDerouleCustom({
  fiches,
  multipleFiches,
  dureePhase,
  onDurationChange,
  setDureeOf,
}: {
  fiches: FicheSynthese[];
  multipleFiches: boolean;
  dureePhase?: number[];
  onDurationChange?: (
    prevValue: number,
    newValue: number,
    setDuree: React.Dispatch<React.SetStateAction<number[]>>,
  ) => void;
  setDureeOf?: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [detailSingleFiche, setDetailSingleFiche] = useState<FicheSynthese>(
    fiches[0],
  );
  const [currentIndexFiche, setCurrentIndexFiche] = useState(0);
  const [prevDureeMax, setPrevDureeMax] = useState(detailSingleFiche.duree_max);
  const maxIndexFiche = fiches.length;

  useEffect(() => {
    setPrevDureeMax(detailSingleFiche.duree_max);
    setDetailSingleFiche(fiches[currentIndexFiche]);
  }, [currentIndexFiche]); // TODO: mettre à jour le tableau de dépendance ? (fiches, detailSingleFiche)

  useEffect(() => {
    if (onDurationChange && dureePhase && setDureeOf) {
      const newDureeMax = detailSingleFiche.duree_max;

      onDurationChange(prevDureeMax, newDureeMax, setDureeOf);
    }
  }, [detailSingleFiche]); // TODO: mettre à jour le tableau de dépendance ? (onDurationChange, prevDureeMax, detailSingleFiche, dureePhase, setDureeOf)

  if (!fiches) return <div>Chargement en cours</div>;

  const handleClick = (idFiche: number) => {
    window.open(
      process.env.NEXT_PUBLIC_DEPLOIEMENT +
        "/bibliotheque/Fiche?fiche=" +
        idFiche,
      "_blank",
    );
  };

  function changeIndex(direction: string) {
    setCurrentIndexFiche((prevIndex) => {
      if (direction === "next") {
        return (prevIndex + 1) % maxIndexFiche;
      } else {
        return prevIndex === 0 ? maxIndexFiche - 1 : prevIndex - 1;
      }
    });
  }

  function generateObjectifPart() {
    if (!multipleFiches) return null;

    return (
      <div className={styles.objectif}>
        <div className={styles.objectifTitle}>
          <p className={styles.number}>1</p>
          <p className={styles.texte}>Objectif</p>
        </div>
        <Badge className={styles.badge}>
          <img src={flashlight} alt="éclair" />
          {detailSingleFiche.objectif.objectif}
        </Badge>
      </div>
    );
  }

  function generateRightOtherFiches() {
    if (!multipleFiches) return null;

    return (
      <div className={styles.otherFiche}>
        <p>
          {currentIndexFiche + 1} / {maxIndexFiche}
        </p>
        <div className={styles.otherFicheButton}>
          <button
            onClick={(event) => {
              event.preventDefault();
              changeIndex("prev");
            }}
          >
            <img src={arrow_left} alt="fleche gauche" />
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              changeIndex("next");
            }}
          >
            <img src={arrow_right} alt="fleche droite" />
          </button>
        </div>
        <p>Consulter d'autres fiches </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {generateObjectifPart()}
      {/* CARD */}
      <div
        className={styles.card}
        onClick={() => handleClick(detailSingleFiche.id)}
      >
        <div className={styles.cardHeader}>
          <p>{detailSingleFiche.nom}</p>
          <img
            src={barre_rose}
            alt="barre verticale"
            className={styles.cardHeaderBarre}
          />
          <p className={styles.minute}>
            <img src={timer_rose} alt="timer" />
            {detailSingleFiche.duree_max} min
          </p>
          <img
            src={barre_rose}
            alt="barre verticale"
            className={styles.cardHeaderBarre}
          />
          <p>
            Difficulté
            {Array(Number(detailSingleFiche.difficulte))
              .fill(null)
              .map((_, i) => (
                <img key={i} src={star_rose} alt="étoile pleine" />
              ))}
            {Array(3 - Number(detailSingleFiche.difficulte))
              .fill(null)
              .map((_, i) => (
                <img key={i} src={star_grise} alt="étoile vide" />
              ))}
          </p>
        </div>
        <p className={styles.cardContent}>
          {detailSingleFiche.description_courte.length > 200 ? (
            <>{detailSingleFiche.description_courte.slice(0, 150) + "..."}</>
          ) : (
            <>{detailSingleFiche.description_courte}</>
          )}
        </p>
      </div>
      {generateRightOtherFiches()}
    </div>
  );
}
