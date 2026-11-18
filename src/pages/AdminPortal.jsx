import { useState, useEffect } from "react";
import CoffeeForm from "../components/CoffeeForm";
import AdminCoffeeRow from "../components/AdminCoffeeRow";

const API_URL = "http://localhost:3001/coffees";

function AdminPortal() {
  const [coffees, setCoffees] = useState([]);
  const [message, setMessage] = useState("");

  // GET: load the existing coffees once when the page opens
  useEffect(() => {
    async function loadCoffees() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load coffees");
        setCoffees(await response.json());
      } catch (err) {
        setMessage(`Error: ${err.message}`);
      }
    }
    loadCoffees();
  }, []);

  // POST: add a new coffee, then append it to the list on screen
  async function addCoffee(newCoffee) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoffee),
      });
      if (!response.ok) throw new Error("Could not save coffee");

      const saved = await response.json();
      setCoffees((prev) => [...prev, saved]);
      setMessage(`"${saved.name}" was added to the shop.`);
      return true;
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      return false;
    }
  }

  // PATCH: update only the changed fields of one coffee (by id)
  async function updateCoffee(id, changes) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (!response.ok) throw new Error("Could not update coffee");

      const updated = await response.json();
      // Replace the old version of this coffee with the updated one
      setCoffees((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setMessage(`"${updated.name}" was updated.`);
      return true;
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      return false;
    }
  }

  return (
    <section className="admin">
      <div className="admin-card">
        <h1>Add a Coffee</h1>
        <CoffeeForm onSubmit={addCoffee} />
        {message && <p className="form-message">{message}</p>}
      </div>

      <div className="admin-card">
        <h1>Manage Coffees</h1>
        <ul className="admin-list">
          {coffees.map((coffee) => (
            <AdminCoffeeRow key={coffee.id} coffee={coffee} onUpdate={updateCoffee} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AdminPortal;