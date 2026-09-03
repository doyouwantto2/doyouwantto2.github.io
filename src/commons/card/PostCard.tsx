import type { CollectionEntry } from "astro:content";

interface Props {
  post: CollectionEntry<"post">;
}

export default function PostCard({ post }: Props) {
  const content = post.data;

  return (
    <div class="border w-full mb-5 mt-5">
      <a href={"/post/" + content.id}>{content.title}</a>
      <div> {content.description}</div>
      <div> {content.tags}</div>
      <div> {content.pubDate.toDateString()}</div>
      <div> {content.updatedDate.toDateString()}</div>
    </div>
  );
}
