"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import styles from "./cardIrritant.module.scss";

export interface Irritant {
  emoji?: string;
  irritant: string;
  solutions: string[];
}

export default function CardIrritant({ emoji, irritant, solutions }: Irritant) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [parent] = useAutoAnimate();

  const advance = () => setCurrentIndex((i) => i + 1);
  const reset = () => setCurrentIndex(-1);
  const hasNext = currentIndex < solutions.length - 1;
  const isLast = currentIndex === solutions.length - 1;

  return (
    <div ref={parent} className={styles.wrapper}>
      {currentIndex === -1 ? (
        <div key="irritant" className={styles.card}>
          <div className={styles.content}>
            <div className={styles.emoji}>{emoji}</div>
            <h3 className={styles.irritant} title={irritant}>
              {irritant}
            </h3>
          </div>
          <div className={styles.containerButton}>
            <Button onClick={advance} priority="primary">
              Voir les solutions
            </Button>
          </div>
        </div>
      ) : (
        <div key={`solution-${currentIndex}`} className={styles.card}>
          <div className={styles.content}>
            <p className={styles.solutionIndex}>
              Solution {currentIndex + 1} / {solutions.length}
            </p>
            <p className={styles.solution}>{solutions[currentIndex]}</p>
          </div>
          <div className={styles.containerButton}>
            {hasNext && (
              <Button onClick={advance} priority="primary">
                Solution suivante
              </Button>
            )}
            {isLast && (
              <Button onClick={reset} priority="secondary">
                Revenir à l'irritant
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
