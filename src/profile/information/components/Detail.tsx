const DETAILS = [
  { label: "Country", value: "Viet Nam" },
  { label: "English", value: "TOEIC" },
  { label: "Japanese", value: "N2, BJT" },
  {
    label: "Technologies",
    value:
      "Tokio, Tauri, Astro, SolidJS, NodeJS, ReactJS, Ethereum, PostgreSQL, Neo4j",
  },
  {
    label: "Languages",
    value: "Rust, C, C++, Ruby, HTML, CSS, TypeScript, JavaScript, Python, Nix",
  },
  {
    label: "Skills",
    value:
      "Clean architecture, DDD, high-performance & scalable applications, low level understanding",
  },
  { label: "OS", value: "NixOS, Debian" },
  { label: "Tools", value: "Wezterm, Neovim, VSCode" },
];

export default function Detail() {
  return (
    <ul class="mt-5 divide-y divide-gray-700/60">
      {DETAILS.map((item) => (
        <li
          class="flex flex-col gap-1 py-2
                   sm:flex-row sm:gap-3 sm:py-2.5
                   text-sm sm:text-base md:text-lg lg:text-xl"
        >
          <span class="font-bold text-green-400 shrink-0 sm:min-w-36 md:min-w-40">
            {item.label}:
          </span>
          <span class="text-gray-200 leading-relaxed">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
