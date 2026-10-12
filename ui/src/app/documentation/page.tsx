"use client";

// Style
import "swagger-ui-react/swagger-ui.css";

// libs
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic import of SwaggerUI
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function Documentation() {
  const [monToken, setMonToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (cookieValue) {
      setMonToken(cookieValue);
    }
  }, []);

  const requestInterceptor = (req: any) => {
    if (monToken) {
      return {
        ...req,
        headers: {
          ...req.headers,
          Authorization: `Bearer ${monToken}`,
        },
      };
    }
    return req;
  };

  return (
    <>
      {monToken ? (
        <SwaggerUI
          url={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/_openapi`}
          requestInterceptor={requestInterceptor}
        />
      ) : null}
    </>
  );
}
