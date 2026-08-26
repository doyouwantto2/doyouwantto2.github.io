interface ChildOrbProps {
  name: string;
  link: string;
}

export default function ChildOrb(props: ChildOrbProps) {
  return (
    <div class="">
      <a href={props.link}>{props.name}</a>
    </div>
  );
}
