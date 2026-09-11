import FaceImg from "./components/FaceImg";
import IconList from "./components/IconList";
import Detail from "./components/Detail";

export default function Information() {
  return (
    <div class="p-5 rounded-2xl bg-gray-700">
      <h2 class="text-green-400 font-bold text-2xl md:text-3xl lg:text-4xl pb-4 mb-6 text-center border-b">
        Profile
      </h2>

      <div class="flex flex-row items-center">
        <div class="flex flex-col">
          <FaceImg />
          <Detail />
        </div>
      </div>

      <IconList />
    </div>
  );
}
