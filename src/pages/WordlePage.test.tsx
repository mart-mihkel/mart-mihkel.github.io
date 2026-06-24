import { MemoryRouter, Route } from "@solidjs/router";
import { render, screen } from "@solidjs/testing-library";
import type { ParentComponent } from "solid-js";
import { describe, expect, it } from "vitest";
import WordlePage from "./WordlePage";

const RouterWrapper: ParentComponent = (props) => (
  <MemoryRouter>
    <Route path="/" component={() => props.children} />
  </MemoryRouter>
);

function typeKey(key: string) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

function grid(container: HTMLElement): HTMLElement {
  return container.querySelector(".grid-cols-5") as HTMLElement;
}

function keyButton(label: string): HTMLElement {
  return screen
    .getAllByRole("button")
    .find((k) => k.textContent === label) as HTMLElement;
}

describe("WordlePage", () => {
  it("renders the back link and title", () => {
    render(() => <WordlePage />, { wrapper: RouterWrapper });
    expect(screen.getByText("Wordle")).toBeDefined();
    expect(screen.getByText("← Back to index")).toBeDefined();
  });

  it("starts with an empty grid", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    const el = grid(container);
    expect(el.children.length).toBe(30);
    for (const cell of el.children) {
      expect(cell.textContent).toBe("");
    }
  });

  it("shows typed letters in the current row", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("H");
    typeKey("E");
    typeKey("L");
    typeKey("L");
    typeKey("O");

    const el = grid(container);
    expect(el.children[0].textContent).toBe("H");
    expect(el.children[1].textContent).toBe("E");
    expect(el.children[2].textContent).toBe("L");
    expect(el.children[3].textContent).toBe("L");
    expect(el.children[4].textContent).toBe("O");
  });

  it("backspace removes the last letter", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("H");
    typeKey("E");
    typeKey("Backspace");

    const el = grid(container);
    expect(el.children[0].textContent).toBe("H");
    expect(el.children[1].textContent).toBe("");
  });

  it("ignores non-letter keys and limits input to 5 letters", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("A");
    typeKey("B");
    typeKey("C");
    typeKey("D");
    typeKey("E");
    typeKey("F");
    typeKey("1");

    const el = grid(container);
    expect(el.children[0].textContent).toBe("A");
    expect(el.children[1].textContent).toBe("B");
    expect(el.children[2].textContent).toBe("C");
    expect(el.children[3].textContent).toBe("D");
    expect(el.children[4].textContent).toBe("E");
  });

  it("does not submit with fewer than 5 letters", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("H");
    typeKey("I");
    typeKey("Enter");

    const el = grid(container);
    expect(el.children[0].textContent).toBe("H");
    expect(el.children[1].textContent).toBe("I");
    expect(el.children[2].textContent).toBe("");
  });

  it("applies absent / correct tile colors after a guess", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("A");
    typeKey("B");
    typeKey("C");
    typeKey("D");
    typeKey("E");
    typeKey("Enter");

    const el = grid(container);
    expect(el.children[0].className).toContain("bg-stone-500");
    expect(el.children[1].className).toContain("bg-stone-500");
    expect(el.children[2].className).toContain("bg-stone-500");
    expect(el.children[3].className).toContain("bg-stone-500");
    expect(el.children[4].className).toContain("bg-green-600");
  });

  it("applies present (yellow) for misplaced letters", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("S");
    typeKey("H");
    typeKey("O");
    typeKey("R");
    typeKey("E");
    typeKey("Enter");

    const el = grid(container);
    expect(el.children[0].className).toContain("bg-yellow-500");
    expect(el.children[1].className).toContain("bg-yellow-500");
    expect(el.children[2].className).toContain("bg-yellow-500");
    expect(el.children[3].className).toContain("bg-yellow-500");
    expect(el.children[4].className).toContain("bg-green-600");
  });

  it("shows win message and Play again when guessing HORSE", () => {
    render(() => <WordlePage />, { wrapper: RouterWrapper });
    typeKey("H");
    typeKey("O");
    typeKey("R");
    typeKey("S");
    typeKey("E");
    typeKey("Enter");

    expect(screen.getByText("You got it!")).toBeDefined();
    expect(screen.getByText("Play again")).toBeDefined();
  });

  it("shows lose message after 6 wrong guesses", () => {
    render(() => <WordlePage />, { wrapper: RouterWrapper });
    for (const word of ["ABCDE", "FGHIJ", "KLMNO", "PQRST", "UVWXY", "ZABCD"]) {
      for (const letter of word) {
        typeKey(letter);
      }
      typeKey("Enter");
    }
    expect(screen.getByText("The word was HORSE")).toBeDefined();
    expect(screen.getByText("Play again")).toBeDefined();
  });

  it("resets the game when clicking Play again", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("H");
    typeKey("O");
    typeKey("R");
    typeKey("S");
    typeKey("E");
    typeKey("Enter");
    expect(screen.getByText("You got it!")).toBeDefined();

    screen.getByText("Play again").click();

    const el = grid(container);
    for (const cell of el.children) {
      expect(cell.textContent).toBe("");
    }
    expect(screen.queryByText("You got it!")).toBeNull();
  });

  it("marks keyboard keys with correct colors after a guess", () => {
    render(() => <WordlePage />, { wrapper: RouterWrapper });
    typeKey("A");
    typeKey("B");
    typeKey("C");
    typeKey("D");
    typeKey("E");
    typeKey("Enter");

    expect(keyButton("E").className).toContain("bg-green-600");
    expect(keyButton("A").className).toContain("bg-stone-400");
  });

  it("upgrades key state from present to correct on subsequent guesses", () => {
    render(() => <WordlePage />, { wrapper: RouterWrapper });
    typeKey("S");
    typeKey("A");
    typeKey("L");
    typeKey("E");
    typeKey("T");
    typeKey("Enter");

    typeKey("H");
    typeKey("O");
    typeKey("R");
    typeKey("S");
    typeKey("E");
    typeKey("Enter");

    expect(keyButton("S").className).toContain("bg-green-600");
    expect(keyButton("E").className).toContain("bg-green-600");
    expect(keyButton("H").className).toContain("bg-green-600");
  });

  it("ignores keyboard input after the game is over", () => {
    const { container } = render(() => <WordlePage />, {
      wrapper: RouterWrapper,
    });
    typeKey("H");
    typeKey("O");
    typeKey("R");
    typeKey("S");
    typeKey("E");
    typeKey("Enter");

    typeKey("A");
    typeKey("B");
    typeKey("C");
    typeKey("D");
    typeKey("E");
    typeKey("Enter");

    const el = grid(container);
    expect(el.children[5].textContent).toBe("");
  });
});
