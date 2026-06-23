import { MemoryRouter, Route } from "@solidjs/router";
import { render, screen } from "@solidjs/testing-library";
import type { ParentComponent } from "solid-js";
import { describe, expect, it } from "vitest";
import Home from "./Home";

const RouterWrapper: ParentComponent = (props) => (
  <MemoryRouter>
    <Route path="/" component={() => props.children} />
  </MemoryRouter>
);

describe("Home", () => {
  it("renders the blog title", () => {
    render(() => <Home />, { wrapper: RouterWrapper });
    expect(screen.getByText("Risuhunnik")).toBeDefined();
  });

  it("renders author and status metadata", () => {
    render(() => <Home />, { wrapper: RouterWrapper });
    expect(screen.getByText("Active")).toBeDefined();
    expect(
      screen.getAllByText("Gregor Granaat").length,
    ).toBeGreaterThan(0);
  });

  it("renders links to all posts", () => {
    render(() => <Home />, { wrapper: RouterWrapper });
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
