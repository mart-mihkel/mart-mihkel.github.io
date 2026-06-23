import type { PostMeta } from "../posts/types";

interface Props {
  meta: PostMeta;
}

function RfcHeader(props: Props) {
  return (
    <div class="border-b border-stone-400 pb-6 mb-8">
      <div class="flex justify-between text-xs mb-6">
        <div>
          <div class="font-semibold">{props.meta.author}</div>
        </div>
        <div class="text-right">
          <div>{props.meta.date}</div>
        </div>
      </div>

      <h1 class="text-xl font-bold text-center mb-6">{props.meta.title}</h1>

      <table class="w-full text-xs border-collapse mb-6">
        <tbody>
          <tr>
            <td class="pr-4 align-top font-semibold w-32">Status</td>
            <td>{props.meta.status}</td>
          </tr>
          <tr>
            <td class="pr-4 align-top font-semibold">Date</td>
            <td>{props.meta.date}</td>
          </tr>
          <tr>
            <td class="pr-4 align-top font-semibold">Author</td>
            <td>{props.meta.author}</td>
          </tr>
        </tbody>
      </table>

      <div class="mb-6">
        <h2 class="font-bold mb-2">Abstract</h2>
        <p>{props.meta.abstract}</p>
      </div>
    </div>
  );
}

export default RfcHeader;
