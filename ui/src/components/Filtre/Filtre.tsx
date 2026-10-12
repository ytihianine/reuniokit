"use client";

export interface Option {
  label: string;
  value: string;
}

export interface FilterGroup<L extends string> {
  label: L;
  options: Option[];
}

export interface FiltreProps<T extends readonly string[]> {
  filterGroups: (FilterGroup<T[number]> | undefined)[];
  selectedFilters: Record<string, Option>;
  onFilterChange: (filter: Option, groupIndex: number) => void;
  color?: "blue" | "red";
}

// Style
import "./filtre.scss";

/**
 * Fonction générique pour générer un FilterGroup typé via le label
 */
export function generateFilterGroup<L extends string, V>(
  label: L,
  values: V[],
  getLabel: (v: V) => string,
  getValue: (v: V) => string,
): FilterGroup<L> {
  return {
    label,
    options: values.map((v) => ({
      label: getLabel(v),
      value: getValue(v),
    })),
  };
}

function Filtre<T extends readonly string[]>({
  filterGroups,
  onFilterChange,
  color = "blue",
}: FiltreProps<T>) {
  if (!filterGroups.length) return null;

  return (
    <div className="filtreContainer">
      {filterGroups
        .filter((group): group is FilterGroup<T[number]> => group !== undefined)
        .map((group, groupIndex) => (
          <div
            key={group.label}
            className={`filtreGroup filtreGroup${color.charAt(0).toUpperCase() + color.slice(1)}`}
          >
            <select
              value={group.label || ""}
              onChange={(e) =>
                onFilterChange(
                  {
                    label: e.target.selectedOptions[0].label,
                    value: e.target.value,
                  },
                  groupIndex,
                )
              }
            >
              <option value="">{group.label}</option>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
    </div>
  );
}

export default Filtre;
