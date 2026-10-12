import { Button, ButtonProps } from "@codegouvfr/react-dsfr/Button";

import { type PropsWithChildren } from "react";

import styles from "./generic-button.module.scss";

type Props = ButtonProps & {
  tint?: "light" | "dark";
};

export const GenericButton = ({
  children,
  tint,
  ...otherProps
}: PropsWithChildren<Props>) => {
  const cn = tint === "dark" ? styles.dark : styles.light;

  if ("linkProps" in otherProps && otherProps.linkProps) {
    return <Button {...otherProps}>{children}</Button>;
  }

  const { className: nativeButtonClassName, ...restNativeButtonProps } =
    otherProps.nativeButtonProps ?? {};

  const className = [styles.button, nativeButtonClassName, cn]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      {...otherProps}
      nativeButtonProps={{
        ...restNativeButtonProps,
        className,
      }}
    >
      {children}
    </Button>
  );
};
