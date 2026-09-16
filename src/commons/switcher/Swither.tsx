import { createSignal, Index, onMount, onCleanup } from "solid-js";
import MainOrb from "./components/MainOrb";
import ChildOrb from "./components/ChildOrb";
import NeonRing from "./components/NeonRing";

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
  const [isTouch, setIsTouch] = createSignal(false);
  let switcherRef: HTMLDivElement | undefined;

  const active = () => isTouch() && open();

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
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
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

        left-[5em] bottom-[5em]
        sm:left-[7em] sm:bottom-[7em]
        md:left-[7em] md:bottom-[7em]
      "
    >
      <style>{`
        @keyframes neon-spin {
          to { transform: rotate(360deg); }
        }

        .neon-ring-outer {
          animation: neon-spin var(--neon-base-duration, 8s) linear infinite;
          animation-direction: var(--neon-direction, normal);
          transform-origin: center;
          will-change: transform, opacity, filter;

          opacity: 0.18;
          filter:
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.2))
            drop-shadow(0 0 2px rgba(255, 255, 255, 0.05));

          transition:
            opacity 320ms ease-out,
            filter 320ms ease-out;
        }

        .neon-ring-inner {
          animation: neon-spin var(--neon-inner-duration, 3s) linear infinite;
          animation-direction: var(--neon-direction, normal);
          animation-play-state: paused;
          transform-box: view-box;
          transform-origin: center;
          will-change: transform;
        }

        /* Hover (desktop) hoặc is-active (mobile) → sáng rõ + quay nhanh */
        .orb-wrapper:hover .neon-ring-outer,
        .orb-wrapper.is-active .neon-ring-outer {
          opacity: 1;
          filter:
            drop-shadow(0 0 2px rgba(255, 255, 255, 0.95))
            drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }

        .orb-wrapper:hover .neon-ring-inner,
        .orb-wrapper.is-active .neon-ring-inner {
          animation-play-state: running;
        }
      `}</style>

      <div class="relative h-0 w-0">
        <div
          class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setOpen((value) => !value)}
        >
          <div
            class="orb-wrapper relative w-fit"
            classList={{ "is-active": active() }}
          >
            <MainOrb
              class={`
                flex cursor-pointer items-center justify-center
                rounded-full
                text-black
                ring-1 ring-white/50
                transition-all duration-300 ease-in-out

                ${
                  active()
                    ? "bg-white opacity-100"
                    : `bg-white/60 ${
                        open() ? "opacity-100" : "opacity-90"
                      } hover:bg-white hover:opacity-100`
                }

                ${
                  open()
                    ? "h-15 w-15 sm:h-16 sm:w-16 md:h-17 md:w-17 lg:h-18 lg:w-18"
                    : "h-17 w-17 sm:w-18 sm:h-18 md:h-19 md:w-19 lg:h-20 lg:w-20"
                }
              `}
              open={open()}
              name={current()?.name ?? ""}
            />
            <NeonRing baseDuration={14} hoverDuration={2} />
          </div>
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
