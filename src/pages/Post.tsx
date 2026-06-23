import { A, useParams } from "@solidjs/router";
import { Marked } from "marked";
import { createResource } from "solid-js";
import RfcHeader from "../components/RfcHeader";
import RfcLayout from "../components/RfcLayout";
import { getPost } from "../posts";

const marked = new Marked({
  gfm: true,
  breaks: true,
});

function Post() {
  const params = useParams<{ slug: string }>();
  const post = getPost(params.slug);

  if (!post) {
    return (
      <RfcLayout>
        <p class="text-center py-12">
          Post not found.{" "}
          <A href="/" class="underline">
            Return home
          </A>
        </p>
      </RfcLayout>
    );
  }

  const [html] = createResource(
    () => post.content,
    async (content) => marked.parse(content),
  );

  return (
    <RfcLayout>
      <A
        href="/"
        class="inline-block text-xs text-stone-500 hover:underline mb-6"
      >
        &larr; Back to index
      </A>

      <article>
        <RfcHeader meta={post} />
        <div class="prose-custom" innerHTML={html() ?? ""} />
      </article>
    </RfcLayout>
  );
}

export default Post;
