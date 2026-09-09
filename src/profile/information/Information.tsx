import FaceImg from "./components/FaceImg";
import IconList from "./components/IconList";
import Detail from "./components/Detail";

export default function Information() {
  return (
    <div class="p-5 rounded-2xl bg-gray-700 mx-auto">
      <div class="flex flex-col items-center">
        <div class="flex flex-row items-stretch gap-4 md:gap-6 lg:gap-8">
          <FaceImg />
          <IconList />
        </div>
      </div>

      <Detail />
    </div>
  );
}
