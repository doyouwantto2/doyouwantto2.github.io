interface CardTagProps {
  name: string;
}

export default function CardTag(props: CardTagProps) {
  const search = () => {
    const params = new URLSearchParams();
    params.set("tag", props.name);

    window.location.href = `/post?${params.toString()}`;
  };

  return (
    <button
      type="button"
      onClick={search}
      class="mt-1 w-fit cursor-pointer rounded-xl bg-gray-500 px-2 py-1 hover:bg-white hover:text-black md:text-sm"
    >
      #{props.name}
    </button>
  );
}
