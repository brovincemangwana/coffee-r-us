import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CoffeeProvider from "../context/CoffeeProvider";
import Shop from "../pages/Shop";

const coffees = [
  { id: 1, name: "Kenya AA", description: "Bold and juicy.", origin: "Kenya", price: 19 },
  { id: 2, name: "Brazil Santos", description: "Nutty and chocolatey.", origin: "Brazil", price: 13.5 },
];

function renderShop() {
  return render(
    <CoffeeProvider>
      <Shop />
    </CoffeeProvider>
  );
}

describe("Shop page", () => {
  beforeEach(() => {
    // Replace the real fetch with a fake that returns our test data
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => coffees })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads and displays the coffees from the API", async () => {
    renderShop();

    expect(screen.getByText("Loading coffees...")).toBeInTheDocument();
    expect(await screen.findByText("Kenya AA")).toBeInTheDocument();
    expect(screen.getByText("Brazil Santos")).toBeInTheDocument();
  });

  it("filters the cards as the user types in the search box", async () => {
    renderShop();
    await screen.findByText("Kenya AA");

    await userEvent.type(screen.getByLabelText("Search coffees"), "kenya");

    expect(screen.getByText("Kenya AA")).toBeInTheDocument();
    expect(screen.queryByText("Brazil Santos")).not.toBeInTheDocument();
  });

  it("filters the cards with an origin checkbox", async () => {
    renderShop();
    await screen.findByText("Kenya AA");

    await userEvent.click(screen.getByLabelText("Brazil"));

    expect(screen.getByText("Brazil Santos")).toBeInTheDocument();
    expect(screen.queryByText("Kenya AA")).not.toBeInTheDocument();
  });

  it("shows a message when nothing matches", async () => {
    renderShop();
    await screen.findByText("Kenya AA");

    await userEvent.type(screen.getByLabelText("Search coffees"), "zzzz");

    expect(screen.getByText("No coffees match your search.")).toBeInTheDocument();
  });
});