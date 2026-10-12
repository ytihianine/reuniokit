"use client";
import Home from "./Home/page";

export default function HomePage() {
  const fontURLMarianne = `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/Font/marianne/Marianne-Regular.woff`;
  const fontURLChewy = `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/Font/Chewy-Regular.ttf`;

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "marianne";
          src:
            local("marianne"),
            url("${fontURLMarianne}") format("woff");
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: "Chewy";
          src: url("${fontURLChewy}") format("truetype");
          font-weight: normal;
          font-style: normal;
        }

        body {
          font-family: "marianne", sans-serif;
        }
      `}</style>

      <main>
        <Home />
      </main>
    </>
  );
}
