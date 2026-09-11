import { createEffect, onCleanup } from "solid-js";
import { gsap } from "gsap";

interface ChildOrbProps {
  name: string;
  link: string;
  order: number;
  total: number;
  open: boolean;
}

export default function ChildOrb(props: ChildOrbProps) {
  let ref: HTMLDivElement | undefined;
  let animation: gsap.core.Tween | undefined;

  const getRadius = () => {
    if (!ref) return 180;

    const value = getComputedStyle(ref).getPropertyValue("--orb-r");

    return parseFloat(value) || 180;
  };

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
        scale: 1,
      });

      animation = gsap.to(ref, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        scale: 1,
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
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          cursor-pointer

          h-20 w-20
          [--orb-r:140em]
          sm:h-20 sm:w-20 sm:[--orb-r:140em]
          md:h-20 md:w-20 md:[--orb-r:170em]
          lg:h-22 lg:w-22 lg:[--orb-r:190em]

          flex items-center justify-center
          text-black text-xs font-medium

          bg-white/50 backdrop-blur-lg
          ring-1 ring-white/30
          shadow-[0_0_16px_rgba(255,255,255,0.2)]

          transition-all duration-300 ease-in-out

          opacity-70
          hover:opacity-100
          hover:scale-110
          hover:bg-white/85
          hover:ring-white/70
          hover:shadow-[0_0_28px_rgba(255,255,255,0.55)]
        "
      >
        {props.name}
      </div>
    </a>
  );
}
