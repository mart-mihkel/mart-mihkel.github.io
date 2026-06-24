import { A } from "@solidjs/router";
import RfcLayout from "../components/RfcLayout";
import { postMetas } from "../posts";

function Home() {
  return (
    <RfcLayout>
      <div class="border-b border-stone-400 pb-6 mb-8">
        <div class="flex justify-between text-xs mb-6">
          <div class="font-semibold">Gregor Granaat</div>
          <div>June 2026</div>
        </div>

        <h1 class="text-xl font-bold text-center mb-6">Risuhunnik</h1>

        <table class="w-full text-xs border-collapse mb-6">
          <tbody>
            <tr>
              <td class="pr-4 align-top font-semibold w-32">Status</td>
              <td>Active</td>
            </tr>
            <tr>
              <td class="pr-4 align-top font-semibold">Updated</td>
              <td>June 2026</td>
            </tr>
            <tr>
              <td class="pr-4 align-top font-semibold">Author</td>
              <td>Gregor Granaat</td>
            </tr>
          </tbody>
        </table>

        <h2 class="font-bold mb-2">Abstract</h2>
        <p>This is the, as you see it's here.</p>

        <div class="mt-6 pt-4 border-t border-stone-300">
          <A href="/wordle" class="text-xs text-stone-500 hover:underline">
            Play Wordle →
          </A>
        </div>
      </div>

      <div class="space-y-6">
        {postMetas.map((post) => (
          <article>
            <A
              href={`/${post.slug}`}
              class="block no-underline text-inherit group"
            >
              <div class="flex items-baseline gap-4 text-xs mb-1">
                <span class="text-stone-500">{post.date}</span>
                <span class="text-stone-400">[Status: {post.status}]</span>
              </div>
              <h2 class="text-base font-bold group-hover:underline">
                {post.title}
              </h2>
              <p class="text-stone-600 text-xs mt-1">{post.abstract}</p>
            </A>
          </article>
        ))}
      </div>
    </RfcLayout>
  );
}

export default Home;
