"use client";

import styles from "./deroule_type.module.scss";

import CardDerouleType from "@/src/components/Cards/CardDerouleType/CardDerouleType";
import Filtre, {
  FilterGroup,
  Option,
  generateFilterGroup,
} from "@/src/components/Filtre/Filtre";
import { wordingHeaders } from "@/src/constants/wording";
import { formatDuree } from "@/src/lib/utils/duree";
import { ReunionType } from "@/src/types/models/reunion-type";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMemo, useState } from "react";

const filterDeroules = (
  deroules: ReunionType[],
  selectedFilters: Record<string, Option>,
  searchTerm: string,
) => {
  return deroules.filter((deroule) => {
    if (
      selectedFilters["Durée"]?.value &&
      deroule.dureeMax.toString() !== selectedFilters["Durée"].value
    ) {
      return false;
    }

    if (
      selectedFilters["Typologie"]?.value &&
      deroule.typologieReunion !== selectedFilters["Typologie"].value
    ) {
      return false;
    }

    if (
      selectedFilters["Format"]?.value &&
      deroule.modalitePresentation !== selectedFilters["Format"].value
    ) {
      return false;
    }

    if (searchTerm) {
      const matchIntitule = deroule.intitule
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const resumeStr = Array.isArray(deroule.resume)
        ? deroule.resume.join(" ")
        : deroule.resume || "";
      const matchResume = resumeStr
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchIntitule || matchResume;
    }

    return true;
  });
};

const FILTER_LABELS = ["Typologie", "Durée max", "Format"] as const;

interface Props {
  reunionTypes: ReunionType[];
}

export default function DerouleTypeClient({ reunionTypes }: Props) {
  const [animationParent] = useAutoAnimate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<(typeof FILTER_LABELS)[number], Option>>
  >({});

  const filterGroups = useMemo<
    FilterGroup<(typeof FILTER_LABELS)[number]>[]
  >(() => {
    const durees = [...new Set(reunionTypes.map((d) => d.dureeMax))].sort(
      (a, b) => a - b,
    );
    const typologies = [
      ...new Set(reunionTypes.map((d) => d.typologieReunion).filter(Boolean)),
    ].sort();

    return [
      generateFilterGroup(
        "Typologie",
        typologies,
        (t) => t,
        (t) => t,
      ),
      generateFilterGroup(
        "Durée max",
        durees,
        (d) => formatDuree(d),
        (d) => d.toString(),
      ),
      generateFilterGroup(
        "Format",
        [
          ...new Set(
            reunionTypes.map((d) => d.modalitePresentation).filter(Boolean),
          ),
        ].sort(),
        (f) => f,
        (f) => f,
      ),
    ];
  }, [reunionTypes]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onFilterChange = (selectedValue: Option, groupIndex: number) => {
    const groupLabel = filterGroups[groupIndex]?.label;
    if (groupLabel) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [groupLabel]: selectedValue,
      }));
    }
  };

  const filteredDeroules = filterDeroules(
    reunionTypes,
    selectedFilters,
    searchTerm,
  );

  return (
    <>
      <Breadcrumb
        currentPageLabel={wordingHeaders["réunion type"].xl}
        homeLinkProps={{
          href: `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/`,
        }}
        segments={[]}
      />
      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>{wordingHeaders["réunion type"].xl}</h1>

          <section>
            Les fiches de réunions types vous permettent d'accéder à des
            exemples de modèles de réunions déjà testées, pour vous permettre
            une planification rapide et complète. Ce sont des inspirations,
            n'hésitez pas à les adapter à votre besoin.
          </section>

          <div className={styles.hr} />

          <div className={styles.filterBar}>
            <p className={styles.filterTitle}>Filtres</p>
            <div className={styles.searchContainer}>
              <div className={styles.filterControls}>
                <div className={styles.filterLeft}>
                  <Filtre
                    filterGroups={filterGroups}
                    selectedFilters={selectedFilters}
                    onFilterChange={onFilterChange}
                  />
                </div>
                <div className={styles.filterRight}>
                  <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </div>
              </div>
              <div className={styles.filterTags}>
                {Object.entries(selectedFilters)
                  .filter(([_, filterValue]) => filterValue.value)
                  .map(([filterLabel, filterValue]) => {
                    const label = filterLabel as (typeof FILTER_LABELS)[number];
                    return (
                      <Tag
                        key={label}
                        dismissible
                        nativeButtonProps={{
                          onClick: () => {
                            const newSelectedFilters = { ...selectedFilters };
                            delete newSelectedFilters[label];
                            setSelectedFilters(newSelectedFilters);
                          },
                        }}
                      >
                        {filterValue.label}
                      </Tag>
                    );
                  })}
              </div>
            </div>
          </div>

          <div ref={animationParent} className={styles.cardGrid}>
            {filteredDeroules.map((reunionType) => (
              <CardDerouleType key={reunionType.id} reunionType={reunionType} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
