import Image from "next/image";

const ProfileImage = () => (
  <div>
    <Image
      src="/profileImage.webp"
      alt="profileImage"
      width={150}
      height={150}
      className="w-[150px] h-[150px] object-cover rounded-full"
    />
  </div>                    
);

export default ProfileImage;
