interface ChildOrbProps {
  name: string;
  link: string;
  order: number;
}

export default function ChildOrb(props: ChildOrbProps) {
  return (
    <div class="p-2">
      <a href={props.link}>{props.name}</a>
    </div>
  );
}
