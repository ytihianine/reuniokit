"use client";

import styles from "./bibliotheque.module.scss";

import CardLibrary from "@/src/components/Cards/CardLibrary/CardLibrary";
import Filtre, {
  FilterGroup,
  Option,
  generateFilterGroup,
} from "@/src/components/Filtre/Filtre";
import { wordingHeaders } from "@/src/constants/wording";
import { formatDuree } from "@/src/lib/utils/duree";
import { FicheMethodeWithObjectifContenu } from "@/src/types/models/bibliotheque";
import { fr } from "@codegouvfr/react-dsfr";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const book_icon = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/icon_library.svg`;

const FILTER_LABELS = ["Objectif", "Durée"] as const;

function ScrollableRow({
  fiches,
}: {
  fiches: FicheMethodeWithObjectifContenu[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [fiches, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstSlot = el.children[0] as HTMLElement | undefined;
    const gap = parseFloat(getComputedStyle(el).gap) || 24;
    const slotWidth = firstSlot ? firstSlot.offsetWidth + gap : 280;
    el.scrollBy({
      left: direction === "right" ? slotWidth : -slotWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.scrollSection}>
      <button
        className={styles.scrollBtn}
        onClick={() => scroll("left")}
        aria-label="Défiler vers la gauche"
        disabled={!canScrollLeft}
      >
        <span className={fr.cx("fr-icon-arrow-left-s-line")} aria-hidden />
      </button>
      <div
        ref={scrollRef}
        className={styles.scrollRow}
        onScroll={updateScrollState}
      >
        {fiches.map((fiche) => (
          <div key={fiche.id} className={styles.cardSlot}>
            <CardLibrary fiche={fiche} />
          </div>
        ))}
      </div>
      <button
        className={styles.scrollBtn}
        onClick={() => scroll("right")}
        aria-label="Défiler vers la droite"
        disabled={!canScrollRight}
      >
        <span className={fr.cx("fr-icon-arrow-right-s-line")} aria-hidden />
      </button>
    </div>
  );
}

const filterFiches = (
  fiches: FicheMethodeWithObjectifContenu[],
  selectedFilters: Record<string, Option>,
  searchTerm: string,
) => {
  return fiches.filter((fiche) => {
    if (
      selectedFilters["Objectif"]?.value &&
      fiche.objectifText !== selectedFilters["Objectif"].value
    ) {
      return false;
    }

    if (
      selectedFilters["Durée"]?.value &&
      fiche.dureeMax.toString() !== selectedFilters["Durée"].value
    ) {
      return false;
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchIntitule = fiche.intitule.toLowerCase().includes(term);
      const matchObjectifContenu =
        fiche.objectifContenu?.toLowerCase().includes(term) ?? false;
      return matchIntitule || matchObjectifContenu;
    }

    return true;
  });
};

interface Props {
  fiches: FicheMethodeWithObjectifContenu[];
}

export default function BibliothequeClient({ fiches }: Props) {
  const [animationParent] = useAutoAnimate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Option>
  >({});

  const filterGroups = useMemo<
    FilterGroup<(typeof FILTER_LABELS)[number]>[]
  >(() => {
    const objectifs = [
      ...new Set(fiches.map((f) => f.objectifText).filter(Boolean)),
    ].sort();
    const durees = [...new Set(fiches.map((f) => f.dureeMax))].sort(
      (a, b) => a - b,
    );

    return [
      generateFilterGroup(
        "Objectif",
        objectifs,
        (o) => o,
        (o) => o,
      ),
      generateFilterGroup(
        "Durée",
        durees,
        (d) => formatDuree(d),
        (d) => d.toString(),
      ),
    ];
  }, [fiches]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onFilterChange = (selectedValue: Option, groupIndex: number) => {
    const groupLabel = filterGroups[groupIndex]?.label;
    if (groupLabel) {
      setSelectedFilters((prev) => ({ ...prev, [groupLabel]: selectedValue }));
    }
  };

  const filteredFiches = filterFiches(fiches, selectedFilters, searchTerm);

  const fichesByObjectif = useMemo(() => {
    const groups = new Map<string, FicheMethodeWithObjectifContenu[]>();
    for (const fiche of filteredFiches) {
      const key = fiche.objectifText || "Autre";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(fiche);
    }
    return [...groups.entries()].map(([objectif, items]) => ({
      objectif,
      fiches: items,
    }));
  }, [filteredFiches]);

  return (
    <>
      <div className={styles.breadcrumbContainer}>
        <Breadcrumb
          currentPageLabel={wordingHeaders["bibliothèque fiches méthodes"].xl}
          homeLinkProps={{
            href: `${process.env.NEXT_PUBLIC_DEPLOIEMENT}/`,
          }}
          segments={[]}
        />
      </div>
      <div className={styles.globalContainer}>
        <div className={styles.pageTitle}>
          <img src={book_icon} alt="" />
          <h1>{wordingHeaders["bibliothèque fiches méthodes"].xl}</h1>
        </div>
        <hr />

        <div className={styles.filterBar}>
          <p className={styles.filterTitle}>Filtres</p>
          <div className={styles.searchContainer}>
            <div className={styles.filterControls}>
              <div className={styles.filterLeft}>
                <Filtre
                  filterGroups={filterGroups}
                  selectedFilters={selectedFilters}
                  onFilterChange={onFilterChange}
                  color="red"
                />
              </div>
              <div className={styles.filterRight}>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div className={styles.filterTags}>
              {Object.entries(selectedFilters)
                .filter(([_, filterValue]) => filterValue.value)
                .map(([filterName, filterValue]) => {
                  const label = filterName as (typeof FILTER_LABELS)[number];
                  return (
                    <Tag
                      key={label}
                      dismissible
                      nativeButtonProps={{
                        onClick: () => {
                          const next = { ...selectedFilters };
                          delete next[filterName];
                          setSelectedFilters(next);
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

        <div ref={animationParent} className={styles.mainContainerCard}>
          {fichesByObjectif.map(({ objectif, fiches: fichesGroup }) => (
            <div key={objectif} className={styles.cardsSection}>
              <div className={styles.titleBar}>
                <h2 className={styles.titleBarTitle}>
                  {objectif} ({fichesGroup.length})
                </h2>
              </div>
              <ScrollableRow fiches={fichesGroup} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
