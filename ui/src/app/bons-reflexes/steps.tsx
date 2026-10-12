import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Card } from "@codegouvfr/react-dsfr/Card";
import Image from "next/image";
import CleIcon from "./CleIcon";
import CibleIcon from "./images/CibleIcon";
import CroquisIcon from "./images/CroquisIcon";
import DessinIcon from "./images/DessinIcon";
import SuiviIcon from "./images/SuiviIcon";

import {
  hrefBibliotheque,
  hrefCanvas7P,
  hrefDerouleType,
  hrefMatrice,
} from "@/src/constants/href";
import Link from "next/dist/client/link";
import { CheckboxesContainerWithSessionStorage } from "./CheckboxesContainerWIthSessionStorage";
import S1Q1Icon from "./images/S1Q1Icon";
import S1Q3Icon from "./images/S1Q3";
import S2Q1Icon from "./images/S2Q1Icon";
import S3Q2Icon from "./images/S3Q2Icon";
import S3Q4Icon from "./images/S3Q4Icon";
import S3Q5Icon from "./images/S3Q5Icon";
import styles from "./steps.module.scss";

type Step = {
  header?: string;
  title: string;
  image?: React.ReactNode;
  content: React.ReactNode;
  ctaLabel?: string;
  questions: QuestionContent[];
};

type QuestionContentBase = {
  title: string;
  content: React.ReactNode;
  skipLabel?: string;
};

type QuestionContentAdvice =
  | {
      askingAdviceLabel: string;
      advice: Advice;
    }
  | {
      askingAdviceLabel?: undefined;
      advice?: undefined;
    };

type QuestionContent = QuestionContentBase & QuestionContentAdvice;

type Advice = {
  title?: string;
  content: React.ReactNode;
  image?: React.ReactNode;
};

const commonPartLinkCanvas = (
  <p>
    Pour garder une trace de vos réflexions, téléchargez et complétez le canevas
    disponible <Link href={hrefCanvas7P}>ici</Link>.
  </p>
);

export const STEPS: Step[] = [
  {
    header: "Les bons réflexes",
    title: "Étape 1 : Qualifier le besoin",
    image: <CleIcon />,
    ctaLabel: "Je qualifie mon besoin",
    content: (
      <>
        <p>
          Vous est-il déjà arrivé de vous demander si votre présence en réunion
          était vraiment nécessaire{"\u00A0"}? Ou de penser qu&apos;un simple
          mail aurait suffi{"\u00A0"}?
        </p>
        <p>
          Réunir 10 attachés principaux pendant 2 heures représente un coût
          employeur d&apos;environ 1000 euros : mobilisez les bons outils aux
          bons moments pour plus d&apos;efficacité.
        </p>
      </>
    ),
    questions: [
      {
        title: "Ai-je bien identifié mon besoin\u00A0?",
        content: (
          <>
            <p>
              Prenez le temps de réfléchir aux raisons pour lesquelles vous
              souhaitez organiser cette réunion : quel est l'objectif de la
              réunion, que souhaitez vous accomplir et à quoi ressemblerait pour
              vous une réunion réussie{"\u00A0"}?
            </p>
            <p>
              Une réunion peut avoir plusieurs objectifs, cependant il faut se
              limiter au plus important pour éviter de diluer l'objectif
              directeur.
            </p>
          </>
        ),
        skipLabel: "Oui, je connais précisément mon besoin",
        askingAdviceLabel: "Non, j'aimerais bien quelques conseils",
        advice: {
          title: "Vous devez encore réfléchir à votre besoin\u00A0?",
          content: (
            <div className={styles.containerAdvice}>
              <div>
                Passez en revue les questions suivantes pour vous aider à
                identifier précisément votre besoin :
                <ul>
                  <li>Quels sont mes objectifs{"\u00A0"}?</li>
                  <li>
                    Dans quel contexte se tiendrait cet échange{"\u00A0"}?
                  </li>
                  <li>
                    Quel sera l'état d'esprit des participants{"\u00A0"}? Est-ce
                    le bon moment{"\u00A0"}?
                  </li>
                  <li>
                    Concrètement, que doit-on accomplir dans cette réunion
                    {"\u00A0"}?
                  </li>
                </ul>
                {commonPartLinkCanvas}
              </div>
              <S1Q1Icon />
            </div>
          ),
        },
      },
      {
        title:
          "Est-il indispensable d'échanger avec plusieurs personnes au même moment\u00A0?",
        content: (
          <>
            <p>
              Parfois, la réunion n'est pas la meilleure option. Pour le même
              temps consacré, plusieurs échanges bilatéraux ou des formats
              asynchrones (mail, document partagé, messagerie) peuvent s'avérer
              plus efficaces.
            </p>
          </>
        ),
        skipLabel:
          "Oui, il est nécessaire de réunir plusieurs personnes au même moment",
        askingAdviceLabel: "Non, faites moi découvrir d'autres modalités",
        advice: {
          title:
            "D'autres modalités d'échanges peuvent être adaptés à votre besoin...",
          content: (
            <>
              <p>
                Retrouvez ci-dessous une matrice pour vous aider à identifier la
                meilleure modalité de communication en fonction de votre
                situation.
              </p>
              <div className={styles.image}>
                <Image
                  src={hrefMatrice}
                  alt="Matrice modalités d'échange"
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />
              </div>
              {commonPartLinkCanvas}
            </>
          ),
        },
      },
      {
        title: "Qui sont les participants et est-ce les bons\u00A0?",
        content: (
          <>
            <p>
              La réunion est-elle utile pour tout le monde{"\u00A0"}? Assurer
              que toutes les personnes invitées ont une raison évidente
              d'assister à la réunion et qu'elles comprennent clairement le rôle
              et le domaine qu'elles représentent.
            </p>
            <p>
              En général,
              <strong>
                les réunions ou les groupes de travail les plus productifs
                comptent moins de huit personnes
              </strong>
              .
            </p>
          </>
        ),
        skipLabel: "Oui, j'ai identifié les bons participants",
        askingAdviceLabel: "Non, j'aimerais bien quelques conseils",
        advice: {
          title:
            "Vous ne savez pas encore qui sont les bons participants\u00A0?",
          content: (
            <div className={styles.containerAdvice}>
              <div>
                <p>
                  Passez en revue votre liste de participants en identifiant :
                </p>
                <ul>
                  <li>
                    Sans qui la réunion n'a-t-elle pas de sens{"\u00A0"}? De qui
                    ne puis-je pas me passer{"\u00A0"}?
                  </li>
                  <li>
                    Qui d'autre pourrait tirer parti de cette réunion{"\u00A0"}?
                  </li>
                  <li>Quelles sont leurs caractéristiques{"\u00A0"}?</li>
                  <li>Que savent ils sur le sujet de la réunion{"\u00A0"}?</li>
                  <li>Quelles sont leurs attentes{"\u00A0"}?</li>
                  <li>Les participants se connaissent-ils{"\u00A0"}?</li>
                </ul>
                {commonPartLinkCanvas}
              </div>
              <S1Q3Icon />
            </div>
          ),
        },
      },
    ],
  },
  {
    title: "Étape 2 : Cadrer",
    image: <CibleIcon />,
    ctaLabel: "Je cadre ma réunion",
    content: (
      <>
        <p>
          Vous est-il déjà arrivé de finir une réunion sans savoir clairement
          quel en était le livrable{"\u00A0"}? Ou encore de subir une réunion
          hybride perturbée par de nombreux problèmes techniques{"\u00A0"}?
        </p>
        <p>
          Une réunion efficace commence toujours par un bon cadrage : définir
          les livrables attendus, choisir la bonne typologie et adopter le
          format le plus adapté.
        </p>
      </>
    ),
    questions: [
      {
        title: "Ai-je identifié les livrables de ma réunion\u00A0?",
        content: (
          <>
            <p>
              Les livrables peuvent aussi bien être de nature tangible (ex :
              plan d'action) que intangibles (ex : synergie d'équipe).
            </p>
          </>
        ),
        skipLabel: "Oui, j'ai identifié les livrables de ma réunion",
        askingAdviceLabel: "Non, j'aimerais bien quelques conseils",
        advice: {
          title: "Je n'ai pas identifié les livrables de ma réunion.",
          content: (
            <div className={styles.containerAdvice}>
              <div>
                <p>Prenez le temps de répondre aux questions suivantes :</p>
                <ul>
                  <li>
                    Quels sont mes livrables tangibles{"\u00A0"}? Intangibles
                    {"\u00A0"}?
                  </li>
                  <li>
                    A l'issue de la réunion, qu'est ce les participants auront
                    produit{"\u00A0"}?
                  </li>
                  <li>Quelle forme prendront ces livrables{"\u00A0"}?</li>
                  <li>
                    A qui seront-ils diffusés{"\u00A0"}? Comment{"\u00A0"}?
                  </li>
                </ul>
                {commonPartLinkCanvas}
              </div>
              <S2Q1Icon />
            </div>
          ),
        },
      },
      {
        title: "Quelle est la typologie de ma réunion\u00A0?",
        content: (
          <>
            <p>
              <strong>Réunion d'équipe</strong> : organiser une rencontre
              régulière regroupant des membres déjà familiarisés entre eux, pour
              permettre de faire le point sur les tâches, les projets et les
              problématiques spécifiques à l'entité (équipe, service, CODIR).
            </p>

            <p>
              <strong>Réunion de suivi de projet</strong> : organiser une
              réunion pour surveiller l'avancement d'un projet spécifique en
              cours, impliquant les membres de l'équipe projet, souvent issus de
              différents services. Son objectif est d'assurer que le projet
              progresse selon les objectifs fixés, dans le respect des délais et
              du budget, tout en résolvant les obstacles ou retards éventuels
              (COPIL, etc.).
            </p>
            <p>
              <strong>Atelier collaboratif</strong> : une réunion interactive et
              participative où les participants collaborent sur une
              problématique, un besoin ou une tâche spécifique de manière
              ponctuelle. Cela peut être un moment de co-construction entre les
              membres d'une équipe ou d'un projet (réunions institutionnelles,
              réunions de mutualisation de métiers, etc.).
            </p>
            <CheckboxesContainerWithSessionStorage name="typologiesReunion" />
          </>
        ),
      },
      {
        title: "Quel est le format de ma réunion\u00A0?",
        content: (
          <>
            <p>
              <strong>Présentiel</strong> : ce format est à privilégier si vous
              souhaitez stimuler le partage d'idées entre les participants,
              favoriser les débats, co-construire et renforcer les relations
              interpersonnelles.
            </p>
            <p>
              <strong>Distance</strong> : ce format est préférable si votre
              objectif est d'optimiser l'efficacité des échanges, notamment pour
              des réunions axées sur le partage d'informations et les mises à
              jour. Chacun parle à son tour et peu de débats possible.
            </p>
            <p>
              <strong>Hybride</strong> : ce format, mélangeant distanciel et
              présentiel, offre un équilibre entre flexibilité et interactions
              directes. Il induit davantage de défis logistiques et techniques,
              et engendre un décalage entre le groupe en présentiel et en
              distanciel qui ont plus de mal à s'exprimer.
            </p>
            <p>
              Retrouvez plus d'informations ici : la boîte à outils de la
              facilitation en ligne et un guide pour accompagner les équipes
              dans leur réflexion sur le fonctionnement mixte.
            </p>
            <CheckboxesContainerWithSessionStorage name="formatsReunion" />
          </>
        ),
      },
    ],
  },
  {
    title: "Étape 3 : Préparer",
    image: <CroquisIcon />,
    ctaLabel: "Je prépare ma réunion",
    content: (
      <>
        <p>
          Vous est-il déjà arrivé de participer à une réunion sans ordre du jour
          précis{"\u00A0"}? Ou de manquer d'informations essentielles pour y
          contribuer efficacement{"\u00A0"}?
        </p>
        <p>
          Une bonne préparation permet de donner une intention à chaque
          séquence, de définir les informations et documents indispensables,
          d'anticiper les écueils et de maîtriser tous les aspects logistiques.
        </p>
      </>
    ),
    questions: [
      {
        title:
          "Ai-je structuré l'ordre du jour de ma réunion de manière détaillée, claire et efficace\u00A0?",
        content: <></>,
        skipLabel:
          "Oui, j'ai défini de manière détaillée chaque séquence de ma réunion",
        askingAdviceLabel: "Non, j'aimerais bien quelques conseils",
        advice: {
          title:
            "Je n'ai pas structuré le déroulement de ma réunion de manière claire et efficace.",
          content: (
            <>
              <p>
                Optimisez votre réunion avec les outils du Réunio'Kit, selon
                votre besoin :
              </p>
            </>
          ),
        },
      },
      {
        title:
          "Ai-je identifié les données et documents nécessaires pour mener à bien ma réunion\u00A0?",
        content: (
          <>
            Identifiez les données ou documents dont vous disposez déjà et ceux
            qu'il vous faudra rassembler ou préparer en amont en amont (exemple
            : échéances de projet, d'informations financières, connaissance des
            parties prenantes et des personnes directement concernées par les
            décisions).
          </>
        ),
        skipLabel:
          "Oui, j'ai identifié les documents et informations nécessaires",
        askingAdviceLabel: "Non, j'ai besoin de quelques conseils",
        advice: {
          title:
            "Je n'ai pas identifié les données et documents nécessaires pour mener à bien ma réunion.",
          content: (
            <div className={styles.containerAdvice}>
              <div>
                <p>Prenez le temps de répondre aux questions suivantes :</p>
                <ul>
                  <li>
                    Quelles données ou documents en ma possession seront utiles
                    pour cette réunion{"\u00A0"}?
                  </li>
                  <li>
                    Ai-je besoin de collecter des informations supplémentaires
                    avant la réunion{"\u00A0"}?
                  </li>
                  <li>
                    Est-ce que je dispose de tous les éléments essentiels pour
                    l'aborder en toute confiance{"\u00A0"}?
                  </li>
                  <li>
                    Que dois-je préparer en amont de ma réunion{"\u00A0"}?
                  </li>
                </ul>
                {commonPartLinkCanvas}
              </div>
              <S3Q2Icon />
            </div>
          ),
        },
      },
      {
        title: "Ai-je identifié le rôle des participants\u00A0?",
        content: (
          <>
            Identifiez les compétences et les connaissances nécessaires pour
            chaque séquence de la réunion. Pour compléter, il conviendra
            éventuellement de fournir aux participants le bon niveau de
            connaissance, en amont ou lors d'une séquence de la réunion.
          </>
        ),
        skipLabel: "Oui, je connais le rôle de chaque participant",
        askingAdviceLabel: "Non, j'ai besoin de quelques conseils",
        advice: {
          title: "Je n'ai pas identifié le rôle des participants.",
          content: (
            <>
              <p>Prenez le temps de répondre aux questions suivantes :</p>
              <ul>
                <li>
                  Quel est le niveau de connaissances des participants sur le
                  sujet de la réunion{"\u00A0"}? Ai-je besoin d'un expert sur un
                  sujet{"\u00A0"}? Quels sont leurs attentes{"\u00A0"}?{" "}
                </li>
                <li>
                  Quel sera le rôle de l'animateur{"\u00A0"}? Qui gardera le
                  temps{"\u00A0"}? Qui s'occupera du compte rendu (si
                  applicable){"\u00A0"}? D'autres rôles nécessaires{"\u00A0"}?
                </li>
              </ul>
              {commonPartLinkCanvas}
            </>
          ),
        },
      },
      {
        title: "Ai-je anticipé les aspects pratiques\u00A0?",
        content: (
          <>
            <p>
              En présentiel, privilégiez une salle adaptée en taille et
              modulable selon vos besoins. En distanciel, optez pour un outil
              fiable qui facilite les interactions (sous-groupes, gestion des
              échanges, etc.).
            </p>
            <p>
              Envoyez vos invitations complètes : date, heure, lieu ou lien de
              connexion, ordre du jour et répartition des rôles (animateur,
              gardien du temps…).
            </p>
            <p>
              Partagez idéalement les supports 24 à 48h avant la réunion afin
              que chacun puisse se préparer. Pensez également au matériel
              nécessaire.
            </p>
            <p>
              Le jour J, arrivez en avance pour installer la salle ou
              connectez-vous quelques minutes avant sur l'outil de
              visioconférence afin d'accueillir vos participants.
            </p>
          </>
        ),
        skipLabel: "Oui, j'ai anticipé tous les aspects",
        askingAdviceLabel: "Non, j'ai besoin d'un rappel",
        advice: {
          title: "J'ai encore des aspects pratiques à régler.",
          content: (
            <div className={styles.containerAdvice}>
              <div>
                <p>Prenez le temps de répondre aux questions suivantes :</p>
                <ul>
                  <li>
                    La salle est-elle réservée{"\u00A0"}? La salle est équipée
                    pour le nombre de participants et le type de réunion
                    {"\u00A0"}?
                  </li>
                  <li>
                    L'outil de visio-conférence est choisit{"\u00A0"}? Il permet
                    de réaliser toutes les séquences de mon déroulé{"\u00A0"}?
                  </li>
                  <li>
                    Ai-je vérifié que tout le matériel technique (audio, visuel)
                    fonctionne{"\u00A0"}?
                  </li>
                  <li>
                    Disposez vous de tous les éléments (date, heure, lieu, lien
                    de connexion, ordre du jour) à fournir dans l'invitation aux
                    participants{"\u00A0"}?
                  </li>
                  <li>Les supports sont-ils prêts à être envoyés{"\u00A0"}?</li>
                  <li>Ai-je réuni le matériel nécessaire{"\u00A0"}?</li>
                </ul>
                {commonPartLinkCanvas}
              </div>
              <S3Q4Icon />
            </div>
          ),
        },
      },
      {
        title: "Ai-je identifié les pièges potentiels\u00A0?",
        content: (
          <>
            Réfléchissez aux pièges ou risques existent et pourraient mettre à
            mal ce que vous souhaitez réaliser dans le cadre de cette réunion.
            S'il n'y en a pas, réfléchissez encore un peu. Identifiez les
            éléments que vous pouvez mettre en place pour les gérer et
            anticiper.
          </>
        ),
        skipLabel: "Oui, j'ai anticipé les pièges potentiels",
        askingAdviceLabel: "Non, j'ai besoin de quelques conseils",
        advice: {
          title: "Je n'ai pas identifié les pièges potentiels.",
          content: (
            <div className={styles.containerAdvice}>
              <div>
                <p>Je n'ai pas identifié les pièges potentiels.</p>
                <ul>
                  <li>
                    Quel plan B pour les risques les plus probables/critiques
                    {"\u00A0"}?
                  </li>
                  <li>
                    Quels risques dois-je anticiper (ex : difficulté de prise en
                    main des outils, peu de participation){"\u00A0"}?
                  </li>
                </ul>
                {commonPartLinkCanvas}
              </div>
              <S3Q5Icon />
            </div>
          ),
        },
      },
    ],
  },
  {
    title: "Étape 4 : Animer",
    image: <DessinIcon />,
    ctaLabel: "J'anime ma réunion",
    content: (
      <>
        <p>
          Vous est-il déjà arrivé d'assister à une réunion où c'est toujours les
          mêmes personnes qui s'expriment{"\u00A0"}? Où les participants se
          coupent sans cesse la parole{"\u00A0"}?
        </p>
        <p>
          Animer une réunion efficacement, c'est savoir canaliser les échanges,
          maintenir le cap sur les objectifs et encourager la participation de
          chacun
        </p>
      </>
    ),
    questions: [
      {
        title: "Avez-vous préparé l'animation de votre réunion\u00A0?",
        content: (
          <>
            <p>
              Retrouvez ici les points clés à garder en tête pour assurer une
              animation efficace !
            </p>
            <p>
              <strong>Pour bien commencer la réunion</strong>
            </p>
            <ul>
              <li>
                Assurez-vous que chaque participant se présente et explique
                brièvement son rôle pour créer un climat de connaissance
                mutuelle.
              </li>
              <li>
                Présentez ensuite les objectifs et le cadre de la réunion, en
                précisant les règles de communication pour un échange fluide.
              </li>
            </ul>

            <p>
              <strong>Pour suivre le déroulé avec rigueur</strong>
            </p>
            <ul>
              <li>
                Exposez chaque point du déroulé avec clarté, en explicitant son
                objectif, en - veillant à éviter les acronymes et termes
                techniques.
              </li>
              <li>
                Gardez un œil sur l'heure pour respecter le temps imparti,
                recentrez les discussions si elles s'éloignent du sujet.
                Terminez chaque section par un résumé et un rappel des décisions
                prises pour éliminer toute ambiguïté.
              </li>
            </ul>

            <p>
              <strong>Pour encourager la participation active</strong>
            </p>
            <ul>
              <li>
                Offrez à chacun la possibilité de s'exprimer, en créant un
                espace respectueux où différents points de vue sont valorisés.
              </li>
              <li>
                Favorisez un débat sain, en accueillant les opinions diverses et
                en guidant la discussion vers des décisions constructives.
              </li>
            </ul>

            <p>
              <strong>Pour conclure la réunion</strong>
            </p>
            <ul>
              <li>
                Récapitulez les points principaux abordés et les décisions
                prises.
              </li>
              <li>
                Assurez vous que chaque participant connaît les actions à
                entreprendre et les échéances associées.
              </li>
            </ul>
          </>
        ),
        skipLabel: "Oui, je suis prêt à animer",
        askingAdviceLabel: "Non, j'ai besoin de quelques conseils",
        advice: {
          title: "Je n'ai pas préparé l'animation de votre réunion",
          content: (
            <>
              <p>
                Retrouvez nos astuces d'animation pour gérer les moments
                délicats et améliorer votre réunion !
              </p>
              {commonPartLinkCanvas}
            </>
          ),
        },
      },
    ],
  },
  {
    title: "Étape 5 : Assurer un suivi",
    image: <SuiviIcon />,
    ctaLabel: "J'assure un suivi de ma réunion",
    content: (
      <>
        <p>
          Vous est-il déjà arrivé de quitter une réunion sans savoir quelles
          étaient les prochaines étapes ni ce qui était attendu de vous?
        </p>
        <p>
          Pour éviter cela, veillez à partager rapidement un compte rendu clair
          : décisions prises, actions à mener et informations complémentaires.
        </p>
      </>
    ),
    questions: [
      {
        title:
          "Ai-je anticipé de récolter les informations nécessaires pour réaliser le bilan de ma réunion\u00A0?",
        content: (
          <>
            <p>
              Assurez vous de récolter 3 éléments suivants pour suivre les
              décisions prisses :
            </p>
            <ul>
              <li>Quoi : les tâches spécifiques à réaliser</li>
              <li>Qui : la personne responsable de chaque tâche</li>
              <li>
                Quand : la date limite réaliste pour chaque tâche Cette
                structure encourage les participants à respecter leurs
                engagements.
              </li>
            </ul>
          </>
        ),
        skipLabel: "Oui, je sais de quelles informations j'ai besoin",
        askingAdviceLabel: "Non, j'ai besoin de quelques conseils",
        advice: {
          title: "Je n'ai pas réalisé le bilan de ma réunion.",
          content: (
            <>
              <p>Prenez le temps de répondre aux questions suivantes :</p>
              <ul>
                <li>
                  Quelles sont les décisions et les résultats spécifiques de la
                  réunion{"\u00A0"}?
                </li>
                <li>
                  Quelles sont les tâches à accomplir à la suite de la réunion
                  {"\u00A0"}?
                </li>
                <li>Qui est responsable de chaque tâche{"\u00A0"}?</li>
                <li>Quand chacun doit-il accomplir sa tâche{"\u00A0"}?</li>
              </ul>
              {commonPartLinkCanvas}
            </>
          ),
        },
      },
    ],
  },
  {
    title:
      "Félicitations, vous avez trouvé les bonnes questions à vous poser !",
    // image: <SuiviIcon />,
    //ctaLabel: "Je découvre les autres fonctionnalités du Réunio'Kit",
    content: (
      <>
        <p>
          Vous avez suivi toutes les étapes pour vous assurer d'organiser une
          réunion efficace. Pour aller plus loin, retrouvez toutes nos
          fonctionnalités ici !
        </p>
        <div className={styles.cardsContainer}>
          <Card
            background
            border
            desc="Découvrez des déroulés de réunions efficaces clés en main."
            enlargeLink
            horizontal
            imageAlt="texte alternatif de l'image"
            imageUrl="./app/reunion_type/img/reunion-type.png"
            linkProps={{
              href: hrefDerouleType,
            }}
            ratio="33/66"
            size="medium"
            title="Déroulés types"
            titleAs="h3"
            start={
              <ul className="fr-badges-group">
                <li>
                  <Badge>Réunion</Badge>
                </li>
              </ul>
            }
          />
          <Card
            background
            border
            desc="Inspirez-vous grâce à des nouvelles méthodes d'animation."
            enlargeLink
            horizontal
            imageAlt="texte alternatif de l'image"
            imageUrl="./app/fiche/img/methode.png"
            linkProps={{
              href: hrefBibliotheque,
            }}
            ratio="33/66"
            size="medium"
            start={
              <ul className="fr-badges-group">
                <li>
                  <Badge>Atelier collaboratif</Badge>
                </li>
              </ul>
            }
            title="Bibliothèque de méthodes"
            titleAs="h3"
          />
        </div>
      </>
    ),
    questions: [],
  },
];

export const totalSteps = STEPS.length;
