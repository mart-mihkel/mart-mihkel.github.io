import { describe, expect, it } from "vitest";
import { getPost, postMetas } from "./index";

describe("postMetas", () => {
  it("contains all registered posts", () => {
    expect(postMetas.length).toBeGreaterThan(0);
  });

  it("does not include content field", () => {
    for (const meta of postMetas) {
      expect(meta).not.toHaveProperty("content");
    }
  });

  it("contains expected fields for every post", () => {
    for (const meta of postMetas) {
      expect(meta).toHaveProperty("slug");
      expect(meta).toHaveProperty("title");
      expect(meta).toHaveProperty("date");
      expect(meta).toHaveProperty("status");
      expect(meta).toHaveProperty("author");
      expect(meta).toHaveProperty("abstract");
    }
  });
});

describe("getPost", () => {
  it("returns a post for an existing slug", () => {
    const post = getPost("the");
    expect(post).toBeDefined();
    expect(post?.slug).toBe("the");
    expect(post?.title).toBe("The");
  });

  it("includes raw markdown content", () => {
    const post = getPost("the");
    expect(post?.content).toContain("Ühel mehel oli lagi nii");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPost("nonexistent")).toBeUndefined();
  });
});
