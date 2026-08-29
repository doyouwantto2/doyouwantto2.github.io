import type { CollectionEntry } from "astro:content";

interface Props {
  project: CollectionEntry<"project">;
}

export default function projectCard({ project }: Props) {
  const content = project.data;

  return (
    <div class="border w-fit">
      <a href={"/project/" + content.id}> {content.name}</a>
      <div> {content.description}</div>
      <div> {content.url}</div>
      <div> {content.languages}</div>
      <div> {content.pubDate.toDateString()}</div>
      <div> {content.updatedDate.toDateString()}</div>
    </div>
  );
}
