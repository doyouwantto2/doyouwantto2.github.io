import Face from "../../../assets/Face.jpeg?url";

export default function FaceImg() {
  return (
    <div class="flex flex-col items-center">
      <img
        src={Face}
        class="rounded-full h-35 w-35 md:h-45 md:w-45 lg:h-60 lg:w-60"
      />
      <p class="font-bold text-sm md:text-xl mt-4">Nguyen Nam Phong</p>
    </div>
  );
}
