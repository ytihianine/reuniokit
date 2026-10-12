export function formatDuree(duree: number): string {
  if (duree < 60) return `${duree} min`;
  const heures = Math.floor(duree / 60);
  const minutes = duree % 60;
  return minutes === 0 ? `${heures}h` : `${heures}h${minutes}`;
}
