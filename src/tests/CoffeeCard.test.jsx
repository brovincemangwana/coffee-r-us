import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CoffeeCard from "../components/CoffeeCard";

const coffee = {
  id: 1,
  name: "Kenya AA",
  description: "Bold and juicy.",
  origin: "Kenya",
  price: 19,
};

describe("CoffeeCard", () => {
  it("shows the name, description, origin and price", () => {
    render(<CoffeeCard coffee={coffee} />);

    expect(screen.getByText("Kenya AA")).toBeInTheDocument();
    expect(screen.getByText("Bold and juicy.")).toBeInTheDocument();
    expect(screen.getByText("Kenya")).toBeInTheDocument();
    // 19 should be formatted with two decimals
    expect(screen.getByText("$19.00")).toBeInTheDocument();
  });
});