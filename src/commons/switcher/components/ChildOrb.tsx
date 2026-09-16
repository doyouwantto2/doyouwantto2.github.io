import { createEffect, onCleanup } from "solid-js";
import { gsap } from "gsap";
import NeonRing from "./NeonRing";

interface ChildOrbProps {
  name: string;
  link: string;
  order: number;
  total: number;
  open: boolean;
}

const readCssLengthPx = (
  el: HTMLElement | null,
  varName: string,
  fallback: number,
): number => {
  if (!el) return fallback;
  const raw = getComputedStyle(el).getPropertyValue(varName).trim();
  if (!raw) return fallback;
  const num = parseFloat(raw);
  if (Number.isNaN(num)) return fallback;
  if (raw.endsWith("rem")) {
    const root =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return num * root;
  }
  if (raw.endsWith("em")) {
    const fontSize = parseFloat(getComputedStyle(el).fontSize) || 16;
    return num * fontSize;
  }
  return num;
};

export default function ChildOrb(props: ChildOrbProps) {
  let ref: HTMLDivElement | undefined;
  let animation: gsap.core.Tween | undefined;

  const getRadius = () => readCssLengthPx(ref ?? null, "--orb-r", 180);

  const getTargetPosition = () => {
    const angle = (Math.PI / 2) * (props.order / (props.total - 1));
    const r = getRadius();

    return {
      x: r * Math.cos(angle),
      y: -r * Math.sin(angle),
    };
  };

  createEffect(() => {
    if (!ref) return;

    if (!animation) {
      const { x, y } = getTargetPosition();

      gsap.set(ref, {
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
      });

      animation = gsap.to(ref, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        duration: 0.1,
        delay: 0.02,
        paused: true,
      });
    }

    if (props.open) {
      animation.play();
    } else if (animation.progress() > 0) {
      animation.reverse();
    }
  });

  onCleanup(() => {
    animation?.kill();
  });

  return (
    <a
      href={props.link}
      class="absolute top-0 left-0 block"
      classList={{
        "pointer-events-auto": props.open,
        "pointer-events-none": !props.open,
      }}
    >
      <div
        ref={ref}
        class="
          absolute top-0 left-0
          [--orb-r:150px]
          sm:[--orb-r:150px]
          md:[--orb-r:180px]
          lg:[--orb-r:200px]
        "
      >
        <div class="orb-wrapper relative w-fit">
          <div
            class="
              flex items-center justify-center
              rounded-full cursor-pointer
              text-black text-sm font-medium

              h-22 w-22
              sm:h-23 sm:w-23
              md:h-24 md:w-24

              bg-white/70
              ring-1 ring-white/50

              transition-colors duration-200 ease-out

              hover:bg-white/90
            "
          >
            {props.name}
          </div>
          <NeonRing baseDuration={10} hoverDuration={1.5} reverse />
        </div>
      </div>
    </a>
  );
}
