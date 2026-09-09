import { createSignal, Index, onMount, onCleanup } from "solid-js";
import MainOrb from "./components/MainOrb";
import ChildOrb from "./components/ChildOrb";

interface PathProps {
  name: string;
  link: string;
}

const pathList: PathProps[] = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Project", link: "/project" },
  { name: "Lab", link: "/lab" },
];

export default function Switcher({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = createSignal(false);

  let switcherRef: HTMLDivElement | undefined;

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

  const handleOutsideClick = (event: MouseEvent) => {
    if (!open()) return;

    const target = event.target as Node;

    if (switcherRef && !switcherRef.contains(target)) {
      setOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleOutsideClick);

    onCleanup(() => {
      document.removeEventListener("click", handleOutsideClick);
    });
  });

  return (
    <div
      ref={switcherRef}
      class="
        fixed z-10

        left-[5em]
        bottom-[5em]

        sm:left-[7em]
        sm:bottom-[7em]

        md:left-[7em]
        md:bottom-[7em]

        lg:left-[8em]
        lg:right-[8em]
      "
    >
      <div class="relative h-0 w-0">
        <div
          class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setOpen((value) => !value)}
        >
          <MainOrb
            class={`
              flex cursor-pointer items-center justify-center
              rounded-full bg-white text-black
              transition-all duration-300 ease-in-out
              ${
                open()
                  ? "h-17 w-17 sm:h-18 sm:w-18 md:h-19 md:w-19 lg:h-20 lg:w-20"
                  : "h-19 w-19 sm:w-20 sm:h-20 md:h-21 md:w-21 lg:h-22 lg:w-22"
              }
            `}
            open={open()}
            name={current()?.name ?? ""}
          />
        </div>

        <div class="pointer-events-none absolute top-0 left-0 h-0 w-0">
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
