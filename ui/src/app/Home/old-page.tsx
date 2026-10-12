"use client";

// Types & constants
import {
  hrefBibliotheque,
  hrefDerouleFormulaire,
  hrefDerouleType,
  hrefFaq,
} from "@/src/constants/href";

// Style
import styles from "./home.module.scss";

// Components
import Button from "@/src/components/Buttons/Button/Button";
import CardAutresRessources from "@/src/components/Cards/CardAutresRessources/CardAutresRessources";
import CardPresentationLink from "@/src/components/Cards/CardPresentationLink/CardPresentationLink";

// Lib
import Badge from "@codegouvfr/react-dsfr/Badge";

const ReunioKit = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/ReunioKit.svg`;
const generator_icon = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/icon_generator.svg`;
const deroule_icon = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/icon_deroule.svg`;
const book_icon = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/icon_library.svg`;
const icon_button_deroule = `${process.env.NEXT_PUBLIC_ASSETS}/button/img/icon_button_deroule.svg`;
const icon_button_book = `${process.env.NEXT_PUBLIC_ASSETS}/button/img/icon_button_book.svg`;

const disco_pass = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/DiscoPass.jpg`;
const facilitateur_interne = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/Facilitateurs-internes.jpg`;
const pass_innov = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/PassInnov.jpg`;

export default function Home() {
  return (
    <>
      <div className={styles["home-container"]}>
        <div className={styles["img-container"]}>
          <div className={styles["img-container-left"]}>
            <img
              className={styles["middle_container__img__title"]}
              src={ReunioKit}
              alt="logo middle_container reuniokit"
            />
            <img
              src={
                process.env.NEXT_PUBLIC_ASSETS + "/home/img/bercylab__logo.svg"
              }
              alt="bercyLab"
            />
          </div>
        </div>
        <div className={styles["middle_container__group"]}>
          <p>
            Concevez des réunions efficaces et personnalisées, parfaitement
            adaptées aux besoins spécifiques de votre équipe ou de votre projet.
            Avec le Réunio'Kit, concevez vos réunions en vous appuyant sur un
            générateur ou sur des ressources éprouvées.
          </p>
          <div className={styles["middle_container__group_card"]}>
            <CardPresentationLink
              icon={generator_icon}
              buttonIcon={icon_button_deroule}
              text="Mon déroulé sur-mesure"
              buttonLabel="Générateur"
              onButtonClick={() => {}}
              mainColor="#CA84F5"
              href={hrefDerouleFormulaire}
            />
            <CardPresentationLink
              icon={deroule_icon}
              buttonIcon={icon_button_book}
              text="Mes déroulés types de réunion"
              buttonLabel="Déroulés types"
              onButtonClick={() => {}}
              mainColor="#8585F6"
              href={hrefDerouleType}
            />
            <CardPresentationLink
              icon={book_icon}
              buttonIcon={icon_button_book}
              text="Ma bibliothèque de fiches méthodes"
              buttonLabel="Bibliothèque"
              onButtonClick={() => {}}
              mainColor="#DE7899"
              href={hrefBibliotheque}
            />
          </div>
          <div className={styles["middle_container__group_text"]}>
            <div>
              <p>
                Concevoir un déroulé d'atelier qui corresponde à mes objectifs
              </p>
            </div>
            <div>
              <p>Découvrir des déroulés clés en main</p>
              <Badge severity="warning">En construction</Badge>
            </div>
            <div>
              <p>S'inspirer en découvrant de nouvelles méthodes d'animation</p>
            </div>
          </div>
        </div>
        <section className={styles["section-1"]}>
          <h2>Mode d'emploi pour améliorer ma réunion</h2>
          <p>
            Le Réunio'Kit vous offre un cadre méthodologique pour augmenter
            l'efficacité de vos réunions et renforcer l'engagement de vos
            participants. Retrouvez ici l'ensemble des outils pour construire
            votre réunion.
          </p>
          <a href={hrefFaq}>→ En savoir plus</a>
        </section>
        <section className={styles["section-2"]}>
          <h2>
            {" "}
            <img src={generator_icon} alt="" />
            Mon déroulé sur-mesure
          </h2>
          <p>
            Vous avez besoin de créer un déroulé personnalisé à vos besoins ?
            Indiquez simplement le sujet de votre atelier, vos objectifs, le
            lieu, le nombre de participants, la durée souhaitée dans notre
            générateur. Il vous proposera un déroulé complet.
          </p>
          <p>→ Réaliser votre déroulé d'atelier sur-mesure ici :</p>
          <div className={styles["button-container"]}>
            <Button
              buttonColor="#4D1C6B"
              icon={icon_button_deroule}
              text="Générateur"
              href={hrefDerouleFormulaire}
              buttonType={"primary"}
            />
          </div>
        </section>
        <section className={styles["section-3"]}>
          <h2>
            {" "}
            <img src={deroule_icon} alt="" />
            Mes déroulés types de réunion{" "}
            <Badge severity="warning">En construction</Badge>
          </h2>
          <p>
            Vous souhaitez consulter des déroulés de réunion conçus de A à Z ?
            Nous avons élaboré pour vous des déroulés détaillés couvrant divers
            aspects des réunions : la vie et l'organisation de votre service, la
            conduite de projets et des problématiques récurrentes
          </p>
          <p>→ Retrouver des déroulés types ici :</p>

          <div className={styles["button-container"]}>
            <Button
              buttonColor="#000091"
              icon={icon_button_book}
              text="Déroulés types"
              href={hrefDerouleType}
              buttonType={"primary"}
            />
          </div>
        </section>
        <section className={styles["section-4"]}>
          <h2>
            {" "}
            <img src={book_icon} alt="" />
            Ma bibliothèque de fiches méthodes
          </h2>
          <p>
            Vous souhaitez consulter des méthodes d’intelligence collective ?
            Vous pouvez consultez notre bibliothèque de fiches méthodes pour
            vous inspirer, et animer vos réunions en présentiel comme en
            distanciel.
          </p>
          <p>→ Réaliser votre déroulé de réunion sur-mesure ici :</p>
          <div className={styles["button-container"]}>
            <Button
              buttonColor="#AB214E"
              icon={icon_button_book}
              text="Bibliothèque"
              href={hrefBibliotheque}
              buttonType={"primary"}
            />
          </div>
        </section>
        <section className={styles["section-5"]}>
          <h2>D'autres ressources de l’administration</h2>
          <div className={styles["card-container-partner"]}>
            <CardAutresRessources
              titre="Utilo"
              contenu="Le Ti Lab a accompagné sa communauté d’innovateur d’intérêt général dans la conception coopérative d’une boîte à outils partagée de pratiques innovantes et collaboratives."
              partenaire="Utilo"
              url="https://www.utilo.org/"
            />
            <CardAutresRessources
              titre="Guide de facilitation à distance"
              contenu="L'équipe innovation de la Direction interministérielle de la transformation publique a réalisé un guide de facilitation en ligne. L'objectif : donner aux facilitateurs, débutants ou confirmés, des repères pour mieux concevoir et gérer des ateliers de travail collaboratif à distance."
              partenaire="DITP"
              url="https://www.modernisation.gouv.fr/outils-et-formations/guide-de-la-facilitation-distance"
            />
          </div>
        </section>
        <section className={styles["section-6"]}>
          <h2>La Mission Innovation vous propose</h2>
          <a
            className={styles["main_link"]}
            href="https://www.economie.gouv.fr/mission-innovation/qui-sommes-nous"
            target="_blank"
          >
            https://www.economie.gouv.fr/mission-innovation/qui-sommes-nous
          </a>
          <div className={styles["card-container-title"]}>
            <p>Disco Pass</p>
            <p>PassInnov</p>
            <p>Facilitateurs internes</p>
          </div>
          <div className={styles["card-container-text"]}>
            <p>
              Des modules courts de formation pour augmenter l'efficacité de vos
              réunions en présentiel, en distanciel ou en hybride.
            </p>
            <p>
              Un parcours à la carte de modules courts pour vous permettre de
              découvrir l'innovation et le collaboratif.
            </p>
            <p>
              Une formation complète pour devenir facilitateur et apprendre à
              concevoir des démarches d'innovation collaborative.
            </p>
          </div>
          <div className={styles["card-container-mi"]}>
            <img src={disco_pass} alt="" />
            <img src={pass_innov} alt="" />
            <img src={facilitateur_interne} alt="" />
          </div>
          <div className={styles["card-container-link"]}>
            <div className={styles["link-container"]}>
              <a
                href="https://www.economie.gouv.fr/mission-innovation/les-parcours-apprenants/discopass"
                target="_blank"
              >
                Plus d'informations
              </a>
            </div>
            <div className={styles["link-container"]}>
              <a
                href="https://www.economie.gouv.fr/mission-innovation/passinnov"
                target="_blank"
              >
                Plus d'informations
              </a>
            </div>
            <div className={styles["link-container"]}>
              <a
                href="https://www.economie.gouv.fr/mission-innovation/les-parcours-apprenants/parcours-facilita-cœurs"
                target="_blank"
              >
                Plus d'informations
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
