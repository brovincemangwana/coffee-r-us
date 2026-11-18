import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CoffeeForm from "../components/CoffeeForm";

describe("CoffeeForm", () => {
  it("shows errors and does not submit when the form is empty", async () => {
    const onSubmit = vi.fn();
    render(<CoffeeForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Coffee name is required")).toBeInTheDocument();
    expect(screen.getByText("Origin is required")).toBeInTheDocument();
    expect(screen.getByText("Enter a price greater than 0")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
    // useRef in action: focus jumps to the first invalid field
    expect(screen.getByLabelText("Coffee Name")).toHaveFocus();
  });

  it("submits the data with the price as a number, then clears the form", async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<CoffeeForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Coffee Name"), "Uganda Bugisu");
    await userEvent.type(screen.getByLabelText("Description"), "Winey and sweet");
    await userEvent.type(screen.getByLabelText("Origin"), "Uganda");
    await userEvent.type(screen.getByLabelText("Price"), "17.5");
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Uganda Bugisu",
      description: "Winey and sweet",
      origin: "Uganda",
      price: 17.5, // a number, not the string "17.5"
    });

    // The form empties itself after a successful save
    await waitFor(() =>
      expect(screen.getByLabelText("Coffee Name")).toHaveValue("")
    );
  });
});