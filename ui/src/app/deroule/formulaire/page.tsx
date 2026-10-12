"use client";

// Types
import { FormData } from "@/src/types/form";

// Components
import Proposition from "@/src/components/Formulaire/Proposition/Proposition";
import Step3 from "@/src/components/Formulaire/StepThree/StepThree";
import Step2 from "@/src/components/Formulaire/StepTwo/StepTwo";

// lib
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { useState } from "react";

// Constantes
import { hrefHome } from "@/src/constants/href";
import { wordingHeaders } from "@/src/constants/wording";

export default function DerouleFormulaire() {
  const [formValues, setFormValues] = useState<FormData>({
    sujet_reunion: "Un projet spécifique",
    sujet_detail: "Atelier de travail / créativité",
    lieu: "",
    participants: "",
    duree: "",
    objectifs: {
      inclusion: [],
      corps_reunion: [],
      cloture: true,
    },
  });
  const [step, setStep] = useState(1);
  const maxStep = 2;

  const handleObjectifsListe = (
    objectifsSelectionnees: string[],
    objectifSupplementaire: string,
  ) => {
    if (!objectifsSelectionnees) {
      return [objectifSupplementaire];
    }
    if (objectifsSelectionnees.includes(objectifSupplementaire)) {
      return objectifsSelectionnees.filter(
        (value: string) => value !== objectifSupplementaire,
      );
    } else {
      return [...objectifsSelectionnees, objectifSupplementaire];
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "inclusion") {
      setFormValues({
        ...formValues,
        objectifs: {
          ...formValues.objectifs,
          inclusion: [value],
        },
      });
      return;
    }

    if (name === "corps_reunion") {
      setFormValues({
        ...formValues,
        objectifs: {
          ...formValues.objectifs,
          corps_reunion: handleObjectifsListe(
            formValues.objectifs.corps_reunion,
            value,
          ),
        },
      });
      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNextStep = (sens: string) => {
    if (sens === "prev") {
      setStep(step - 1);
    }
    if (sens === "next") {
      setStep(step + 1);
    }
  };

  const handleResetForm = () => {
    setFormValues({
      sujet_reunion: "Un projet spécifique",
      sujet_detail: "Atelier de travail / créativité",
      lieu: "",
      participants: "",
      duree: "",
      objectifs: {
        inclusion: [],
        corps_reunion: [],
        cloture: true,
      },
    });
    setStep(1);
  };

  const renderStep: any = () => {
    switch (step) {
      case 1:
        return (
          <Step2
            currentStep={1}
            maxStep={maxStep}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <Step3
            currentStep={2}
            maxStep={maxStep}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <Proposition
            formValues={formValues}
            handleResetForm={handleResetForm}
          />
        );
    }
  };

  return (
    <>
      <Breadcrumb
        currentPageLabel={wordingHeaders["générateur atelier"].xl}
        homeLinkProps={{
          href: hrefHome,
        }}
        segments={[]}
      />
      {renderStep()}
    </>
  );
}
