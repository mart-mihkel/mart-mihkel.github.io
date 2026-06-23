import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import RfcHeader from "./RfcHeader";

const mockMeta = {
  slug: "test-post",
  title: "Test Post Title",
  date: "January 2025",
  status: "Experimental" as const,
  author: "Test Author",
  abstract: "A test abstract for the header component.",
};

describe("RfcHeader", () => {
  it("renders the post title", () => {
    render(() => <RfcHeader meta={mockMeta} />);
    expect(
      screen.getByRole("heading", { name: "Test Post Title" }),
    ).toBeDefined();
  });

  it("renders the status label", () => {
    render(() => <RfcHeader meta={mockMeta} />);
    expect(screen.getByText("Status")).toBeDefined();
  });

  it("renders the status value", () => {
    render(() => <RfcHeader meta={mockMeta} />);
    expect(screen.getByText("Experimental")).toBeDefined();
  });

  it("renders the date label", () => {
    render(() => <RfcHeader meta={mockMeta} />);
    expect(screen.getByText("Date")).toBeDefined();
  });

  it("renders the abstract", () => {
    render(() => <RfcHeader meta={mockMeta} />);
    expect(
      screen.getByText("A test abstract for the header component."),
    ).toBeDefined();
  });
});
