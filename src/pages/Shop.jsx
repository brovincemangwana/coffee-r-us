import { useState, useEffect } from "react";
import CoffeeCard from "../components/CoffeeCard";

const API_URL = "http://localhost:3001/coffees";

function Shop() {
  // Three pieces of state: the data, a loading flag, and an error message
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs once after the first render (empty dependency array)
  useEffect(() => {
    // Guards against updating state if the component unmounts mid-request
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
      {/* Sidebar for search and location filters (added in Step 7) */}
      <aside className="sidebar"></aside>

      <div className="coffee-grid">
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </section>
  );
}

export default Shop;