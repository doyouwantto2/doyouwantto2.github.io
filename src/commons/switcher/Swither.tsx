import { createSignal, createEffect, onCleanup, Index } from "solid-js";
import MainOrb from "./components/MainOrb";
import ChildOrb from "./components/ChildOrb";
import gsap from "gsap";

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

const orbPosition = {
  x: 4,
  y: 4,
};

export default function Switcher({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = createSignal(false);

  let mainOrbRef: HTMLDivElement | undefined;
  let childOrbContainerRef: HTMLDivElement | undefined;

  const current = () => {
    const sorted = [...pathList].sort((a, b) => b.link.length - a.link.length);
    return sorted.find((item) => currentPath.startsWith(item.link));
  };

  const children = () =>
    pathList.filter((element) => element.link !== current()?.link);

  createEffect(() => {
    if (!mainOrbRef) return;

    gsap.killTweensOf(mainOrbRef);

    if (!open()) {
      gsap.to(mainOrbRef, {
        rotation: 180,
        x: 0,
        duration: 2,
        ease: "power2.out",
      });
    } else {
      gsap.to(mainOrbRef, {
        x: 400,
        duration: 2,
        ease: "power2.out",
      });
    }
  });

  createEffect(() => {
    if (open()) {
      queueMicrotask(() => {
        if (!childOrbContainerRef) return;

        const orbElements = childOrbContainerRef.children;

        gsap.fromTo(
          orbElements,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
        );
      });
    } else {
    }
  });

  onCleanup(() => {
    if (mainOrbRef) {
      gsap.killTweensOf(mainOrbRef);
    }
    if (childOrbContainerRef) {
      gsap.killTweensOf(childOrbContainerRef.children);
    }
  });

  return (
    <div
      class="fixed z-10"
      style={{
        bottom: `${orbPosition.y}em`,
        left: `${orbPosition.x}em`,
      }}
    >
      <div class="" onClick={() => setOpen((value) => !value)}>
        <MainOrb
          ref={(el: HTMLDivElement) => (mainOrbRef = el)}
          name={current()?.name ?? ""}
        />
      </div>

      {open() && (
        <div
          ref={(el: HTMLDivElement) => (childOrbContainerRef = el)}
          class="absolute left-20 -top-20"
        >
          <Index each={children()}>
            {(element, index) => (
              <ChildOrb
                name={element().name}
                link={element().link}
                order={index}
              />
            )}
          </Index>
        </div>
      )}
    </div>
  );
}
