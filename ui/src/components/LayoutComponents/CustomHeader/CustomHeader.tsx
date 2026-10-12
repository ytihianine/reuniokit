"use client";

// Types and constants
import {
  hrefAstuces,
  hrefBibliotheque,
  hrefDerouleFormulaire,
  hrefDerouleType,
  hrefHome,
} from "@/src/constants/href";

import { useWindowSize } from "usehooks-ts";

// libs
import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";

import { wordingHeaders } from "@/src/constants/wording";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Header } from "@codegouvfr/react-dsfr/Header";

const CustomHeader = () => {
  const { width = 0 } = useWindowSize({
    debounceDelay: 100,
    initializeWithValue: false,
  });

  const smallerThanXl = width < breakpoints.getPxValues().xl;

  return (
    <Header
      brandTop={
        <>
          Ministères
          <br />
          économiques
          <br />
          et financiers
        </>
      }
      homeLinkProps={{
        href: hrefHome,
        title:
          "Accueil Réunio'kit - Ministère de l'Économie des Finances et de la Souveraineté industrielle et numérique",
      }}
      id="fr-header-header-with-quick-access-items"
      quickAccessItems={[
        {
          iconId: "fr-icon-clipboard-line",
          linkProps: { href: hrefDerouleType },
          text: smallerThanXl
            ? wordingHeaders["réunion type"].sm
            : wordingHeaders["réunion type"].xl,
        },
        {
          iconId: "fr-icon-question-line",
          linkProps: { href: hrefAstuces },
          text: smallerThanXl
            ? wordingHeaders["astuces d'animation"].sm
            : wordingHeaders["astuces d'animation"].xl,
        },
        {
          iconId: "fr-icon-drag-move-2-line",
          linkProps: { href: hrefDerouleFormulaire },
          text: smallerThanXl
            ? wordingHeaders["générateur atelier"].sm
            : wordingHeaders["générateur atelier"].xl,
        },
        {
          iconId: "fr-icon-booklet-line",
          linkProps: { href: hrefBibliotheque },
          text: smallerThanXl
            ? wordingHeaders["bibliothèque fiches méthodes"].sm
            : wordingHeaders["bibliothèque fiches méthodes"].xl,
        },
        // {
        //   iconId: "fr-icon-question-line",
        //   linkProps: { href: hrefFaq },
        //   text: "Mode d'emploi",
        // },
        // {
        //   iconId: "fr-icon-questionnaire-line",
        //   linkProps: { href: hrefQuestionnaireGalileo },
        //   text: "Votre avis compte",
        // },
      ]}
      serviceTagline=""
      serviceTitle={
        <>
          Réunio'Kit{" "}
          <Badge as="span" noIcon severity="success">
            Beta
          </Badge>
        </>
      }
    />
  );
};

export default CustomHeader;
