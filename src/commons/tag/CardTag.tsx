interface CardTagProps {
  name: string;
}

export default function CardTag(props: CardTagProps) {
  return (
    <div class="mt-1 md:text-sm rounded-xl w-fit pl-2 pr-2 pt-1 pb-1 hover:text-black hover:bg-white cursor-pointer bg-gray-500">
      #{props.name}
    </div>
  );
}
