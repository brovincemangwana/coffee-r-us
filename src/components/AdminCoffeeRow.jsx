import { useState } from "react";

// One row in the admin list. It switches between "view" and "edit" mode.
function AdminCoffeeRow({ coffee, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  // draft holds the values being typed; price is kept as a string for the input
  const [draft, setDraft] = useState({
    ...coffee,
    price: String(coffee.price),
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function startEditing() {
    // Reset the draft to the latest saved values each time editing starts
    setDraft({ ...coffee, price: String(coffee.price) });
    setError("");
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    // Basic validation, same rules as the add form
    if (
      !draft.name.trim() ||
      !draft.description.trim() ||
      !draft.origin.trim()
    ) {
      setError("Name, description and origin can't be empty");
      return;
    }
    if (draft.price === "" || Number(draft.price) <= 0) {
      setError("Enter a price greater than 0");
      return;
    }

    // Build an object with ONLY the fields that changed.
    // PATCH is meant for partial updates, so we don't resend everything.
    const cleaned = {
      name: draft.name.trim(),
      description: draft.description.trim(),
      origin: draft.origin.trim(),
      price: Number(draft.price),
    };
    const changes = {};
    Object.keys(cleaned).forEach((key) => {
      if (cleaned[key] !== coffee[key]) changes[key] = cleaned[key];
    });

    // Nothing changed, so skip the request
    if (Object.keys(changes).length === 0) {
      setIsEditing(false);
      return;
    }

    setSaving(true);
    const success = await onUpdate(coffee.id, changes);
    setSaving(false);

    if (success) setIsEditing(false);
    else setError("Could not save changes. Try again.");
  }

  // ----- View mode -----
  if (!isEditing) {
    return (
      <li className="admin-row">
        <div className="admin-row-info">
          <strong>{coffee.name}</strong>
          <span>
            {coffee.origin} · ${Number(coffee.price).toFixed(2)}
          </span>
        </div>
        <button type="button" onClick={startEditing}>
          Edit
        </button>
      </li>
    );
  }

  // ----- Edit mode -----
  return (
    <li className="admin-row editing">
      <div className="edit-fields">
        <input
          name="name"
          value={draft.name}
          onChange={handleChange}
          aria-label="Name"
        />
        <input
          name="description"
          value={draft.description}
          onChange={handleChange}
          aria-label="Description"
        />
        <input
          name="origin"
          value={draft.origin}
          onChange={handleChange}
          aria-label="Origin"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          value={draft.price}
          onChange={handleChange}
          aria-label="Price"
        />
        {error && <span className="error-text">{error}</span>}
      </div>
      <div className="edit-actions">
        <button type="button" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </li>
  );
}

export default AdminCoffeeRow;
