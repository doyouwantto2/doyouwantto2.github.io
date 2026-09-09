import { siGithub, siCodeforces, siDiscord, siMailgun } from "simple-icons";

export default function IconList() {
  return (
    <ul class="flex flex-col justify-between p-2">
      <li class="flex items-center gap-2">
        <a
          href="https://github.com/doyouwantto2"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 inline-block"
          innerHTML={siGithub.svg}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="https://codeforces.com/profile/Remind-me"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 inline-block"
          innerHTML={siCodeforces.svg}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="https://discord.com/users/868431593755279390"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 inline-block"
          innerHTML={siDiscord.svg}
        />
      </li>
      <li class="flex items-center gap-2">
        <a
          href="mailto:emiya2467@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          class="[&_svg]:fill-white cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 inline-block"
          innerHTML={siMailgun.svg}
        />
      </li>
    </ul>
  );
}
