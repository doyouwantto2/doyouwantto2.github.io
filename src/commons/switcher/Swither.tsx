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
  { name: "About", link: "/about" },
];

export default function Switcher(props: SwitcherProps) {
  const [open, setOpen] = createSignal(false);

  const current = () => {
    const sorted = [...pathList].sort((a, b) => b.link.length - a.link.length);
    return sorted.find((item) => props.currentPath.startsWith(item.link));
  };

  const children = () =>
    pathList.filter((element) => element.link !== current()?.link);

  return (
    <div class="fixed bottom-10 left-10 z-10">
      <div onClick={() => setOpen((value) => !value)}>
        <MainOrb name={current()?.name ?? ""} />
      </div>

      {open() && (
        <div class="">
          <For each={children()}>
            {(element) => <ChildOrb name={element.name} link={element.link} />}
          </For>
        </div>
      )}
    </div>
  );
}
