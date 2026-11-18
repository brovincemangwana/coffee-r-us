import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AdminCoffeeRow from "../components/AdminCoffeeRow";

const coffee = {
  id: 1,
  name: "Kenya AA",
  description: "Bold and juicy.",
  origin: "Kenya",
  price: 18.5,
};

describe("AdminCoffeeRow", () => {
  it("sends only the changed price when saving", async () => {
    const onUpdate = vi.fn().mockResolvedValue(true);
    render(
      <ul>
        <AdminCoffeeRow coffee={coffee} onUpdate={onUpdate} />
      </ul>
    );

    await userEvent.click(screen.getByRole("button", { name: "Edit" }));

    const priceInput = screen.getByLabelText("Price");
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "20");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    // Only the price changed, so only the price is sent
    expect(onUpdate).toHaveBeenCalledWith(1, { price: 20 });
    // The row returns to view mode after a successful save
    expect(await screen.findByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("rejects an empty price and does not call onUpdate", async () => {
    const onUpdate = vi.fn();
    render(
      <ul>
        <AdminCoffeeRow coffee={coffee} onUpdate={onUpdate} />
      </ul>
    );

    await userEvent.click(screen.getByRole("button", { name: "Edit" }));
    await userEvent.clear(screen.getByLabelText("Price"));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByText("Enter a price greater than 0")).toBeInTheDocument();
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it("discards changes on Cancel", async () => {
    const onUpdate = vi.fn();
    render(
      <ul>
        <AdminCoffeeRow coffee={coffee} onUpdate={onUpdate} />
      </ul>
    );

    await userEvent.click(screen.getByRole("button", { name: "Edit" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onUpdate).not.toHaveBeenCalled();
    expect(screen.getByText("Kenya AA")).toBeInTheDocument();
  });
});