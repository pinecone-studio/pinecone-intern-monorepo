import ProfileBio from "./ProfileBio";
import ProfileHeader from "./ProfileHeader";
import ProfileImage from "./ProfileImage";
import ProfilePosts from "./ProfilePosts";
import ProfileStats from "./ProfileStats";

export type PostType = {
  id: string;
  image: string;
  text: string;
  createdAt: string;
  likes: number;
  comments: number;
  userId: string;
}

export type FollowerType = {
  id: string;
  userName: string;
  image: string | null;
}

export type FollowingType = {
  id: string;
  userName: string;
  image: string | null;
}
interface ProfileProps {
  isMine: boolean;
  isPrivate: boolean;
  userName: string;
  bio?: string | null;
  image?: string | null;
  posts: PostType[] | [];
  followers: FollowerType[] | [];
  following: FollowingType[] | [];
}

const Profile = ({
  isMine,
  isPrivate,
  userName,
  bio,
  image,
  posts,
  followers,
  following,
}: ProfileProps) => {
  return (
    <div className="w-fit mx-auto">
      <div className="flex gap-[100px] ml-[72px] mb-[60px]">
        <ProfileImage image={image} />
        <div className="space-y-5">
          <ProfileHeader isMine={isMine} isPrivate={isPrivate} userName={userName} />
          <ProfileStats
            posts={posts?.length || 0}
            followers={followers?.length || 0}
            following={following?.length || 0}
          />
          <ProfileBio bio={bio} />
        </div>
      </div>
      <ProfilePosts />
    </div>
  );
};

export default Profile;
