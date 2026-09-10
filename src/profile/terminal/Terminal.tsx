import { createSignal, Show } from "solid-js";
import TabBar from "./components/TabBar";
import CommandFlow from "./components/CommandFlow";
import Start from "./components/Start";
import type { CommandStep } from "./components/CommandFlow";

interface TerminalProps {
  title?: string;
  prompt?: string;
  steps?: CommandStep[];
}

export default function Terminal(props: TerminalProps) {
  const [isStarted, setIsStarted] = createSignal(false);

  return (
    <div class="w-full bg-[#1c1c1e] rounded-xl font-mono text-sm text-green-400 shadow-2xl border border-gray-800/80 overflow-hidden">
      <TabBar title={props.title} />
      <div class="p-5">
        <Show
          when={isStarted()}
          fallback={<Start onComplete={() => setIsStarted(true)} />}
        >
          <CommandFlow steps={props.steps} prompt={props.prompt} />
        </Show>
      </div>
    </div>
  );
}
