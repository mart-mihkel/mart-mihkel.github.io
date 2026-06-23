import { createMemoryHistory, MemoryRouter, Route } from "@solidjs/router";
import { render, screen } from "@solidjs/testing-library";
import type { ParentComponent } from "solid-js";
import { describe, expect, it } from "vitest";
import Post from "./Post";

function PostWrapper(slug: string): ParentComponent {
  return (props) => {
    const history = createMemoryHistory();
    history.set({ value: `/${slug}`, scroll: false, replace: true });
    return (
      <MemoryRouter history={history}>
        <Route path="/:slug" component={() => props.children} />
      </MemoryRouter>
    );
  };
}

describe("Post", () => {
  it("renders the post content for a valid slug", () => {
    render(() => <Post />, { wrapper: PostWrapper("the") });
    expect(screen.getByText("The")).toBeDefined();
    expect(screen.getAllByText("Gregor Granaat").length).toBeGreaterThan(0);
  });

  it("shows not-found message for an unknown slug", () => {
    render(() => <Post />, { wrapper: PostWrapper("nonexistent") });
    expect(screen.getByText("Post not found.")).toBeDefined();
    expect(screen.getByText("Return home")).toBeDefined();
  });
});
