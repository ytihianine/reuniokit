"use client";
import Link from "next/link";
import React from "react";
import Button from "../../Buttons/Button/Button";
import styles from "./card-presentation-link.module.scss";

interface CardPresentationLinkProps {
  icon: string;
  text: string;
  buttonLabel: string;
  buttonIcon?: string;
  onButtonClick?: () => void;
  href?: string;
  mainColor?: string;
}

interface CustomCSSProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

const adjustColor = (color: string, amount: number) => {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;
  let b = ((num >> 8) & 0x00ff) + amount;
  let g = (num & 0x0000ff) + amount;

  r = Math.min(255, Math.max(0, r));
  b = Math.min(255, Math.max(0, b));
  g = Math.min(255, Math.max(0, g));

  return (
    (usePound ? "#" : "") +
    (g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")
  );
};

const CardPresentationLink: React.FC<CardPresentationLinkProps> = ({
  icon,
  text,
  buttonLabel,
  buttonIcon,
  onButtonClick,
  href,
  mainColor,
}) => {
  let containerClassName = styles.cardPresentationLinkContainer;
  const containerStyle: CustomCSSProperties = {};

  if (mainColor) {
    const bgColor = adjustColor(mainColor, 100);
    const textColor = adjustColor(mainColor, -150);
    const hoverBgColor = adjustColor(textColor, 70);
    containerClassName += ` ${styles.dynamicColor}`;
    containerStyle["--card-border-color"] = mainColor;
    containerStyle["--card-bg-color"] = bgColor;
    containerStyle["--card-text-color"] = textColor;
    containerStyle["--button-hover-bg-color"] = hoverBgColor;
  }

  return (
    <div className={containerClassName} style={containerStyle}>
      {href && (
        <Link href={href} className={styles.link}>
          Lien
        </Link>
      )}
      <div className={styles.cardPresentationLinkIcon}>
        <img src={icon} alt="" />
      </div>
      <p className={styles.cardPresentationLinkText}>{text}</p>
      <div className={styles.cardPresentationLinkButton}>
        <Button
          buttonType="primary"
          text={buttonLabel}
          onClick={onButtonClick}
          buttonColor={containerStyle["--card-text-color"] as string} // Utiliser la couleur de texte calculée
          icon={buttonIcon} // Passer l'icône pour le bouton
        />
      </div>
    </div>
  );
};

export default CardPresentationLink;
