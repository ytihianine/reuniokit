"use client";

// Types
import type { FormData, Proposition } from "@/src/types/form";

// Style
import styles from "./proposition.module.scss";

// Components
import CardDerouleCustom from "@/src/components/Cards/CardDerouleCustom/CardDerouleCustom";

// Lib
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

const map_pin = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/map_pin.svg`;
const team = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/team.svg`;
const timer = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/timer.svg`;
const separateur_grand = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/separateur_grand.svg`;
const separateur = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/separateur.svg`;
const lightbulb = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/lightbulb.svg`;
const info = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/info.svg`;
const download = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/download.svg`;

const arrow_line_left = `${process.env.NEXT_PUBLIC_ASSETS}/proposition/img/arrow_line_left.svg`;

const barre_rose = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/barre_rose.svg`;
const timer_rose = `${process.env.NEXT_PUBLIC_ASSETS}/Cards/img/timer_rose.svg`;

function convertTime(duree: string | null) {
  if (duree === "0" || duree === null) {
    return "Non-renseigné";
  }
  const duree_convert = Number(duree) / 60;
  const heures = Math.floor(duree_convert).toString();
  let minutes = ((duree_convert % 1) * 60).toString();
  if ((minutes = "0")) {
    minutes = "00";
  }
  return heures + "H" + minutes;
}

const generatePdf = (filename: string) => {
  const input = document.getElementById("content");

  if (input) {
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

      const canvasWidth = imgWidth * ratio;
      const canvasHeight = imgHeight * ratio;

      const x = margin;
      const y = margin;

      pdf.addImage(imgData, "PNG", x, y, canvasWidth, canvasHeight);
      pdf.save(filename + ".pdf");
    });
  }
};

export default function Proposition({
  formValues,
  handleResetForm,
}: {
  formValues: FormData;
  handleResetForm: () => void;
}) {
  // Context
  const [proposition, setProposition] = useState<Proposition>();
  const [dureeInclusion, setDureeInclusion] = useState<number[]>([]);
  const [dureeCorpsReunion, setDureeCorpsReunion] = useState<number[]>([]);
  const [dureeCloture, setDureeCloture] = useState<number[]>([]);

  const updateDuree = (
    prevValue: number,
    newValue: number,
    setDuree: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    setDuree((prevNumbers) => {
      const index = prevNumbers.indexOf(prevValue);

      if (index !== -1) {
        const updatedNumbers = [...prevNumbers];
        updatedNumbers[index] = newValue;
        return updatedNumbers;
      } else {
        return [...prevNumbers, newValue];
      }
    });
  };

  function getFirstFiche(currentKey: string, objectif: Proposition) {
    const fiches = objectif[currentKey as keyof Proposition];

    if (currentKey === "Briser la glace" || currentKey === "Clôturer") {
      return;
    }

    return (
      <div key={currentKey}>
        {fiches && (
          <div className={styles.etape}>
            <CardDerouleCustom
              fiches={fiches}
              multipleFiches={true}
              dureePhase={dureeInclusion}
              onDurationChange={updateDuree}
              setDureeOf={setDureeCorpsReunion}
            />
          </div>
        )}
      </div>
    );
  }

  function getProposition(formData: FormData) {
    if (formValues.duree == "0") {
      formValues.duree = "0";
    }
    try {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/deroule/proposition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((jsonData) => {
          setProposition(jsonData);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProposition(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only need to be called on mount
  }, []);

  if (!proposition) {
    return <div>Proposition en cours de réalisation</div>;
  }

  return (
    <>
      <div id="content" className={styles.globalContainer}>
        <div className={styles.derouleTop}>
          <h2>Mon déroulé sur-mesure</h2>
          <p className={styles.criteres}>Critères :</p>

          <div className={styles.derouleTopFilter}>
            <div className={styles.derouleTopFilterModalite}>
              <div className={styles.derouleTopFilterTitle}>
                <p>
                  <img src={map_pin} alt="map pin" />
                  Modalité
                </p>
              </div>
              <Tag>{formValues.lieu}</Tag>
            </div>
            <img src={separateur_grand} alt="séparateur" />
            <div className={styles.derouleTopFilterNombre}>
              <div className={styles.derouleTopFilterTitle}>
                <p>
                  <img src={team} alt="team" />
                  Nombre de participants
                </p>
              </div>
              <Tag>{formValues.participants} participants</Tag>
            </div>
            <img src={separateur_grand} alt="séparateur" />

            <div className={styles.derouleTopFilterDuree}>
              <div className={styles.derouleTopFilterTitle}>
                <p>
                  <img src={timer} alt="timer" />
                  Durée
                </p>
              </div>
              <Tag>{convertTime(formValues.duree)}</Tag>
            </div>
          </div>
          <hr />
          <div className={styles.derouleTopInformation}>
            <p>
              Le déroulé de l'atelier est proposé en 3 temps . Les temps
              d'inclusion et de clôture sont préconisés en fonction de votre
              contexte. N'hésitez pas à naviguer entre les différentes options
              de fiche.
            </p>
            <img src={separateur} alt="séparateur" />
            <img src={lightbulb} alt="ampoule" />
            <p>N'hésitez pas à intégrer des pauses à votre déroulé !</p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <h4>Inclusion</h4>
            <img src={barre_rose} alt="séparateur" />
            <img src={timer_rose} alt="timer" />
            <p>{dureeInclusion} min</p>
          </div>
          <div className={styles.etape}>
            <CardDerouleCustom
              fiches={proposition["Briser la glace"]}
              multipleFiches={true}
              dureePhase={dureeInclusion}
              onDurationChange={updateDuree}
              setDureeOf={setDureeInclusion}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <h4>Corps de la réunion</h4>
            <img src={barre_rose} alt="séparateur" />
            <img src={timer_rose} alt="timer" />
            <p>
              {Object.values(dureeCorpsReunion).reduce(
                (sum: number, value: number) => sum + value,
                0,
              )}{" "}
              min
            </p>
          </div>

          <div>
            {Object.keys(proposition).map((key) => (
              <div key={key}>
                <>{getFirstFiche(key, proposition)}</>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <h4>Cloture</h4>
            <img src={barre_rose} alt="séparateur" />
            <img src={timer_rose} alt="timer" />
            <p>{dureeCloture} min</p>
          </div>
          <div className={styles.etape}>
            <CardDerouleCustom
              fiches={proposition["Clôturer"]}
              multipleFiches={true}
              dureePhase={dureeInclusion}
              onDurationChange={updateDuree}
              setDureeOf={setDureeCloture}
            />
          </div>
        </div>

        <div className={styles.derouleBottom}>
          <div className={styles.derouleBottomLeft}></div>
        </div>
        <div className={styles.derouleTelechargement}>
          <div className={styles.derouleTelechargementLeft}>
            <button onClick={() => handleResetForm()}>
              {" "}
              Lancer un nouveau formulaire <img src={arrow_line_left} alt="" />
            </button>
          </div>
          <div className={styles.derouleTelechargementRight}>
            <button onClick={() => generatePdf("deroule-sur-mesure")}>
              Télécharger le déroulé d'atelier <img src={download} alt="" />
            </button>
            <p>
              <img src={info} alt="" /> 1 mb
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
