import { createSignal, For } from "solid-js";
import MainOrb from "./components/MainOrb";
import ChildOrb from "./components/ChildOrb";

interface PathProps {
  name: string;
  link: string;
}

interface SwitcherProps {
  currentPath: string;
}

const pathList: PathProps[] = [
  { name: "Home", link: "/" },
  { name: "Post", link: "/post" },
  { name: "Project", link: "/project" },
  { name: "Lab", link: "/lab" },
];

export default function Switcher(props: SwitcherProps) {
  const [open, setOpen] = createSignal(false);

  const current = () =>
    pathList.find((element) => element.link === props.currentPath);

  const children = () =>
    pathList.filter((element) => element.link !== props.currentPath);

  return (
    <div class="fixed bottom-10 left-10">
      <div onClick={() => setOpen((value) => !value)}>
        <MainOrb name={current()?.name ?? ""} />
      </div>

      {open() && (
        <div>
          <For each={children()}>
            {(element) => <ChildOrb name={element.name} link={element.link} />}
          </For>
        </div>
      )}
    </div>
  );
}
