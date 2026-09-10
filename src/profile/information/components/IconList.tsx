import { siGithub, siCodeforces, siDiscord, siMailgun } from "simple-icons";

const renameSvgTitle = (svg: any, newTitle: any) =>
  svg.replace(/<title>.*?<\/title>/, `<title>${newTitle}</title>`);

export default function IconList() {
  return (
    <ul class="flex flex-col justify-between p-2">
      <li class="flex items-center gap-2">
        <a
          href="https://github.com/doyouwantto2"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 inline-block"
          innerHTML={siGithub.svg}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="https://atcoder.jp/users/doyouwantto2"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 inline-block"
          innerHTML={renameSvgTitle(siCodeforces.svg, "AtCoder")}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="https://discord.com/users/868431593755279390"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 inline-block"
          innerHTML={siDiscord.svg}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="mailto:emiya2467@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 inline-block"
          innerHTML={siMailgun.svg}
        />
      </li>
    </ul>
  );
}
