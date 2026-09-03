import { createSignal, Index } from "solid-js";
import MainOrb from "./components/MainOrb";
import ChildOrb from "./components/ChildOrb";
import type { orbPosition } from "./components/ChildOrb.tsx";

interface PathProps {
  name: string;
  link: string;
}

const pathList: PathProps[] = [
  { name: "Home", link: "/" },
  { name: "Post", link: "/post" },
  { name: "Project", link: "/project" },
  { name: "About", link: "/about" },
];

export default function Switcher({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = createSignal(false);

  const base: orbPosition = {
    x: 9,
    y: 7,
    r: 180,
  };

  const current = () => {
    const sorted = [...pathList].sort((a, b) => b.link.length - a.link.length);
    return sorted.find((item) => currentPath.startsWith(item.link));
  };

  const children = () => {
    const currentIndex = pathList.findIndex(
      (item) => item.link === current()?.link,
    );

    return Array.from(
      { length: pathList.length - 1 },
      (_, i) => pathList[(currentIndex + 1 + i) % pathList.length],
    );
  };

  return (
    <div
      class="fixed z-10"
      style={{
        bottom: `${base.y}em`,
        left: `${base.x}em`,
      }}
    >
      <div class="relative w-0 h-0">
        <div
          class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setOpen((value) => !value)}
        >
          {open() == true ? (
            <MainOrb
              class="border cursor-pointer rounded-full h-18 w-18 flex items-center justify-center"
              open={open()}
              name={current()?.name ?? ""}
            />
          ) : (
            <MainOrb
              class="border cursor-pointer rounded-full h-20 w-20 flex items-center justify-center"
              open={open()}
              name={current()?.name ?? ""}
            />
          )}
        </div>

        {open() && (
          <div class="absolute top-0 left-0 w-0 h-0 pointer-events-none">
            <Index each={children()}>
              {(element, index) => (
                <ChildOrb
                  name={element().name}
                  link={element().link}
                  order={index}
                  total={children().length}
                  base={base}
                  open={open()}
                />
              )}
            </Index>
          </div>
        )}
      </div>
    </div>
  );
}
