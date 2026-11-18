import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  it("renders the three links and marks the current page as active", () => {
    // MemoryRouter lets us start the test on a chosen URL
    render(
      <MemoryRouter initialEntries={["/shop"]}>
        <NavBar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Admin Portal" })).toHaveAttribute(
      "href",
      "/admin",
    );
    expect(screen.getByRole("link", { name: "Shop" })).toHaveClass("active");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass(
      "active",
    );
  });
});
