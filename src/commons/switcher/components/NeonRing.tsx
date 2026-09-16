interface NeonRingProps {
  baseDuration?: number;
  hoverDuration?: number;
  reverse?: boolean;
}

export default function NeonRing(props: NeonRingProps) {
  const base = () => props.baseDuration ?? 8;
  const hover = () => props.hoverDuration ?? 2;

  // Tốc độ lớp trong sao cho (ngoài + trong) = tốc độ hover mong muốn
  // rate = 360 / duration  →  inner = 1 / (1/hover - 1/base)
  const innerDuration = () => {
    const D = base();
    const H = hover();
    if (H >= D) return D; // guard
    return (D * H) / (D - H);
  };

  return (
    <svg
      class="neon-ring-outer pointer-events-none absolute -inset-5 z-10"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      style={`
        --neon-base-duration: ${base()}s;
        --neon-inner-duration: ${innerDuration()}s;
        --neon-direction: ${props.reverse ? "reverse" : "normal"};
      `}
    >
      <g class="neon-ring-inner">
        {/* C thứ nhất — bên phải */}
        <path
          d="M 57.29 8.64 A 42 42 0 0 1 57.29 91.36"
          stroke="#f0f0f0"
          stroke-width="4"
          stroke-linecap="round"
        />
        {/* C thứ hai — bên trái, đối xứng 180° */}
        <path
          d="M 42.71 91.36 A 42 42 0 0 1 42.71 8.64"
          stroke="#f0f0f0"
          stroke-width="4"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
}
