"use client";

// Types
import { FormData } from "@/src/types/form";
import { clsx } from "clsx";

// Style
import styles from "./StepTwo.module.scss";

// Components
import Button from "../../Buttons/Button/Button";

// Lib
import { Select } from "@codegouvfr/react-dsfr/Select";

const robot__img = process.env.NEXT_PUBLIC_ASSETS + "/algo/img/planche.svg";

export default function Step2({
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
  const lieux = ["Présentiel", "Distanciel"];

  function participantsNumber() {
    if (!formValues.participants) {
      return "";
    }
    return formValues.participants;
  }

  return (
    <div className={styles.globalContainer}>
      <main>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainerLeft}>
            <h1>Créer mon déroulé d'atelier sur-mesure</h1>
            <p>DÉFINIR LES CONTRAINTES DE L'ATELIER</p>
            <div className={styles.mainContainerImage}>
              <img src={robot__img} alt="robot" />
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
                    src={
                      process.env.NEXT_PUBLIC_ASSETS +
                      "/algo/img/levelbar__completed.svg"
                    }
                    alt="barre pleine"
                  />
                ))}
              {Array(maxStep - currentStep)
                .fill(null)
                .map((_, i) => (
                  <img
                    key={i}
                    src={
                      process.env.NEXT_PUBLIC_ASSETS +
                      "/algo/img/levelbar__not.svg"
                    }
                    alt="barre vide"
                  />
                ))}
            </div>

            <h2>1 | Lieu</h2>
            <hr />
            <fieldset className={styles.hiddenFieldset}>
              <div className={styles.radioGroup}>
                {lieux.map((lieu, index) => (
                  <div key={lieu} className={styles.radioItem}>
                    <input
                      type="radio"
                      id={lieu}
                      name="lieu"
                      value={lieu}
                      checked={formValues.lieu === lieu}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <label htmlFor={lieu}>{lieux[index]}</label>
                  </div>
                ))}
              </div>
              <div className={styles.radioGroupTxt}>
                Pour l'organisation d'atelier en mode hybride, il est conseillé
                de privilégier la participation à distance pour tous les
                intervenants.
              </div>
            </fieldset>

            <h2>2 | Nombre de participants approximatifs</h2>
            <hr />
            <input
              type="number"
              className={styles.nbParticipant}
              name="participants"
              placeholder="Nombre de participants"
              value={participantsNumber()}
              onChange={(e) => handleInputChange(e)}
            />
            <p className={styles.nbPersonnes}>
              Nous recommandons 4 à 30 participants. Dans le cas où vous
              organisez un atelier avec de nombreux participants, nous vous
              conseillons de contacter le BercyLab à{" "}
              <a href="mailto:bercylab@finances.gouv.fr">
                bercylab@finances.gouv.fr
              </a>{" "}
              pour vous accompagner ou vous former !
            </p>

            <h2>3 | Durée de la réunion</h2>
            <hr />
            <Select
              label={null}
              nativeSelectProps={{
                onChange: (e) => handleInputChange(e),
                name: "duree",
                defaultValue: "0",
              }}
            >
              <option value="0" disabled hidden>
                Sélectionnez une option
              </option>
              <option value="60">1h00</option>
              <option value="90">1h30</option>
              <option value="120">2h00</option>
              <option value="150">2h30</option>
              <option value="180">3h00</option>
              <option value="210">3h30</option>
              <option value="240">4h00</option>
              <option value="0">Je ne sais pas / Ne pas renseigner</option>
            </Select>

            <div className={styles.buttonContainer}>
              <Button
                text="Valider et continuer"
                className={clsx(styles.buttonNext, {
                  [styles.buttonNextDisabled]:
                    formValues.lieu === "" ||
                    formValues.participants === "" ||
                    formValues.duree === "",
                })}
                onClick={() => handleNextStep("next")}
                buttonType="primary"
                disabled={
                  formValues.lieu === "" ||
                  formValues.participants === "" ||
                  formValues.duree === ""
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
