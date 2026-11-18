import { useState, useEffect } from "react";
import CoffeeContext from "./CoffeeContext";

const API_URL = "http://localhost:3001/coffees";

// Wraps the app and shares the coffee data with every page
function CoffeeProvider({ children }) {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET: runs once when the app starts
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

  // POST: saves a new coffee, then adds it to the shared list.
  // These functions throw on failure, so the page that calls them
  // decides how to show the error.
  async function addCoffee(newCoffee) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCoffee),
    });
    if (!response.ok) throw new Error("Could not save coffee");

    const saved = await response.json();
    setCoffees((prev) => [...prev, saved]);
    return saved;
  }

  // PATCH: updates only the changed fields, then swaps the coffee in the list
  async function updateCoffee(id, changes) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
    if (!response.ok) throw new Error("Could not update coffee");

    const updated = await response.json();
    setCoffees((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  }

  // Everything components are allowed to use
  const value = { coffees, loading, error, addCoffee, updateCoffee };

  return (
    <CoffeeContext.Provider value={value}>{children}</CoffeeContext.Provider>
  );
}

export default CoffeeProvider;
