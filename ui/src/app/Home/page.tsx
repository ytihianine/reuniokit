import { HomeIllustration } from "./illustration";

import { hrefBonsReflexes } from "@/src/constants/href";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Link from "next/dist/client/link";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.wordingContainer}>
          <h2>
            <span className={styles.highlight}>
              La réunion :<br />
            </span>
            les 5 étapes clés pour gagner en efficacité.
          </h2>

          <p>
            Le Réunio’Kit vous offre des outils pour augmenter l’efficacité de
            vos réunions et renforcer l’engagement de vos participants.s
          </p>
          <p>
            Retrouvez ici un questionnaire pour vous aider à vous poser les
            bonnes questions à travers les 5 grandes étapes et vous assurer de
            ne rien oublier.
          </p>
          <Link href={hrefBonsReflexes}>
            <Button priority="primary">
              Adopter les bons réflexes pour une réunion réussie
            </Button>
          </Link>
        </div>
        <div>
          <HomeIllustration />
        </div>
      </div>
    </div>
  );
}
