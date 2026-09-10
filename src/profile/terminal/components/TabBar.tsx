interface TabBarProps {
  title?: string;
}

export default function TabBar(props: TabBarProps) {
  return (
    <div class="relative flex items-center justify-center h-10 w-full bg-[#1c1c1e] border-b border-gray-800 rounded-t-lg">
      <div class="absolute left-4 flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span class="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span class="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>

      <span class="text-xs font-semibold text-gray-400 select-none">
        {props.title ?? "user@portfolio: ~"}
      </span>
    </div>
  );
}
