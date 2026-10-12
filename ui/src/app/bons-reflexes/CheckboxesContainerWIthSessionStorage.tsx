import { useState } from "react";
import styles from "./checkboxes.module.scss";

type Props = {
  name: "typologiesReunion" | "formatsReunion";
};

const typologiesReunion = [
  "Réunion d'équipe",
  "Réunion de projet",
  "Atelier collaboratif",
];

const formatsReunion = ["Présentiel", "Distanciel"];

export const CheckboxesContainerWithSessionStorage = ({ name }: Props) => {
  const [checkedValues, setCheckedValues] = useState<string[]>(() => {
    const stored = sessionStorage.getItem(name);
    return stored ? stored.split("|") : [];
  });

  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const existing = (sessionStorage.getItem(name) || "")
      .split("|")
      .filter(Boolean);

    const updated = checked
      ? [...existing, value]
      : existing.filter((t) => t !== value);

    sessionStorage.setItem(name, updated.join("|"));

    setCheckedValues(updated);
  };

  const options =
    name === "typologiesReunion" ? typologiesReunion : formatsReunion;
  const title =
    name === "typologiesReunion"
      ? "Typologie de ma réunion"
      : "Format de ma réunion";

  return (
    <div className={styles.container}>
      <p className="fr-text">{title}</p>
      <p className="fr-text--xs">Sélection multiple possible.</p>

      <div className={styles.containerCheckboxes}>
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={checkedValues.includes(option)}
              onChange={handleCheckboxes}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};
