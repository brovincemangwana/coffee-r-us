import { useState, useEffect } from "react";
import CoffeeCard from "../components/CoffeeCard";
import FilterSidebar from "../components/FilterSidebar";
import useCoffeeFilters from "../hooks/useCoffeeFilters";

const API_URL = "http://localhost:3001/coffees";

function Shop() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // All search and filter logic lives in the custom hook
  const {
    search,
    setSearch,
    origins,
    selectedOrigins,
    toggleOrigin,
    clearFilters,
    filteredCoffees,
  } = useCoffeeFilters(coffees);

  useEffect(() => {
    let cancelled = false;

    async function fetchCoffees() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load coffees");
        const data = await response.json();
        if (!cancelled) setCoffees(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCoffees();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="status">Loading coffees...</p>;
  if (error) return <p className="status">Error: {error}</p>;

  return (
    <section className="shop-layout">
      <FilterSidebar
        search={search}
        onSearchChange={setSearch}
        origins={origins}
        selectedOrigins={selectedOrigins}
        onToggleOrigin={toggleOrigin}
        onClear={clearFilters}
      />

      <div className="coffee-grid">
        {filteredCoffees.length === 0 ? (
          <p className="status no-results">No coffees match your search.</p>
        ) : (
          filteredCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))
        )}
      </div>
    </section>
  );
}

export default Shop;
