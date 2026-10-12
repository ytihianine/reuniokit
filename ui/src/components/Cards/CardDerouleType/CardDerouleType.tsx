import styles from "./deroule-type-card.module.scss";

import type { ReunionType } from "@/src/types/models/reunion-type";
import Button from "@codegouvfr/react-dsfr/Button";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const timer = `${process.env.NEXT_PUBLIC_ASSETS}/reunion_type/img/timer.svg`;
const map_pin = `${process.env.NEXT_PUBLIC_ASSETS}/reunion_type/img/map_pin.svg`;
const team = `${process.env.NEXT_PUBLIC_ASSETS}/reunion_type/img/team.svg`;
const doc = `${process.env.NEXT_PUBLIC_ASSETS}/reunion_type/img/document.svg`;

export default function CardDerouleType({
  reunionType,
}: {
  reunionType: ReunionType;
}) {
  const router = useRouter();
  // Redirection vers le déroulé type détaillée au clic
  const handleClick = (idDerouleType: string) => {
    router.push(
      process.env.NEXT_PUBLIC_DEPLOIEMENT +
        "/deroule/type/detail?derouleType=" +
        idDerouleType,
    );
  };

  return (
    <div className={styles.cardDerouleType}>
      <p className={styles.title}>{reunionType.intitule}</p>

      <div className={styles.containerInformationTop}>
        <div className={styles.leftColumn}>
          <div className={styles.temps}>
            <img src={timer} alt="timer" />
            <p>
              {reunionType.dureeMin} à {reunionType.dureeMax} min
            </p>
          </div>
          <div className={styles.nombrePersonne}>
            <img src={team} alt="team" />
            <p>
              {reunionType.participantsMin} à {reunionType.participantsMax}{" "}
              personnes
            </p>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.format}>
            <img src={map_pin} alt="map pin" />
            <p>{reunionType.modalitePresentation}</p>
          </div>
          <div className={styles.typologie}>
            <img src={doc} alt="document" />
            <p>{reunionType.typologieReunion}</p>
          </div>
        </div>
      </div>

      {/* <img src={illustration_reunion} alt="illustration reunion" /> */}
      <div className={styles.description}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {reunionType.resume}
        </ReactMarkdown>
      </div>
      <div className={styles.containerButton}>
        <Button
          onClick={() => handleClick(reunionType.id.toString())}
          priority="primary"
          // iconId="fr-icon-eye-line" // TODO : l'icône est disponible mais le chargement des images ne fonctionne pas
          size="large"
        >
          {/* <img src={eye} alt="eye" /> */}
          Consulter la fiche
        </Button>
      </div>
    </div>
  );
}
