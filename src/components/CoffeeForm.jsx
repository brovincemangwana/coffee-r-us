import { useState } from "react";

const emptyForm = { name: "", description: "", origin: "", price: "" };

// Labels and input types for each field, so we can render them with .map()
const fields = [
  { name: "name", label: "Coffee Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "origin", label: "Origin", type: "text" },
  { name: "price", label: "Price", type: "number" },
];

// onSubmit is provided by the parent and does the actual POST request
function CoffeeForm({ onSubmit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // One handler for all inputs: the input's "name" attribute
  // tells us which key in formData to update
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Returns an object like { origin: "Origin is required" }
  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Coffee name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.origin.trim()) newErrors.origin = "Origin is required";
    if (formData.price === "" || Number(formData.price) <= 0)
      newErrors.price = "Enter a price greater than 0";
    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // stop if invalid

    setSubmitting(true);
    const success = await onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      origin: formData.origin.trim(),
      price: Number(formData.price), // inputs give strings, the API wants a number
    });
    if (success) setFormData(emptyForm); // clear the form after a good save
    setSubmitting(false);
  }

  return (
    <form className="coffee-form" onSubmit={handleSubmit} noValidate>
      {fields.map(({ name, label, type }) => (
        <div className="form-group" key={name}>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            step={type === "number" ? "0.01" : undefined}
            placeholder="Type here"
            value={formData[name]}
            onChange={handleChange}
            className={errors[name] ? "input-error" : ""}
          />
          {errors[name] && <span className="error-text">{errors[name]}</span>}
        </div>
      ))}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}

export default CoffeeForm;
