interface BreadcrumbProps {
  base: string;
}

export default function Breadcrumb(props: BreadcrumbProps) {
  return <div>{props.base}</div>;
}
