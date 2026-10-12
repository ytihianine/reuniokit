"use client";
import Link from "next/link";
import React from "react";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonType: "primary" | "secondary" | "tertiary";
  icon?: string;
  className?: string | undefined;
  buttonColor?: string;
  href?: string; // Ajout de la prop href pour les liens
  onClick?: React.MouseEventHandler<HTMLElement>;
}

// Fonction pour ajuster la luminosité des couleurs en JSX
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

const Button: React.FC<ButtonProps> = ({
  text,
  buttonType,
  icon,
  className,
  buttonColor,
  href,
  onClick,
  ...props
}) => {
  const hoverColor = buttonColor ? adjustColor(buttonColor, 40) : "#6A2D8A";

  const buttonStyle = {
    "--button-bg-color": buttonColor || "#4D1C6B",
    "--button-hover-bg-color": hoverColor,
  } as React.CSSProperties;

  const buttonContent = (
    <button
      className={`Button ${className || ""}`}
      style={buttonStyle}
      {...props}
    >
      {icon && <img src={icon} alt="Icon" />}
      {text}
    </button>
  );

  const buttonTypeClass = `button${buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}`;

  return href ? (
    <Link href={href} className={buttonTypeClass} style={buttonStyle}>
      {buttonContent}
    </Link>
  ) : (
    <div className={buttonTypeClass} onClick={onClick}>
      {buttonContent}
    </div>
  );
};

export default Button;
