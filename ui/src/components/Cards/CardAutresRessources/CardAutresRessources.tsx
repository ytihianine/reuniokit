// Style
import styles from "./cardAutresRessources.module.scss";

// Lib
import Link from "next/link";

export default function CardAutresRessources({
  titre,
  contenu,
  partenaire,
  url,
}: {
  titre: string;
  contenu: string;
  partenaire: string;
  url: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{titre}</div>
      <div className={styles.contenu}>{contenu}</div>
      <div>
        <Link
          href={url}
          target="_blank"
          aria-label={`Accéder au site ${partenaire}`}
        >
          Accéder au site {partenaire}
        </Link>
      </div>
    </div>
  );
}
