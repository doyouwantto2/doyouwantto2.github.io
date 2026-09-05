import { createSignal, Index } from "solid-js";
import MainOrb from "./components/MainOrb";
import ChildOrb from "./components/ChildOrb";

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
      class="
        fixed z-10

        left-[5em]
        bottom-[5em]

        sm:left-[7em]
        sm:bottom-[7em]

        md:left-[8em]
        md:bottom-[8em]
      "
    >
      <div class="relative w-0 h-0">
        <div
          class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setOpen((value) => !value)}
        >
          <MainOrb
            class={`
      border cursor-pointer rounded-full flex items-center justify-center
      transition-all duration-300 ease-in-out
      ${
        open()
          ? "h-15 w-15 sm:h-16 sm:w-16 md:h-17 md:w-17 lg:h-18 lg:w-18"
          : "h-17 w-17 sm:w-18 sm:h-18 md:h-19 md:w-19 lg:h-20 lg:w-20"
      }
    `}
            open={open()}
            name={current()?.name ?? ""}
          />
        </div>

        <div class="absolute top-0 left-0 w-0 h-0 pointer-events-none">
          <Index each={children()}>
            {(element, index) => (
              <ChildOrb
                name={element().name}
                link={element().link}
                order={index}
                total={children().length}
                open={open()}
              />
            )}
          </Index>
        </div>
      </div>
    </div>
  );
}
