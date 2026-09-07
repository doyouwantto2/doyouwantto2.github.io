import type { CollectionEntry } from "astro:content";
import CardTag from "@commons/tag/CardTag";

interface Props {
  post: CollectionEntry<"post">;
}

export default function PostCard({ post }: Props) {
  const content = post.data;

  return (
    <article class="w-full rounded-2xl bg-gray-600 p-5">
      <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <a
          class="text-2xl font-bold hover:underline"
          href={"/post/" + content.id}
        >
          {content.title}
        </a>

        <div class="shrink-0">{content.pubDate.toDateString()}</div>
      </div>

      <div class="flex flex-row flex-wrap gap-2">
        {content.tags.map((item) => (
          <CardTag name={item.toString()} />
        ))}
      </div>

      <div class="mt-4">{content.description}</div>
    </article>
  );
}
