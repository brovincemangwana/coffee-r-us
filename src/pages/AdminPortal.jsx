import { useState } from "react";
import CoffeeForm from "../components/CoffeeForm";
import AdminCoffeeRow from "../components/AdminCoffeeRow";
import useCoffees from "../hooks/useCoffees";

function AdminPortal() {
  const { coffees, loading, error, addCoffee, updateCoffee } = useCoffees();
  const [message, setMessage] = useState("");

  // Wrappers around the context functions: they turn success or failure
  // into a message on screen, and return true/false for the form and rows.
  async function handleAdd(newCoffee) {
    try {
      const saved = await addCoffee(newCoffee);
      setMessage(`"${saved.name}" was added to the shop.`);
      return true;
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      return false;
    }
  }

  async function handleUpdate(id, changes) {
    try {
      const updated = await updateCoffee(id, changes);
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
        <CoffeeForm onSubmit={handleAdd} />
        {message && <p className="form-message">{message}</p>}
      </div>

      <div className="admin-card">
        <h1>Manage Coffees</h1>
        {loading && <p className="status">Loading coffees...</p>}
        {error && <p className="status">Error: {error}</p>}
        <ul className="admin-list">
          {coffees.map((coffee) => (
            <AdminCoffeeRow key={coffee.id} coffee={coffee} onUpdate={handleUpdate} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AdminPortal;