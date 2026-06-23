import theRaw from "./the.md?raw";
import type { Post, PostMeta } from "./types";

const posts: Post[] = [
  {
    slug: "the",
    title: "The",
    date: "June 2026",
    status: "Informational",
    author: "Gregor Granaat",
    abstract:
      "This is the um, the like you know it sometimes, there are like um. When there's like one of those, the you know. Yeah I guess hmm, so as you can see.",
    content: theRaw,
  },
];

export const postMetas: PostMeta[] = posts.map(
  ({ content: _, ...meta }) => meta,
);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
