import { createEffect, onCleanup } from "solid-js";
import { gsap } from "gsap";

export interface orbPosition {
  x: number;
  y: number;
  r: number;
}

interface ChildOrbProps {
  name: string;
  link: string;
  order: number;
  base: orbPosition;
  total: number;
  open: boolean;
}

export default function ChildOrb(props: ChildOrbProps) {
  let ref: HTMLDivElement | undefined;

  const getTargetPosition = () => {
    const angle = (Math.PI / 2) * (props.order / (props.total - 1));

    const x = props.base.r * Math.cos(angle);
    const y = -props.base.r * Math.sin(angle);

    return { x, y };
  };

  createEffect(() => {
    if (!ref) return;
    gsap.killTweensOf(ref);

    if (props.open) {
      const { x, y } = getTargetPosition();
      gsap.fromTo(
        ref,
        { x: 0, y: 0, xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 },
        {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: props.order * 0.05,
          ease: "back.out(1.7)",
        },
      );
    } else {
      gsap.to(ref, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        delay: (props.total - props.order) * 0.03,
        ease: "power2.in",
      });
    }
  });

  onCleanup(() => {
    if (ref) gsap.killTweensOf(ref);
  });

  return (
    <div
      ref={ref}
      class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto border cursor-pointer rounded-full h-22 w-22 flex items-center justify-center"
    >
      <a href={props.link}>{props.name}</a>
    </div>
  );
}
