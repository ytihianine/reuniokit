"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";
import {
  revalidateAstuces,
  revalidateReunionTypes,
  verifyKey,
} from "./actions";

export default function DebugPage() {
  const [keyInput, setKeyInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const valid = await verifyKey(keyInput);
    if (valid) {
      setAuthenticated(true);
    } else {
      setError("Clé incorrecte.");
    }
    setPending(false);
  }

  async function handleRevalidate(action: () => Promise<void>, label: string) {
    setPending(true);
    setMessage(null);
    await action();
    setMessage(`Cache "${label}" revalidé avec succès.`);
    setPending(false);
  }

  if (!authenticated) {
    return (
      <main style={{ maxWidth: 480, margin: "4rem auto", padding: "0 1rem" }}>
        <h1>Accès restreint</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Clé d'accès"
            state={error ? "error" : "default"}
            stateRelatedMessage={error ?? undefined}
            nativeInputProps={{
              type: "password",
              value: keyInput,
              onChange: (e) => setKeyInput(e.target.value),
              autoComplete: "current-password",
            }}
          />
          <Button type="submit" disabled={pending || keyInput.length === 0}>
            Soumettre
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 480, margin: "4rem auto", padding: "0 1rem" }}>
      <h1>Revalidation du cache</h1>
      <p>Déclenchez manuellement la revalidation des caches.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button
          onClick={() => handleRevalidate(revalidateAstuces, "astuces")}
          disabled={pending}
        >
          Recharger — Astuces d'animation
        </Button>
        <Button
          onClick={() =>
            handleRevalidate(revalidateReunionTypes, "réunions types")
          }
          disabled={pending}
        >
          Recharger — Réunions types
        </Button>
      </div>
      {message && (
        <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>
      )}
    </main>
  );
}
