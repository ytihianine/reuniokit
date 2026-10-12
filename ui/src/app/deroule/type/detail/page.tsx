import {
  getReunionType,
  getReunionTypeDeroule,
} from "@/src/lib/grist/reunion-types";
import { notFound } from "next/navigation";
import DerouleTypeDetailClient from "./DerouleTypeDetailClient";

interface Props {
  searchParams: Promise<{ derouleType?: string }>;
}

export default async function DerouleTypeDetailPage({ searchParams }: Props) {
  const { derouleType } = await searchParams;
  const id = derouleType ? parseInt(derouleType, 10) : NaN;

  if (isNaN(id)) notFound();

  const [reunionType, deroule] = await Promise.all([
    getReunionType(id),
    getReunionTypeDeroule(id),
  ]);

  return (
    <DerouleTypeDetailClient derouleType={{ ...reunionType, ...deroule }} />
  );
}
