interface BreadcrumbProps {
  link: string;
  name: string;
  id: string;
  title: string;
}

export default function Breadcrumb({ link, name, id, title }: BreadcrumbProps) {
  const linkClass =
    "border rounded-xl pl-3 pr-3 pb-2 pt-2 w-fit mb-3 inline-block";

  return (
    <div>
      <a class={linkClass} href={`/${link}`}>
        {name}
      </a>
      {title && (
        <>
          {" > "}
          <a class={linkClass} href={`/${link}/${id}`}>
            {title}
          </a>
        </>
      )}
    </div>
  );
}
