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
            <p class="font-bold text-2xl"> {content.name}</p>
            <a href={content.url}>🔗</a>
          </div>
          <div class=""> {content.pubDate.toDateString()}</div>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          {" "}
          <span class="font-bold">Description: </span>
          <p> {content.description}</p>
        </div>

        <div class="flex flex-col flex-wrap mt-3">
          {" "}
          <span class="font-bold">Languages: </span>
          <div class="flex flex-row gap-3">
            {content.languages.map((item) => (
              <p>{item} </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
