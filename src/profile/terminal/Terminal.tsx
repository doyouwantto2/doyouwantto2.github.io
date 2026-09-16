import { createSignal, Show } from "solid-js";
import TabBar from "./components/TabBar";
import CommandFlow from "./components/CommandFlow";
import Start from "./components/Start";
import type { CommandStep } from "./components/CommandFlow";

interface TerminalProps {
  title?: string;
  prompt?: string;
  steps?: CommandStep[];
  height?: string;
}

export default function Terminal(props: TerminalProps) {
  const [isStarted, setIsStarted] = createSignal(false);
  const [showStart, setShowStart] = createSignal(true);

  return (
    <div
      style={{ height: props.height ?? "500px" }}
      class="w-full max-h-[80vh] min-h-0 flex flex-col
             bg-[#1c1c1e] rounded-xl font-mono text-sm text-green-400
             shadow-2xl border border-gray-800/80 overflow-hidden"
    >
      <TabBar title={props.title} />

      <div
        class="p-5 flex-1 min-h-0 overflow-y-auto
               [scrollbar-width:thin]
               [scrollbar-color:theme(colors.gray.700)_transparent]

               [&::-webkit-scrollbar]:w-1.5
               [&::-webkit-scrollbar]:h-1.5
               [&::-webkit-scrollbar-track]:bg-transparent
               [&::-webkit-scrollbar-thumb]:rounded-full
               [&::-webkit-scrollbar-thumb]:bg-gray-700/60
               hover:[&::-webkit-scrollbar-thumb]:bg-gray-600
               [&::-webkit-scrollbar-corner]:bg-transparent"
      >
        <Show when={showStart()}>
          <Start
            completed={isStarted()}
            onComplete={() => setIsStarted(true)}
          />
        </Show>

        <Show when={isStarted()}>
          <CommandFlow
            steps={props.steps}
            prompt={props.prompt}
            onClear={() => setShowStart(false)}
          />
        </Show>
      </div>
    </div>
  );
}
