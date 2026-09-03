import SocialNetwork from "./components/SocialNetwork";
import TagItem from "./components/TagItem";
import Face from "../../assets/Face.jpeg?url";

export default function Profile() {
  return (
    <div class="">
      <img src={Face} class="w-full aspect-square object-cover rounded-full" />
      <SocialNetwork />
      <TagItem />
    </div>
  );
}
