export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  status: "Informational" | "Experimental" | "Standards Track";
  author: string;
  abstract: string;
}

export interface Post extends PostMeta {
  content: string;
}
