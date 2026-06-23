import researchersRaw from "./md/reserachers.md?raw";
import theRaw from "./md/the.md?raw";
import benchRaw from "./md/bench.md?raw";
import type { Post, PostMeta } from "./types";

const posts: Post[] = [
  {
    slug: "bench",
    title: "Benches",
    date: "May 2026",
    status: "Standards Track",
    author: "Janar Kootikum",
    abstract: "Here we see the greatest of them",
    content: benchRaw,
  },
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
  {
    slug: "researchers",
    title: "Researchers",
    date: "June 2026",
    status: "Experimental",
    author: "Kalmer Kalamees",
    abstract: "Might aswell not",
    content: researchersRaw,
  },
];

export const postMetas: PostMeta[] = posts.map(
  ({ content: _, ...meta }) => meta,
);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
