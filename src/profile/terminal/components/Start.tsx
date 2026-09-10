import { createSignal, onMount, onCleanup, For } from "solid-js";

interface StartProps {
  onComplete?: () => void;
}

const ASCII_PORTFOLIO = `
██████╗ ██████╗ ██████╗ ████████╗███████╗██████╗ ██╗     ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██║    ██╔═══██╗
██████╔╝██║   ██║██████╔╝█████╗  █████╗  ██████╔╝██║    ██║   ██║
██╔═══╝ ██║   ██║██╔══██╗██╔══╝  ██╔══╝  ██╔══██╗██║    ██║   ██║
██║     ╚██████╔╝██║  ██║███████╗██║     ██║  ██║███████╗╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝ 
`;

const SCRIPT_STEPS = [
  {
    content: (
      <div>
        <pre class="text-green-500 font-bold text-[10px] sm:text-xs leading-none mb-2 overflow-hidden">
          {ASCII_PORTFOLIO}
        </pre>
        <p class="text-gray-400">Welcome to interactive portfolio terminal.</p>
      </div>
    ),
    prompt: "> Press [ENTER] to load profile...",
  },
  {
    content: (
      <div class="border-l-2 border-green-500 pl-3 py-1 space-y-1 text-emerald-300">
        <p class="font-bold text-yellow-400">[USER PROFILE]</p>
        <p>✦ Name: Emiya</p>
        <p>✦ Role: Full-Stack Web Developer</p>
        <p>✦ Status: Building modern & performant web experiences.</p>
      </div>
    ),
    prompt: "> Press [ENTER] to view tech stack...",
  },
  {
    content: (
      <div class="border-l-2 border-cyan-500 pl-3 py-1 space-y-1 text-cyan-300">
        <p class="font-bold text-yellow-400">[TECH STACK]</p>
        <p>✦ Frontend: Astro, SolidJS, React, Tailwind CSS</p>
        <p>✦ Backend: Node.js, Tokio, REST APIs</p>
        <p>✦ Tools: Git, Vite, Linux</p>
      </div>
    ),
    prompt: "> Press [ENTER] to start interactive shell...",
  },
];

export default function Start(props: StartProps) {
  const [step, setStep] = createSignal(0);

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step() < SCRIPT_STEPS.length - 1) {
          setStep((prev) => prev + 1);
        } else {
          props.onComplete?.();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  return (
    <div class="font-mono text-sm leading-relaxed select-none flex flex-col justify-between">
      <div class="space-y-4">
        <For each={SCRIPT_STEPS.slice(0, step() + 1)}>
          {(item) => <div>{item.content}</div>}
        </For>
      </div>

      <div class="mt-6 flex items-center gap-2 text-yellow-400 animate-pulse">
        <span>{SCRIPT_STEPS[step()].prompt}</span>
      </div>
    </div>
  );
}
