import Image from "next/image";

const ProfilePosts = () => (
  <div className="flex flex-col space-y-4 pb-[50px]" data-testid="profile-posts">
    <div className="relative">
      <hr className="border-gray-50"></hr>
      <hr className="w-16 left-[440px] top-0 placeself-center border-gray-700 absolute"></hr>
    </div>
    <div className="flex gap-[7px] justify-center">
      <div></div>
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
