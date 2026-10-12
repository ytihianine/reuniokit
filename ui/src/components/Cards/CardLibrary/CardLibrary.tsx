"use client";
import { FicheMethode } from "@/src/types/models/bibliotheque";
import { useRouter } from "next/navigation";
import styles from "./card-library.module.scss";

const star_full = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/star_full.svg`;
const star_empty = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/star_empty.svg`;

export default function CardLibrary({ fiche }: { fiche: FicheMethode }) {
  const timer = process.env.NEXT_PUBLIC_ASSETS + "/list/img/timer.svg";
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(
      process.env.NEXT_PUBLIC_DEPLOIEMENT + "/bibliotheque/Fiche?fiche=" + id,
    );
  };

  const description = fiche.resume ?? "Aucune description renseignée.";

  return (
    <div
      className={styles.cardContainer}
      onClick={() => handleClick(fiche.id)}
      aria-label={`Accéder au détail de la fiche ${fiche.intitule}`}
    >
      <p className={styles.cardContainerObjectif}>{fiche.objectifText}</p>
      <h3>{fiche.intitule}</h3>
      <p className={styles.cardContainerText}>
        {description.length > 150 ? (
          <>{description.slice(0, 150) + "..."}</>
        ) : (
          <>{description}</>
        )}
      </p>
      <div className={styles.cardContainerInformation}>
        <p className={styles.cardContainerInformationTime}>
          <img src={timer} alt="Durée" />
          {fiche.dureeMax} min
        </p>
        <p className={styles.cardContainerInformationDifficulty}>
          Difficulté
          <div>
            {Array(Number(fiche.difficulte))
              .fill(null)
              .map((_, i) => (
                <img key={i} src={star_full} alt="étoile pleine" />
              ))}
            {Array(3 - Number(fiche.difficulte))
              .fill(null)
              .map((_, i) => (
                <img key={i} src={star_empty} alt="étoile vide" />
              ))}
          </div>
        </p>
      </div>
    </div>
  );
}
