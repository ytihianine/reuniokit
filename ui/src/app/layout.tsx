// !!!! Mandatory !!!!
import { DsfrProvider } from "../../dsfr-bootstrap";
import {
  DsfrHead,
  getHtmlAttributes,
} from "../../dsfr-bootstrap/server-only-index";

// Style
import "@/src/styles/globals.scss";
import "./globals.css";

// Components
import CustomFooter from "@/src/components/LayoutComponents/CustomFooter/CustomFooter";
import CustomHeader from "@/src/components/LayoutComponents/CustomHeader/CustomHeader";
import { Suspense } from "react";

export const metadata = {
  title: "Reuniokit",
  description: "Réalisé par DSCI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //NOTE: The lang parameter is optional and defaults to "fr"
  const lang = "fr";
  return (
    <html {...getHtmlAttributes({ lang })} style={{ height: "100%" }}>
      <head>
        <DsfrHead />
      </head>
      <body
        style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        <DsfrProvider lang={lang}>
          <CustomHeader />
          <main className="fr-container" style={{ flex: 1 }}>
            <Suspense>{children}</Suspense>
          </main>
          <CustomFooter />
        </DsfrProvider>
      </body>
    </html>
  );
}
