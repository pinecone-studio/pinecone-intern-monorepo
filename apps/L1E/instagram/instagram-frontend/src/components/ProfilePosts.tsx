import Image from "next/image";

const ProfilePosts = () => (
  <div>
    <div>
      <p>Post</p>
    </div>
    <div className="grid grid-cols-3 gap-1">
      <Image src="/placeholder-post.jpg" alt="postImage" width={500} height={500} />
    </div>
  </div>
);

export default ProfilePosts;
