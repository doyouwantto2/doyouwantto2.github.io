import type { CollectionEntry } from "astro:content";

interface Props {
  project: CollectionEntry<"project">;
}

export default function projectCard({ project }: Props) {
  const content = project.data;

  return (
    <div class="w-full p-5 bg-gray-600 rounded-t-2xl">
      <div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row gap-6">
            <p class="font-bold text-2xl sm:text-3xl lg:text-4xl text-green-400">
              {content.name}
            </p>
            <a href={content.url}>🔗</a>
          </div>
          <div class="text-green-400"> {content.pubDate.toDateString()}</div>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          <span class="font-bold text-xl tex">Description:</span>
          <p class="text-xl"> {content.description}</p>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          <span class="font-bold text-xl">Languages:</span>
          <div class="flex flex-row gap-3 text-xl">
            {content.languages.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
