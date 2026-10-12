"use client";

// Context
import { formDataContext, stepContext } from "@/src/contexts/contexts";

// Style
import styles from "./StepOne.module.scss";

// Components
import Button from "../../Buttons/Button/Button";

// Lib
import Link from "next/link";
import { useContext, useState } from "react";

const womenGroup__img =
  process.env.NEXT_PUBLIC_ASSETS + "/algo/img/pc_screen.svg";

const back_icon = process.env.NEXT_PUBLIC_ASSETS + "/algo/img/arrow-back.svg";

const Step1 = () => {
  const { formValues, setFormValues } = useContext(formDataContext);
  const { setStep } = useContext(stepContext);

  // Gérer les boutons radio
  const [sujetReunionSelected, setSujetReunionSelected] = useState<string>("");
  const [precisionSujetReunionSelected, setPrecisionSujetReunionSelected] =
    useState<string>("");

  const sujet_reunion = [
    "La vie et l'organisation du service",
    "Un projet spécifique",
  ];
  const precision_sujet = [
    "Suivi de projet / gestion de projet",
    "Atelier de travail / créativité",
  ];

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    setStep(2);
  };

  return (
    <>
      <div className={styles.globalContainer}>
        <main>
          <div className={styles.mainContainer}>
            <div className={styles.mainContainerLeft}>
              <h1>Créer mon déroulé de réunion sur-mesure</h1>
              <p>DÉFINIR LES SUJETS DE LA RÉUNION</p>
              <div className={styles.mainContainerImage}>
                <img src={womenGroup__img} alt="écran de pc" />
              </div>
            </div>
            <div className={styles.mainContainerOption}>
              <p>Étape 1 sur 3</p>
              <div className={styles.levelBar}>
                <img
                  src={
                    process.env.NEXT_PUBLIC_ASSETS +
                    "/algo/img/levelbar__completed.svg"
                  }
                  alt=""
                />
                <img
                  src={
                    process.env.NEXT_PUBLIC_ASSETS +
                    "/algo/img/levelbar__not.svg"
                  }
                  alt=""
                />
                <img
                  src={
                    process.env.NEXT_PUBLIC_ASSETS +
                    "/algo/img/levelbar__not.svg"
                  }
                  alt=""
                />
              </div>
              <fieldset>
                <legend>1 | Sujet de la réunion</legend>
                <div className={styles.radioGroup}>
                  <h2>1 | Sujet de la réunion</h2>
                  {sujet_reunion.map((sujet, index) => (
                    <div key={sujet} className={styles.radioItem}>
                      <input
                        type="radio"
                        id={sujet}
                        name="sujet_reunion"
                        value={sujet}
                        checked={sujetReunionSelected === sujet}
                        onChange={(e) => {
                          handleInputChange(e);
                          setSujetReunionSelected(e.target.value);
                        }}
                      />
                      <label htmlFor={sujet}>{sujet_reunion[index]}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              {sujetReunionSelected === "Un projet spécifique" ? (
                <fieldset>
                  <legend>2 | Précision du sujet (projet)</legend>
                  <h2>2 | Précision du sujet (projet)</h2>
                  <div className={styles.radioGroup}>
                    {precision_sujet.map((sujet_detail, index) => (
                      <div key={sujet_detail} className={styles.radioItem}>
                        <input
                          type="radio"
                          id={sujet_detail}
                          name="sujet_detail"
                          value={sujet_detail}
                          checked={
                            precisionSujetReunionSelected === sujet_detail
                          }
                          onChange={(e) => {
                            handleInputChange(e);
                            setPrecisionSujetReunionSelected(e.target.value);
                          }}
                        />
                        <label htmlFor={sujet_detail}>
                          {precision_sujet[index]}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              ) : null}
              <div className={styles.buttonContainer}>
                <Link href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/`}>
                  <Button
                    icon={back_icon}
                    className={styles.buttonBack}
                    text="Revenir à l'accueil"
                    buttonType="primary"
                  ></Button>
                </Link>
                <Button
                  disabled={!sujetReunionSelected}
                  className={`${styles.buttonNext} ${
                    !sujetReunionSelected ? styles.buttonNextDisabled : ""
                  }`}
                  text="Valider et continuer"
                  onClick={handleNextStep}
                  buttonType="primary"
                ></Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Step1;
