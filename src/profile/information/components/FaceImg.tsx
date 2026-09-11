import Face from "../../../assets/Face.jpeg?url";

export default function FaceImg() {
  return (
    <div class="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      <div class="relative">
        <div
          class="absolute inset-0 rounded-full blur-2xl opacity-40
                 bg-gradient-to-br from-green-400/60 to-emerald-500/40
                 scale-90"
        />
        <img
          src={Face}
          alt="Nguyen Nam Phong"
          class="relative rounded-full object-cover ring-2 ring-gray-700/60
                 h-45 w-45
                 md:h-47 md:w-47
                 lg:h-62 lg:w-62"
        />
      </div>

      <p
        class="font-bold text-center tracking-tight
               text-base sm:text-lg md:text-2xl lg:text-3xl"
      >
        Nguyen Nam Phong
      </p>
    </div>
  );
}
