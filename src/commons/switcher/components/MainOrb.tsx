interface MainOrbProps {
  name: string;
  open: boolean;
  class: string;
}

export default function MainOrb(props: MainOrbProps) {
  return (
    <div class={props.class}>
      <a>{props.name}</a>
    </div>
  );
}
