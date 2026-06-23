import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import RfcLayout from "./RfcLayout";

describe("RfcLayout", () => {
  it("renders children", () => {
    render(() => (
      <RfcLayout>
        <span data-testid="child">Hello</span>
      </RfcLayout>
    ));
    expect(screen.getByTestId("child")).toBeDefined();
    expect(screen.getByText("Hello")).toBeDefined();
  });
});
