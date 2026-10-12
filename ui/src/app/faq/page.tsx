"use client";

// Styles
import styles from "./Faq.module.scss";

// Components
import Button from "@/src/components/Buttons/Button/Button";

// Libs
import { fr } from "@codegouvfr/react-dsfr";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";

// Constants
import { hrefDerouleType, hrefHome } from "@/src/constants/href";

const icon_button_book = `${process.env.NEXT_PUBLIC_ASSETS}/button/img/icon_button_book.svg`;

export default function Faq() {
  return (
    <>
      <div>
        <Breadcrumb
          currentPageLabel="Qu'est-ce que c'est ?"
          homeLinkProps={{
            href: hrefHome,
          }}
          segments={[]}
        />
      </div>
      <div className={styles.faq}>
        <section className={`${styles.faqSection} ${styles.faqSectionAlt}`}>
          <h2>Une bonne réunion qu'est-ce que ça devrait être ?</h2>
          <p>
            Une bonne réunion est bien plus qu’un simple rassemblement de
            personnes autour d’une table ou d’un écran. C’est un espace et un
            temps dédiés où des flux d’informations sont échangés entre les
            participants dans un but prédéfini.
          </p>
          <p>
            La réussite d’une réunion repose en grande partie sur la préparation
            et la conduite de celle-ci. On ne prépare pas et on n’anime pas de
            la même manière une réunion d’avancement de projet et une réunion de
            créativité. Chacune a ses spécificités et nécessite une approche
            adaptée pour être efficace.
          </p>
        </section>
        <section className={styles.faqSection}>
          <h2>Étapes pour concevoir sa réunion</h2>

          <div className={fr.cx("fr-accordions-group")}>
            <Accordion label="1. Vérifier l'utilité">
              <div>
                <p>
                  Organisez une réunion seulement si elle est indispensable,
                  c’est-à-dire qu’elle ne peut pas être remplacée par un simple
                  échange d’e-mails ou un appel téléphonique. Avant de planifier
                  une réunion, il est crucial de s’assurer de son utilité, cela
                  permet d’éviter de mobiliser inutilement les ressources et le
                  temps des participants.
                </p>
                <p>
                  Pour évaluer la pertinence d’une réunion, posez-vous les
                  questions suivantes :
                </p>
                <ul>
                  <li>
                    Avons-nous réellement besoin de réunir des personnes autour
                    de ce sujet ? Existe-t-il une autre solution que monter une
                    réunion ?
                  </li>
                  <li>
                    Qu’attendons-nous de cette réunion en termes d’objectifs ou
                    de livrables ?
                  </li>
                  <li>
                    Dans quel contexte se tient cette réunion ? Quel est le
                    besoin et de qui ?
                  </li>
                </ul>
              </div>
            </Accordion>
            <Accordion label="2. Définir son objectif">
              <p>
                Définissez clairement un ou plusieurs objectifs, qui doivent
                être communiqués aux participants à l’avance. L’objectif de la
                réunion doit être formulé de manière claire et précise. Les
                objectifs varient en fonction du type de réunion. On peut
                distinguer principalement deux types : la réunion de projet, qui
                comprend les ateliers de travail et de créativité, et la réunion
                de service.
              </p>
              <h4>La réunion de projet</h4>
              <p>
                La réunion de projet est centrée sur la gestion et la production
                au sein d’un projet. Elle peut servir à :
              </p>
              <ul>
                <li>
                  Partager une vision : Aligner les membres d’un groupe sur une
                  vision commune pour l’avenir, créant un sentiment de
                  compréhension partagée et d’engagement envers un objectif
                  commun.
                </li>
                <li>
                  Résoudre une problématique : Analyser un problème, identifier
                  ses causes profondes et trouver des solutions.
                </li>
                <li>
                  Générer des idées : Stimuler la créativité et explorer
                  différents modes de réflexion à travers des sessions de
                  brainstorming.
                </li>
                <li>
                  Prendre une décision : Rassembler les idées, opinions et
                  connaissances des membres du groupe, puis évaluer et choisir
                  les meilleures options.
                </li>
                <li>
                  Répartir les tâches : Analyser les compétences et les intérêts
                  de chacun pour assigner les rôles et les objectifs, partager
                  de l’information sur l’avancement d’un projet.
                </li>
                <li>
                  Formaliser un projet : Clarifier les enjeux, identifier les
                  parties prenantes, et optimiser une proposition.
                </li>
                <li>
                  Prototyper : Matérialiser des solutions pour tester leur
                  pertinence.
                </li>
                <li>
                  Faire un bilan : Retour d’expérience et évaluation des
                  résultats pour améliorer les futures actions.
                </li>
              </ul>

              <h4>La réunion de service</h4>
              <p>
                La réunion de service vise à animer une équipe autour de la vie
                et de l’organisation du service. Ses objectifs sont généralement
                de partager des informations importantes de manière régulière au
                sein d’un groupe de collaborateurs qui a l’habitude de
                travailler ensemble.
              </p>
            </Accordion>
            <Accordion label="3. Convoquer les personnes nécessaires et utiles">
              <p>
                Invitez uniquement les personnes dont la présence est nécessaire
                pour atteindre l’objectif ou pour partager la bonne information.
                Trop de participants peuvent diluer l’efficacité de la réunion,
                tandis qu’un nombre insuffisant peut conduire à omettre des
                perspectives importantes.
              </p>
              <p>
                Si le nombre est trop important, il faut adapter les techniques
                d’animation et prévoir une expertise en facilitation pour
                maintenir l’efficacité. Si besoin, vous pouvez contacter le
                BercyLab sur bercylab@finances.gouv.fr pour vous accompagner ou
                la Mission Innovation sur mission-innovation@fiannces.gouv.fr
                pour vous former.
              </p>
              <p>
                Ensuite, identifiez les compétences et les connaissances
                nécessaires pour chaque séquence de la réunion. Il conviendra
                éventuellement de fournir aux participants le bon niveau de
                connaissance, en amont ou lors d’une séquence de la réunion.
              </p>
              <p>
                Il est important d’engager les participants en amont.
                Informez-les à l’avance de l’objectif, de l’ordre du jour, du
                lieu et de l’heure de la réunion. Il faut clarifier ce qui sera
                traité et ce qu’on attend d’eux. Cela permet aux participants de
                se préparer efficacement et de comprendre leur rôle dans
                l’atteinte de l’objectif global.
              </p>
            </Accordion>
            <Accordion label="4. Désigner l'animateur et les autre rôles pertinents">
              <p>
                Choisissez un animateur avec les compétences et le temps pour
                préparer la réunion, et si nécessaire définissez les rôles
                complémentaires.
              </p>
              <p>
                Selon la typologie de réunion, les critères de désignation de
                l’animateur peuvent être différents. Pour des réunions de
                service, l’animateur peut être pleinement participant au même
                titre que les autres personnes. Pour des réunions de projet,
                l’animateur doit être capable de rester neutre par rapport au
                sujet afin de libérer la parole des participants.
              </p>
              <p>
                L’animateur peut avoir plusieurs rôles, au besoin il peut être
                accompagné par d’autres animateurs ou des experts. Des rôles
                complémentaires peuvent être distribués, tels que le scribe pour
                la prise de notes, le gardien du temps pour gérer la durée des
                discussions, ou encore des relais en cas de groupe important.
              </p>
            </Accordion>
            <Accordion label="5. Définir le déroulé">
              <p>
                Élaborez un plan détaillé pour la réunion afin d’éviter les
                dérives. Commencez par une activité d'inclusion, telle qu'un
                brise-glace, pour instaurer un climat de confiance. Cette
                activité permettra aux participants de se connaître, de se
                mettre en dynamique, de renforcer l’esprit d’équipe ou de
                stimuler leur créativité. Prévoyez également un temps de clôture
                en fin de réunion, permettant à chacun de partager son
                expérience et de faire un bilan personnel.
              </p>
              <p>
                Organisez la réunion en plusieurs séquences, chacune orientée
                vers un objectif précis. Chaque séquence doit correspondre à une
                intention, avec des points spécifiques à aborder et une durée
                allouée. Cette structure aide à maintenir le focus sur les
                sujets importants.
              </p>
              <p>
                Il est essentiel de définir qui animera chaque séquence, comment
                elle sera animée et combien de temps elle prendra. Cela permet
                de vérifier à l'avance que le temps alloué est réaliste, de
                choisir les méthodes d’animation appropriées et d'informer les
                participants de leurs rôles pendant la réunion.
              </p>
              <p>
                L’animateur doit également s’assurer de la logistique : disposer
                des supports nécessaires, organiser le lieu et préparer les
                outils pour les réunions à distance, etc.
              </p>
            </Accordion>
            <Accordion label="6. Définir les formes de l'animation">
              <p>
                Adaptez le mode d’animation en fonction de vos objectifs et des
                participants. Selon vos besoins, vous pouvez organiser vos
                réunions en présentiel, à distance ou en mode hybride. De
                manière non exhaustive, voici quelques conseils pour chaque mode
                de réunion.
              </p>
              <p>
                Pour des réunions en distanciel, assurez-vous que le matériel
                (caméra, microphone) est en parfait état de fonctionnement et
                encouragez les participants à faire de même. Familiarisez-vous
                avec les outils de visioconférence et les plateformes
                collaboratives pour optimiser l’expérience.
              </p>
              <p>
                Pour des réunions en présentiel, préparez soigneusement l’espace
                en amont en adéquation avec l’état d’esprit souhaité de la
                réunion : disposez le matériel nécessaire et vérifiez la
                configuration de la salle.
              </p>
              <p>
                Pour des réunions hybrides, il est recommandé que chaque
                participant soit connecté individuellement depuis son propre
                ordinateur pour assurer une interaction fluide et équitable
                entre les participants en ligne et ceux présents sur place.
                N’hésitez pas à vous appuyer sur un animateur relais concentré
                sur les personnes à distance.
              </p>
            </Accordion>
            <Accordion label="7. Conduire la réunion">
              <p>
                Au démarrage, il est essentiel pour l’animateur de rappeler
                l’objectif de la réunion pour aligner tous les participants sur
                une vision commune. Pendant la réunion, l’animateur veille à ce
                que chaque participant puisse apporter sa contribution dans le
                cadre de la partie qui lui a été affectée. À la fin de la
                réunion, l’animateur valide si l’objectif a été atteint.
              </p>
            </Accordion>
            <Accordion label="8. Suivre les décisions">
              <p>
                Assurez vous du suivi des décisions après la réunion, il s’agit
                ici de s’assurer que la réunion a bien eu les effets escomptés.
                Il est essentiel de garantir que les décisions prises pendant la
                réunion sont effectivement mises en œuvre et que les actions
                convenues sont suivies.
              </p>
            </Accordion>
          </div>
        </section>

        <section
          className={`${styles.faqSection} ${styles.faqSectionHighlight}`}
        >
          <h4>→ Retrouver des déroulés types ici :</h4>
          <Button
            buttonColor="#000091"
            icon={icon_button_book}
            text="Déroulés types"
            href={hrefDerouleType}
            buttonType={"primary"}
          />
        </section>
      </div>
    </>
  );
}
