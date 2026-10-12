// Styles
import styles from "./mentions-legales.module.scss";

// Libs
import React from "react";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";

// Constants
import { hrefHome } from "@/src/constants/href";

const book = `${process.env.NEXT_PUBLIC_ASSETS}/mentions_legales/mentions_legales.svg`;

export default function MentionsLegales() {
  return (
    <>
      <div>
        <Breadcrumb
          currentPageLabel="Mentions légales"
          homeLinkProps={{
            href: hrefHome,
          }}
          segments={[]}
        />
      </div>
      <div>
        <div className={styles.pageTitle}>
          <img src={book} alt="" />
          <h1>Mentions légales</h1>
        </div>
        <hr />
        <div className={styles.section}>
          <h3>Directeur de la publication</h3>
          <p>MINETTE-TIBERGHIEN Brigitte</p>
          <p>Responsable de la mission innovation</p>
          <p>
            <a href="https://www.economie.gouv.fr/mission-innovation/qui-sommes-nous">
              https://www.economie.gouv.fr/mission-innovation/qui-sommes-nous
            </a>
          </p>
        </div>
        <div className={styles.section}>
          <h3>Conception et gestion du site</h3>
          <p>
            Ce site a été développé par le Laboratoire de Transformations en
            collaboration avec la Mission Innovation.
          </p>
          <p>
            L'agence de Design Où sont les dragons a accompagné les travaux
            d'expérience utilisateurs et d'interface utilisateurs
          </p>
          <p>Ce site repose sur les technologies python et react.</p>
        </div>
        <div className={styles.section}>
          <h3>Hébergement</h3>
          <p>
            Ce site est hébergé sur la plateforme SSPCloud. Pour plus
            d'information <a href="https://www.sspcloud.fr/"> cliquez ici.</a>
          </p>
          <p>Cette plateforme est administrée par l'INSEE.</p>
        </div>
        <div className={styles.section}>
          <h3>Contact</h3>
          <p>
            <a href="mailto:mission-innovation@finances.gouv.fr">
              mission-innovation@finances.gouv.fr
            </a>
          </p>
          <p>
            <a href="mailto:labtransfo.dsci@finances.gouv.fr">
              labtransfo.dsci@finances.gouv.fr
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
