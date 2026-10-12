"use client";

// Types
import { FormData } from "@/src/types/form";
import { Objectifs } from "@/src/types/models/fiche";

// Style
import styles from "./StepThree.module.scss";

// Components
import Button from "@/src/components/Buttons/Button/Button";

// Lib
import { useEffect, useState } from "react";

// Constantes
import { hrefFaq } from "@/src/constants/href";

const menGroup__img =
  process.env.NEXT_PUBLIC_ASSETS + "/algo/img/pc_screen.svg";
const levelBarCompleted__img =
  process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg";
const levelBarNot__img =
  process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__not.svg";
const back_icon = process.env.NEXT_PUBLIC_ASSETS + "/algo/img/arrow-back.svg";

export default function Step3({
  currentStep,
  maxStep,
  formValues,
  handleInputChange,
  handleNextStep,
}: {
  currentStep: number;
  maxStep: number;
  formValues: FormData;
  handleInputChange: (event: any) => void;
  handleNextStep: (sens: string) => void;
}) {
  // Stocker les objectifs possibles
  const [objectifsPossibles, setObjectifsPossibles] = useState<Objectifs>();

  const isSelected = (objectif: string) => {
    if (!formValues.objectifs?.corps_reunion) {
      return false;
    }
    return formValues.objectifs.corps_reunion.includes(objectif);
  };

  const getObjectifs = (sujet_reunion: string, sujet_detail: string) => {
    try {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/deroule/objectifs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sujet_reunion: sujet_reunion,
          sujet_detail: sujet_detail,
        }),
      })
        .then((res) => res.json())
        .then((jsonData) => {
          setObjectifsPossibles(jsonData);
        });
    } catch (error) {
      console.error("Erreur lors de la requête à l'API :", error);
    }
  };

  useEffect(() => {
    // Récupérer les objectifs
    getObjectifs(formValues.sujet_reunion, formValues.sujet_detail);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only need to be called on mount
  }, []);

  return (
    <div className={styles.globalContainer}>
      <main>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainerLeft}>
            <h1>Créer mon déroulé d'atelier sur-mesure</h1>
            <p>DÉFINIR MON DÉROULÉ / MES SÉQUENCES</p>
            <div className={styles.mainContainerImage}>
              <img
                src={menGroup__img}
                alt="Illustration d'un groupe de personnes"
              />
            </div>
          </div>

          <div className={styles.mainContainerOption}>
            <p>
              Étape {currentStep} sur {maxStep}
            </p>
            <div className={styles.levelBar}>
              {Array(currentStep)
                .fill(null)
                .map((_, i) => (
                  <img
                    key={i}
                    src={levelBarCompleted__img}
                    alt="barre pleine"
                  />
                ))}
              {Array(maxStep - currentStep)
                .fill(null)
                .map((_, i) => (
                  <img key={i} src={levelBarNot__img} alt="barre vide" />
                ))}
            </div>
            <p className={styles.txtExplication}>
              Le déroulé de l'atelier est proposé en 3 temps. Les temps
              d'inclusion et de clôture sont préconisés en fonction de votre
              contexte.
            </p>
            {objectifsPossibles ? (
              <>
                <fieldset>
                  <legend>1 | Inclusion</legend>
                  <div className={styles.inclusion}>1 | Inclusion</div>
                  <p className={styles.tempsInclusion}>Temps d'inclusion</p>
                  <div className={styles.radioGroup}>
                    {objectifsPossibles["inclusion"].map(
                      (inclusion: string, index: number) => (
                        <div key={index} className={styles.radioItem}>
                          <input
                            type="radio"
                            id={inclusion}
                            name="inclusion"
                            value={inclusion}
                            checked={
                              formValues.objectifs?.inclusion?.includes(
                                inclusion,
                              ) || false
                            }
                            onChange={handleInputChange}
                          />
                          <label htmlFor={inclusion}>{inclusion}</label>
                        </div>
                      ),
                    )}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>2 | Corps de la réunion</legend>
                  <div className={styles.inclusion}>
                    2 | Corps de la réunion
                  </div>
                  <p className={styles.tempsInclusion}>
                    Sélectionner un ou plusieurs objectifs. Vous n'arrivez pas à
                    déterminer vos objectifs ?{" "}
                    <span>
                      <a href={hrefFaq}>Retrouver une aide ici.</a>
                    </span>
                  </p>
                  <div className={styles.checkboxGroup}>
                    {objectifsPossibles["corps_reunion"].map(
                      (corps_reunion: string, index: number) => (
                        <div key={index} className={styles.checkboxItem}>
                          <input
                            type="checkbox"
                            id={corps_reunion}
                            name="corps_reunion"
                            value={corps_reunion}
                            checked={isSelected(corps_reunion)}
                            onChange={handleInputChange}
                          />
                          <label htmlFor={corps_reunion}>{corps_reunion}</label>
                        </div>
                      ),
                    )}
                  </div>
                </fieldset>

                <div className={styles.inclusion}>3 | Clôture</div>
                <p className={styles.tempsInclusion}>
                  Un moment de clôture est nécessaire.
                </p>
                <div className={styles.buttonContainer}>
                  <Button
                    icon={back_icon}
                    className={styles.buttonBack}
                    text="Revenir à l'étape précédente"
                    onClick={() => handleNextStep("prev")}
                    buttonType="primary"
                  ></Button>

                  <Button
                    text="Valider et continuer"
                    className={
                      formValues.objectifs.inclusion.length < 1 ||
                      formValues.objectifs.corps_reunion.length < 1
                        ? styles.buttonNextDisabled
                        : styles.buttonNext
                    }
                    onClick={() => handleNextStep("next")}
                    buttonType="primary"
                    disabled={
                      formValues.objectifs.inclusion.length < 1 ||
                      formValues.objectifs.corps_reunion.length < 1
                    }
                  ></Button>
                </div>
              </>
            ) : (
              <div>Chargement des objectifs</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
