import { Grid3X3Icon } from "lucide-react";
import Image from "next/image";

const ProfilePosts = () => (
  <div className="flex flex-col space-y-4 pb-[50px]" data-testid="profile-posts">
    <div className="relative">
      <hr className="border-gray-50"></hr>
      <hr className="w-[70px] left-[434px] top-0 placeself-center border-gray-700 absolute"></hr>
    </div>
    <div className="flex gap-[7px] justify-center items-center">
      <div><Grid3X3Icon strokeWidth={1} size={16} /></div>
      <p className="text-sm font-medium">Posts</p>
    </div>
    <div className="grid grid-cols-3 gap-1">
      <Image src="/postImage.jpg" alt="postImage" width={309} height={309} className="w-[309px] h-[309px] object-cover" />
      <Image src="/postImage.jpg" alt="postImage" width={309} height={309} className="w-[309px] h-[309px] object-cover" />
      <Image src="/postImage.jpg" alt="postImage" width={309} height={309} className="w-[309px] h-[309px] object-cover" />
    </div>
  </div>
);

export default ProfilePosts;
