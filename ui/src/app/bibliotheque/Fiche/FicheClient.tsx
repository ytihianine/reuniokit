"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { wordingHeaders } from "@/src/constants/wording";
import type { FicheMethodeWithDeroule } from "@/src/types/models/bibliotheque";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Tag from "@codegouvfr/react-dsfr/Tag";
import styles from "./fiche.module.scss";

const map_pin = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/map_pin.svg`;
const timer = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/timer.svg`;
const team = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/team.svg`;
const star_full = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/star_full.svg`;
const star_empty = `${process.env.NEXT_PUBLIC_ASSETS}/fiche/img/star_empty.svg`;

const generatePdf = (nomFiche: string) => {
  const input = document.getElementById("content");
  if (!input) return;

  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width * 0.264583;
    const imgHeight = canvas.height * 0.264583;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    pdf.addImage(
      imgData,
      "PNG",
      (pdfWidth - imgWidth * ratio) / 2,
      0,
      imgWidth * ratio,
      imgHeight * ratio,
    );
    pdf.save(nomFiche + ".pdf");
  });
};

interface Props {
  fiche: FicheMethodeWithDeroule;
}

export default function FicheClient({ fiche }: Props) {
  return (
    <>
      <Breadcrumb
        currentPageLabel={fiche.intitule}
        homeLinkProps={{ href: `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/` }}
        segments={[
          {
            label: wordingHeaders["bibliothèque fiches méthodes"].xl,
            linkProps: {
              href: `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/bibliotheque`,
            },
          },
        ]}
      />

      <div id="content">
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>{fiche.intitule}</h1>
          <p className={styles.heroResume}>{fiche.resume}</p>
          <div className={styles.heroTags}>
            <Tag className={styles.tag}>
              Difficulté&nbsp;
              {Array(fiche.difficulte)
                .fill(null)
                .map((_, i) => (
                  <img key={i} src={star_full} alt="étoile pleine" />
                ))}
              {Array(3 - fiche.difficulte)
                .fill(null)
                .map((_, i) => (
                  <img key={i} src={star_empty} alt="étoile vide" />
                ))}
            </Tag>
            <Tag className={styles.tag}>
              <img src={map_pin} alt="" />
              {fiche.modalite}
            </Tag>
            <Tag className={styles.tag}>
              <img src={timer} alt="" />
              {fiche.dureeMin} à {fiche.dureeMax} min
            </Tag>
            <Tag className={styles.tag}>
              <img src={team} alt="" />
              {fiche.participantMin} à {fiche.participantMax} participants
            </Tag>
          </div>
          {fiche.materiel && (
            <p className={styles.heroMateriel}>
              <strong>Matériel</strong>

              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {fiche.materiel || "Non renseigné"}
              </ReactMarkdown>
            </p>
          )}
        </section>

        <div className={styles.sections}>
          {fiche.deroule.map((etape) => (
            <section key={etape.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{etape.titre}</h2>
              <div className={styles.sectionContent}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {etape.contenu}
                </ReactMarkdown>
              </div>
            </section>
          ))}
        </div>

        <div className={styles.footer}>
          <Button
            iconId="fr-icon-arrow-down-line"
            priority="tertiary"
            onClick={() => generatePdf(fiche.intitule)}
            size="large"
          >
            Télécharger la fiche PDF
          </Button>
        </div>
      </div>
    </>
  );
}
