interface MainOrbProps {
  name: string;
}

export default function MainOrb(props: MainOrbProps) {
  return (
    <div class="border cursor-pointer">
      <a>{props.name}</a>
    </div>
  );
}
