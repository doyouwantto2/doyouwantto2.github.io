import { createSignal, For, onMount, onCleanup, createEffect } from "solid-js";

export interface CommandStep {
  command?: string;
  output?: string;
}

interface CommandFlowProps {
  prompt?: string;
  steps?: CommandStep[];
  onClear?: () => void;
}

const rawFiles = import.meta.glob("../files/*.txt", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const VIRTUAL_FILES: Record<string, string> = {};
for (const path in rawFiles) {
  const fileName = path.split("/").pop() || "";
  if (fileName) VIRTUAL_FILES[fileName] = rawFiles[path];
}

const COMMANDS = ["ls", "cat", "clear", "help"];

const HELP_TEXT = [
  "Available commands:",
  "  ls            list files in the current directory",
  "  cat <file>    print the content of a file",
  "  clear         clear the terminal screen",
].join("\n");

export default function CommandFlow(props: CommandFlowProps) {
  const [history, setHistory] = createSignal<{ cmd: string; output: string }[]>(
    [],
  );
  const [input, setInput] = createSignal("");
  let inputRef: HTMLInputElement | undefined;
  let wrapperRef: HTMLDivElement | undefined;
  let isFirstRun = true;

  const promptText = () => props.prompt ?? "doyouwantto2@portfolio:~$";

  const scrollToBottom = () => {
    let el = wrapperRef?.parentElement;
    while (el) {
      const style = getComputedStyle(el);
      if (
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight
      ) {
        el.scrollTop = el.scrollHeight;
        return;
      }
      el = el.parentElement;
    }
  };

  createEffect(() => {
    history();

    if (isFirstRun) {
      isFirstRun = false;
      return;
    }

    scrollToBottom();
  });

  const handleAutoComplete = () => {
    const val = input().trimStart();
    const parts = val.split(/\s+/);

    if (parts.length === 1) {
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(parts[0]));
      if (matches.length === 1) setInput(matches[0] + " ");
    } else if (parts[0] === "cat") {
      const target = parts.slice(1).join(" ");
      const files = Object.keys(VIRTUAL_FILES);
      const matches = files.filter((file) => file.startsWith(target));
      if (matches.length === 1) setInput(`cat ${matches[0] || ""}`);
    }
  };

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();

    if (!trimmed) {
      setHistory((prev) => [...prev, { cmd: "", output: "" }]);
      return;
    }

    const args = trimmed.split(/\s+/);
    const mainCmd = args[0].toLowerCase();
    const targetFile = args[1];
    let output = "";

    switch (mainCmd) {
      case "clear":
        setHistory([]);
        props.onClear?.();
        return;
      case "help":
        output = HELP_TEXT;
        break;
      case "ls":
        output = Object.keys(VIRTUAL_FILES).join("   ");
        break;
      case "cat":
        if (!targetFile) output = "cat: missing file operand";
        else if (VIRTUAL_FILES[targetFile]) output = VIRTUAL_FILES[targetFile];
        else output = `cat: ${targetFile}: No such file or directory`;
        break;
      default:
        output = `command not found, please try: ${COMMANDS.join(", ")}`;
        break;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output }]);
  };

  onMount(() => {
    inputRef?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== inputRef) return;

      if (e.key === "Tab") {
        e.preventDefault();
        handleAutoComplete();
      } else if (e.key === "Enter") {
        executeCommand(input());
        setInput("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  return (
    <div
      ref={wrapperRef}
      class="font-mono text-sm leading-relaxed text-gray-200 mt-6"
      onClick={() => inputRef?.focus()}
    >
      <For each={history()}>
        {(item) => (
          <div class="mb-2">
            <div class="flex items-center gap-2">
              <span class="text-green-400 shrink-0">{promptText()}</span>
              <span class="text-white">{item.cmd}</span>
            </div>
            {item.output && (
              <div class="text-gray-400 whitespace-pre-wrap pl-2 mt-0.5">
                {item.output}
              </div>
            )}
          </div>
        )}
      </For>

      <div class="flex items-center gap-2">
        <span class="text-green-400 shrink-0">{promptText()}</span>
        <input
          ref={inputRef}
          type="text"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          class="flex-1 bg-transparent border-none outline-none text-white caret-green-400 font-mono"
          spellcheck={false}
          autocomplete="off"
        />
      </div>
    </div>
  );
}
