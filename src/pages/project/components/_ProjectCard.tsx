import type { CollectionEntry } from "astro:content";

interface Props {
  project: CollectionEntry<"project">;
}

export default function projectCard({ project }: Props) {
  const content = project.data;

  return (
    <div class="w-full p-4 bg-gray-600 rounded-t-2xl">
      <div>
        <div class="flex flex-row justify-between items-center gap-3">
          <div>{content.name}</div>

          <div
            class="border-l pl-3 shrink-0
              text-xs sm:text-sm whitespace-nowrap text-gray-300"
          >
            {content.pubDate.toDateString()}
          </div>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          <span class="font-bold text-sm sm:text-base lg:text-lg text-gray-200">
            Description:
          </span>
          <p class="text-sm sm:text-base lg:text-lg text-gray-100 leading-snug">
            {content.description}
          </p>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          <span class="font-bold text-sm sm:text-base lg:text-lg text-gray-200">
            Stack:
          </span>
          <div class="flex flex-row gap-2 text-sm sm:text-base lg:text-lg text-gray-100 flex-wrap">
            {content.stack.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
