"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { Card } from "@codegouvfr/react-dsfr/Card";
import Tag from "@codegouvfr/react-dsfr/Tag";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { wordingHeaders } from "@/src/constants/wording";
import type {
  ReunionType,
  ReunionTypeDeroule,
} from "@/src/types/models/reunion-type";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import styles from "./deroule-type-card-details.module.scss";

const computer = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/computer.svg`;
const timer = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/timer.svg`;
const team = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/team.svg`;
const doc = `${process.env.NEXT_PUBLIC_ASSETS}/reunion_type/img/document.svg`;

const generatePdf = (filename: string) => {
  const input = document.getElementById("content");
  if (!input) return;

  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 2;

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width * 0.264583;
    const imgHeight = canvas.height * 0.264583;

    const ratio = Math.min(
      (pdfWidth - 2 * margin) / imgWidth,
      (pdfHeight - 2 * margin) / imgHeight,
    );

    pdf.addImage(
      imgData,
      "PNG",
      margin,
      margin,
      imgWidth * ratio,
      imgHeight * ratio,
    );
    pdf.save(filename + ".pdf");
  });
};

interface Props {
  derouleType: ReunionType & ReunionTypeDeroule;
}

export default function DerouleTypeDetailClient({ derouleType }: Props) {
  return (
    <>
      <Breadcrumb
        currentPageLabel={derouleType.intitule}
        homeLinkProps={{
          href: `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/`,
        }}
        segments={[
          {
            label: wordingHeaders["réunion type"].xl,
            linkProps: {
              href: `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/deroule/type`,
            },
          },
        ]}
      />
      <div id="content" className={styles.container}>
        <section>
          <div className={styles.header}>
            <h2>{derouleType.intitule}</h2>
            <div className={styles.headerDescription}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {derouleType.resume}
              </ReactMarkdown>
            </div>
            <div className={styles.headerTags}>
              <Tag className={styles.tag}>
                <img src={doc} alt="doc" />
                {derouleType.typologieReunion}
              </Tag>
              <Tag className={styles.tag}>
                <img src={computer} alt="computer" />
                {derouleType.modalitePresentation ? (
                  <>Distanciel / Présentiel</>
                ) : (
                  <>Présentiel</>
                )}
              </Tag>
              <Tag className={styles.tag}>
                <img src={timer} alt="timer" />
                {derouleType.dureeMin} à {derouleType.dureeMax} minutes
              </Tag>
              <Tag className={styles.tag}>
                <img src={team} alt="team" />
                {derouleType.participantsMin} à {derouleType.participantsMax}{" "}
                personnes
              </Tag>
            </div>
          </div>
        </section>

        <section className={styles.deroule}>
          <div className={styles.derouleSection}>
            <div className={styles.derouleSectionTitle}>
              <h4>En amont de la réunion</h4>
            </div>
            <div className={styles.etape}>
              <div className={styles.etapesContainer}>
                {derouleType.avant.map((etape, index) => (
                  <div key={index}>
                    <p>
                      <b>{etape.titre}</b>
                    </p>
                    <div className={styles.etapeContent}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {etape.contenu}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.derouleSection}>
            <div className={styles.derouleSectionTitle}>
              <h4>Pendant la réunion</h4>
            </div>
            <div className={styles.etape}>
              <div className={styles.sousEtape}>
                <div className={styles.etapesContainer}>
                  {derouleType.pendant.map((etape, index) => (
                    <div key={index}>
                      <p>
                        <b>
                          Étape {index + 1} : {etape.titre}
                        </b>{" "}
                        ({etape.dureeMin} à {etape.dureeMax} min)
                      </p>
                      <div className={styles.etapeContent}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {etape.contenu}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.derouleSection}>
            <div className={styles.derouleSectionTitle}>
              <h4>Après la réunion</h4>
            </div>
            <div className={styles.etape}>
              {derouleType.apres.map((etape, index) => (
                <div key={index}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {etape.contenu}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.autresRessources}>
          <Card
            background
            border
            desc="PDF - 61,88 Ko"
            horizontal
            footer={
              <div className={styles.footerCard}>
                <Button
                  iconId="fr-icon-arrow-down-line"
                  priority="tertiary"
                  onClick={() => generatePdf(derouleType.intitule)}
                  size="large"
                >
                  Télécharger
                </Button>
              </div>
            }
            size="medium"
            title="Télécharger le déroulé d'atelier et les fiches"
            titleAs="h3"
          />
          <Card
            background
            border
            desc="S'inspirer en découvrant de nouvelles méthodes d'animation."
            enlargeLink
            horizontal
            linkProps={{ href: "/bibliotheque" }}
            size="medium"
            title="Retrouver d'autres options dans la bibliothèque"
            titleAs="h3"
          />
        </section>
      </div>
      <CallOut
        buttonProps={{
          children: "Répondre au questionnaire",
          onClick: () =>
            window.open(
              "https://www.galileo.finances.gouv.fr/index.php/658857?lang=fr",
              "_blank",
            ),
        }}
        title="Votre avis compte"
        className={styles.callout}
      >
        Aidez-nous à faire évoluer le Réunio'Kit!
        <br />
        Prenez quelques instants pour partager vos idées et retours.
      </CallOut>
    </>
  );
}
