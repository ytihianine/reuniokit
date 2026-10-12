"use client";

// libs
import { hrefMentionsLegales } from "@/src/constants/href";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import styles from "./customfooter.module.scss";

const CustomFooter = () => {
  return (
    <div className={styles.footerWrapper}>
      <Footer
        brandTop={
          <>
            Ministères
            <br />
            économiques
            <br />
            et financiers
          </>
        }
        accessibility="partially compliant"
        contentDescription="
    Si vous souhaitez aller plus loin, vous pouvez trouver des informations complémentaires en naviguant sur les sites ci-dessous
"
        termsLinkProps={{
          href: hrefMentionsLegales,
        }}
        license={
          <>
            Sauf mention contraire, tous les contenus de ce site sont sous {""}
            <a
              href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
              target="_blank"
            >
              licence etalab-2.0
            </a>{" "}
          </>
        }
      />
    </div>
  );
};

export default CustomFooter;
