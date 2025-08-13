import Image from "next/image";

const ProfileImage = () => (
  <div>
    <Image
      src="/placeholder-post.jpg"
      alt="profileImage"
      width={200}
      height={200}
      style={{ borderRadius: "100%", border: "black" }}
    />
  </div>
);

export default ProfileImage;
