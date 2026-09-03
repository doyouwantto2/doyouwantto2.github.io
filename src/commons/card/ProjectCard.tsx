import type { CollectionEntry } from "astro:content";

interface Props {
  project: CollectionEntry<"project">;
}

export default function projectCard({ project }: Props) {
  const content = project.data;

  return (
    <div class="border w-[95%] mt-5">
      <div class="flex flex-row">
        <p> {content.name}</p>
        <a href={content.url}>icon</a>
      </div>
      <div> {content.description}</div>
      <div> {content.url}</div>
      <div> {content.languages}</div>
      <div> {content.pubDate.toDateString()}</div>
      <div> {content.updatedDate.toDateString()}</div>
    </div>
  );
}
