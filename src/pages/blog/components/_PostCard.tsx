import type { CollectionEntry } from "astro:content";

interface Props {
  post: CollectionEntry<"post">;
}

export default function PostCard({ post }: Props) {
  const content = post.data;

  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(content.pubDate);

  const search = (name: string) => {
    const params = new URLSearchParams();
    params.set("tag", name);

    window.location.href = `/blog?${params.toString()}`;
  };

  return (
    <article class="w-full rounded-2xl bg-gray-600 p-5">
      <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <a
          class="text-2xl text-green-400 font-bold hover:underline"
          href={"/blog/" + content.id}
        >
          {content.title}
        </a>

        <div
          class="text-green-400/80 border-l border-green-400/30 pl-3
                 shrink-0 whitespace-nowrap
                 text-xs sm:text-sm lg:text-base"
        >
          {formattedDate}
        </div>
      </div>

      <div class="flex flex-row flex-wrap gap-2">
        {content.tags.map((item) => {
          const name = item.toString();

          return (
            <button
              type="button"
              onClick={() => search(name)}
              class="mt-1 w-fit cursor-pointer rounded-xl bg-gray-500 px-2 py-1 hover:bg-white hover:text-black md:text-sm"
            >
              #{name}
            </button>
          );
        })}
      </div>

      <div class="mt-4">{content.description}</div>
    </article>
  );
}
