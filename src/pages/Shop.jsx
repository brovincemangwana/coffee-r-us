import CoffeeCard from "../components/CoffeeCard";
import FilterSidebar from "../components/FilterSidebar";
import useCoffees from "../hooks/useCoffees";
import useCoffeeFilters from "../hooks/useCoffeeFilters";

function Shop() {
  // Shared data from context
  const { coffees, loading, error } = useCoffees();

  // Search and filter logic from the other custom hook
  const {
    search,
    setSearch,
    origins,
    selectedOrigins,
    toggleOrigin,
    clearFilters,
    filteredCoffees,
  } = useCoffeeFilters(coffees);

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