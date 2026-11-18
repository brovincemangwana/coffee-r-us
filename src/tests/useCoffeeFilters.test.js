import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useCoffeeFilters from "../hooks/useCoffeeFilters";

// Defined outside the tests so the array reference stays the same between renders
const coffees = [
  { id: 1, name: "Kenya AA", description: "Bold and juicy.", origin: "Kenya", price: 19 },
  { id: 2, name: "Brazil Santos", description: "Nutty and chocolatey.", origin: "Brazil", price: 13.5 },
  { id: 3, name: "Colombian Supremo", description: "Smooth and balanced.", origin: "Colombia", price: 15 },
];

const names = (result) => result.current.filteredCoffees.map((c) => c.name);

describe("useCoffeeFilters", () => {
  it("returns every coffee when no filter is set", () => {
    const { result } = renderHook(() => useCoffeeFilters(coffees));
    expect(result.current.filteredCoffees).toHaveLength(3);
  });

  it("builds a sorted list of unique origins", () => {
    const { result } = renderHook(() => useCoffeeFilters(coffees));
    expect(result.current.origins).toEqual(["Brazil", "Colombia", "Kenya"]);
  });

  it("filters by search text, ignoring case", () => {
    const { result } = renderHook(() => useCoffeeFilters(coffees));
    act(() => result.current.setSearch("CHOC"));
    expect(names(result)).toEqual(["Brazil Santos"]);
  });

  it("filters by selected origins and can untick them", () => {
    const { result } = renderHook(() => useCoffeeFilters(coffees));

    act(() => result.current.toggleOrigin("Kenya"));
    expect(names(result)).toEqual(["Kenya AA"]);

    act(() => result.current.toggleOrigin("Kenya")); // untick
    expect(result.current.filteredCoffees).toHaveLength(3);
  });

  it("applies search and origin together, and clearFilters resets both", () => {
    const { result } = renderHook(() => useCoffeeFilters(coffees));

    act(() => {
      result.current.toggleOrigin("Colombia");
      result.current.setSearch("kenya");
    });
    expect(result.current.filteredCoffees).toHaveLength(0);

    act(() => result.current.clearFilters());
    expect(result.current.filteredCoffees).toHaveLength(3);
  });
});