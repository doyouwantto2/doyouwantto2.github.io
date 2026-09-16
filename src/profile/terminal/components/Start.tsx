import {
  createSignal,
  onMount,
  onCleanup,
  For,
  Show,
  createEffect,
} from "solid-js";

interface StartProps {
  onComplete?: () => void;
  completed?: boolean;
}

const ASCII_PORTFOLIO = `
██████╗  ██████╗ ██╗   ██╗ ██████╗ ██╗   ██╗██╗    ██╗ █████╗ ███╗   ██╗████████╗████████╗ ██████╗ ██████╗
██╔══██╗██╔═══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║██║    ██║██╔══██╗████╗  ██║╚══██╔══╝╚══██╔══╝██╔═══██╗╚════██╗
██║  ██║██║   ██║ ╚████╔╝ ██║   ██║██║   ██║██║ █╗ ██║███████║██╔██╗ ██║   ██║      ██║   ██║   ██║ █████╔╝
██║  ██║██║   ██║  ╚██╔╝  ██║   ██║██║   ██║██║███╗██║██╔══██║██║╚██╗██║   ██║      ██║   ██║   ██║██╔═══╝
██████╔╝╚██████╔╝   ██║   ╚██████╔╝╚██████╔╝╚███╔███╔╝██║  ██║██║ ╚████║   ██║      ██║   ╚██████╔╝███████╗
╚═════╝  ╚═════╝    ╚═╝    ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝      ╚═╝    ╚═════╝ ╚══════╝
`;

const SCRIPT_STEPS = [
  {
    content: (
      <div>
        <pre class="text-green-500 font-bold text-[10px] sm:text-xs leading-none mb-3 overflow-hidden">
          {ASCII_PORTFOLIO}
        </pre>

        <p class="text-gray-200">
          Welcome to my little corner on the internet.
        </p>
        <p class="text-gray-200 text-xs mt-1">
          You can press <span class="text-yellow-400">Home</span> button below
          anytime to see my work.
        </p>
      </div>
    ),
    promptDesktop: "> Press [ENTER] to load profile...",
    promptMobile: "> Tap to load profile...",
  },

  {
    content: (
      <div class="border-l-2 border-green-500 pl-3 py-1 space-y-1 text-emerald-300">
        <p class="font-bold text-yellow-400">[ USER PROFILE ]</p>
        <p>✧ Name: Nguyen Nam Phong</p>
        <p>
          ✧ Role: Student — Information Technology (Vietnam – Japan program)
        </p>
        <p>
          ✧ School: University of Information and Technology (UIT), Vietnam
          National University HCMC
        </p>
        <p>
          ✧ Interests: high-performance applications, software architecture and
          low-level programming
        </p>
      </div>
    ),
    promptDesktop: "> Press [ENTER] to view hobbies",
    promptMobile: "> Tap to view hobbies...",
  },

  {
    content: (
      <div class="border-l-2 border-pink-500 pl-3 py-1 space-y-1 text-pink-300">
        <p class="font-bold text-yellow-400">[ HOBBIES ]</p>
        <p>✧ Listening to Japanese news (NHK, podcasts)</p>
        <p>✧ Coding — building small tools and side projects</p>
        <p>✧ Music — mostly while studying or coding</p>
        <p>✧ Reading tech blogs &amp; exploring new frameworks</p>
      </div>
    ),
    promptDesktop: "> Press [ENTER] to open interactive shell...",
    promptMobile: "> Tap to open interactive shell...",
  },
];

const findScrollParent = (el: HTMLElement | null): HTMLElement | null => {
  let parent = el?.parentElement ?? null;
  while (parent) {
    const style = getComputedStyle(parent);
    if (/(auto|scroll)/.test(style.overflowY)) return parent;
    parent = parent.parentElement;
  }
  return null;
};

export default function Start(props: StartProps) {
  const [step, setStep] = createSignal(0);
  const [isTouch, setIsTouch] = createSignal(false);
  let rootRef: HTMLDivElement | undefined;

  const advance = () => {
    if (props.completed) return;

    if (step() < SCRIPT_STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      props.onComplete?.();
    }
  };

  onMount(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (props.completed) return;
      if (e.key === "Enter") advance();
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  const currentPrompt = () => {
    const s = SCRIPT_STEPS[step()];
    return isTouch() ? s.promptMobile : s.promptDesktop;
  };

  const visibleSteps = () =>
    props.completed ? SCRIPT_STEPS : SCRIPT_STEPS.slice(0, step() + 1);

  createEffect(() => {
    step();
    requestAnimationFrame(() => {
      const scroller = findScrollParent(rootRef ?? null);
      if (scroller) {
        scroller.scrollTop = scroller.scrollHeight;
      }
    });
  });

  return (
    <div
      ref={rootRef}
      class="font-mono text-sm leading-relaxed select-none flex flex-col"
      classList={{ "cursor-pointer": !props.completed }}
      onClick={advance}
    >
      <div class="space-y-5">
        <For each={visibleSteps()}>{(item) => <div>{item.content}</div>}</For>
      </div>

      <Show when={!props.completed}>
        <div class="mt-6 flex items-center gap-2 text-yellow-400 animate-pulse">
          <span class="text-green-500">$</span>
          <span>{currentPrompt()}</span>
        </div>
      </Show>

      <Show when={props.completed}>
        <div class="mt-6 flex items-center gap-2 text-green-500">
          <span>$</span>
          <span class="text-gray-500">
            session loaded — type <span class="text-white">help</span> to see
            available commands.
          </span>
        </div>
      </Show>
    </div>
  );
}
