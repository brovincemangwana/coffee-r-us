import { useState, useMemo } from "react";

// Custom hook: owns the search text and the selected origins,
// and returns the filtered list. Any component can reuse it.
function useCoffeeFilters(coffees) {
  const [search, setSearch] = useState("");
  const [selectedOrigins, setSelectedOrigins] = useState([]);

  // Unique, sorted list of origins for the checkboxes.
  // useMemo means this only recalculates when "coffees" changes.
  const origins = useMemo(
    () => [...new Set(coffees.map((coffee) => coffee.origin))].sort(),
    [coffees],
  );

  // Tick or untick an origin
  function toggleOrigin(origin) {
    setSelectedOrigins(
      (prev) =>
        prev.includes(origin)
          ? prev.filter((o) => o !== origin) // already selected, so remove it
          : [...prev, origin], // not selected, so add it
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedOrigins([]);
  }

  // Apply the search AND the origin filter together
  const filteredCoffees = useMemo(() => {
    const term = search.trim().toLowerCase();

    return coffees.filter((coffee) => {
      const matchesSearch =
        term === "" ||
        [coffee.name, coffee.description, coffee.origin].some((field) =>
          field.toLowerCase().includes(term),
        );

      const matchesOrigin =
        selectedOrigins.length === 0 || selectedOrigins.includes(coffee.origin);

      return matchesSearch && matchesOrigin;
    });
  }, [coffees, search, selectedOrigins]);

  return {
    search,
    setSearch,
    origins,
    selectedOrigins,
    toggleOrigin,
    clearFilters,
    filteredCoffees,
  };
}

export default useCoffeeFilters;
