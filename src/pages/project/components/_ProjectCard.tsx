import type { CollectionEntry } from "astro:content";

interface Props {
  project: CollectionEntry<"project">;
}

export default function projectCard({ project }: Props) {
  const content = project.data;

  return (
    <div class="w-full p-5 bg-gray-600 rounded-t-2xl">
      <div>
        <div class="flex flex-row justify-between items-center gap-3">
          <a
            href={content.url}
            class="font-bold text-xl sm:text-3xl lg:text-4xl text-green-400"
          >
            {content.name}
          </a>
          <div
            class="text-green-400 border-l pl-3 shrink-0
              text-xs sm:text-sm lg:text-base whitespace-nowrap"
          >
            {content.pubDate.toDateString()}
          </div>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          <span class="font-bold text-none md:text-xl tex">Description:</span>
          <p class="text-none md:text-xl"> {content.description}</p>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          <span class="font-bold text-none md:text-xl">Stack:</span>
          <div class="flex flex-row gap-3 text-none md:text-xl flex-wrap">
            {content.stack.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
