"use client";

import { useState } from "react";

export default function TestGristPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await fetch(`/api/grist/reunion_type`);

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const reunionTypes = data.records;

      // Pour chaque réunion type, on va chercher les déroulés associés
      const results = await Promise.all(
        reunionTypes.map(async (rt: any) => {
          const derouleRes = await fetch(
            `/api/grist/reunion_type_deroule/${rt.id}`,
          );
          let deroules = [];
          if (derouleRes.ok) {
            const derouleData = await derouleRes.json();
            deroules = derouleData.records;
          }
          return { ...rt, deroules };
        }),
      );
      setData(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Test Grist API</h1>

      <div className="mb-6">
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Chargement..." : "Récupérer les données de Reunion_type"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erreur:</strong> {error}
        </div>
      )}

      {data.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Résultats ({data.length} enregistrements)
          </h2>
          <div className="space-y-6">
            {data.map((rt, idx) => (
              <div key={rt.id} className="bg-gray-100 p-4 rounded">
                <h3 className="font-bold text-lg mb-2">
                  Réunion type : {rt.intitule} (ID: {rt.id})
                </h3>
                <div className="mb-2">
                  <strong>Durée :</strong> {rt.dureeMin} - {rt.dureeMax} min
                  <br />
                  <strong>Participants :</strong> {rt.participantsMin} -{" "}
                  {rt.participantsMax}
                  <br />
                  <strong>Typologie :</strong> {rt.typologieReunion}
                  <br />
                  <strong>Modalité :</strong> {rt.modalitePresentation}
                  <br />
                  <strong>Résumé :</strong>
                  <ul className="list-disc ml-6">
                    {rt.resume.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Déroulés associés (JSON brut) :</strong>
                  <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                    {JSON.stringify(rt.deroules, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-500">
          Cliquez sur le bouton pour récupérer les données de Grist
        </p>
      )}
    </div>
  );
}
