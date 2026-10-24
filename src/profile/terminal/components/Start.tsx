import type { JSX } from "solid-js";

interface StartProps {
  children: JSX.Element;
}

const ASCII_PORTFOLIO = String.raw`
██╗  ██╗██╗    ████████╗██╗  ██╗███████╗██████╗ ███████╗
██║  ██║██║    ╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝
███████║██║       ██║   ███████║█████╗  ██████╔╝█████╗  
██╔══██║██║       ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
██║  ██║██║       ██║   ██║  ██║███████╗██║  ██║███████╗
╚═╝  ╚═╝╚═╝       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
`;

export default function Start(props: StartProps) {
  return (
    <div class="flex flex-col font-mono text-xs leading-relaxed sm:text-sm">
      <div class="space-y-2">
        <pre class="max-w-full overflow-x-auto whitespace-pre text-[8px] font-bold leading-tight text-green-500 sm:text-xs">
          {ASCII_PORTFOLIO.trim()}
        </pre>

        <p class="text-gray-300">
          Welcome to my little corner on the internet.
        </p>

        <p class="text-gray-500">
          <span class="text-green-500">#</span> Type{" "}
          <span class="text-yellow-400">help</span> in the terminal to see
          available commands.
        </p>
      </div>
      {props.children}
    </div>
  );
}
