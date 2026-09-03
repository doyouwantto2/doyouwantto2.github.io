interface BreadcrumbProps {
  link: string;
  name: string;
  id: string;
  title: string;
}

export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <div>
      <a href={"/" + props.link}>{props.name}</a>
      {props.title != "" ? " > " : ""}
      <a href={"/" + props.link + "/" + props.id}>{props.title}</a>
    </div>
  );
}
