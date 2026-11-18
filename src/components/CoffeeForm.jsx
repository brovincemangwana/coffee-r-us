import { useState, useRef, useId } from "react";

const emptyForm = { name: "", description: "", origin: "", price: "" };

const fields = [
  { name: "name", label: "Coffee Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "origin", label: "Origin", type: "text" },
  { name: "price", label: "Price", type: "number" },
];

function CoffeeForm({ onSubmit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // useId: a unique prefix for this form instance. Combined with each
  // field name it gives ids that never clash, even if the form is rendered twice.
  const baseId = useId();

  // useRef: holds the real DOM input elements, keyed by field name,
  // so we can call .focus() on them without causing a re-render.
  const inputRefs = useRef({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

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
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Jump to the first field (in form order) that has a problem
      const firstInvalid = fields.find(({ name }) => newErrors[name]);
      inputRefs.current[firstInvalid.name]?.focus();
      return;
    }

    setSubmitting(true);
    const success = await onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      origin: formData.origin.trim(),
      price: Number(formData.price),
    });

    if (success) {
      setFormData(emptyForm);
      // Ready for the next coffee: put the cursor back in the first field
      inputRefs.current.name?.focus();
    }
    setSubmitting(false);
  }

  return (
    <form className="coffee-form" onSubmit={handleSubmit} noValidate>
      {fields.map(({ name, label, type }) => {
        const inputId = `${baseId}-${name}`;
        const errorId = `${inputId}-error`;

        return (
          <div className="form-group" key={name}>
            <label htmlFor={inputId}>{label}</label>
            <input
              id={inputId}
              ref={(element) => {
                inputRefs.current[name] = element;
              }}
              name={name}
              type={type}
              step={type === "number" ? "0.01" : undefined}
              placeholder="Type here"
              value={formData[name]}
              onChange={handleChange}
              className={errors[name] ? "input-error" : ""}
              aria-invalid={errors[name] ? "true" : "false"}
              aria-describedby={errors[name] ? errorId : undefined}
            />
            {errors[name] && (
              <span id={errorId} className="error-text">
                {errors[name]}
              </span>
            )}
          </div>
        );
      })}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}

export default CoffeeForm;