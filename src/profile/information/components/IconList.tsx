import { siGithub, siCodeforces, siDiscord, siMailgun } from "simple-icons";

const renameSvgTitle = (svg: any, newTitle: any) =>
  svg.replace(/<title>.*?<\/title>/, `<title>${newTitle}</title>`);

const iconClass =
  "[&_svg]:fill-white cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 inline-block";

export default function IconList() {
  return (
    <ul class="flex flex-row justify-around p-10 gap-10 md:gap-12">
      <li class="flex items-center gap-2">
        <a
          href="https://github.com/doyouwantto2"
          target="_blank"
          rel="noopener noreferrer"
          class={iconClass}
          innerHTML={siGithub.svg}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="https://atcoder.jp/users/doyouwantto2"
          target="_blank"
          rel="noopener noreferrer"
          class={iconClass}
          innerHTML={renameSvgTitle(siCodeforces.svg, "AtCoder")}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="https://discord.com/users/868431593755279390"
          target="_blank"
          rel="noopener noreferrer"
          class={iconClass}
          innerHTML={siDiscord.svg}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="mailto:emiya2467@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          class={iconClass}
          innerHTML={siMailgun.svg}
        />
      </li>
    </ul>
  );
}
