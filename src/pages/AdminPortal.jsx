import { useState } from "react";
import CoffeeForm from "../components/CoffeeForm";

const API_URL = "http://localhost:3001/coffees";

function AdminPortal() {
  const [message, setMessage] = useState("");

  // POST request: sends a new coffee to the backend.
  // Returns true on success so the form knows it can clear itself.
  async function addCoffee(newCoffee) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoffee),
      });
      if (!response.ok) throw new Error("Could not save coffee");

      const saved = await response.json();
      setMessage(`"${saved.name}" was added to the shop.`);
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
    </section>
  );
}

export default AdminPortal;
