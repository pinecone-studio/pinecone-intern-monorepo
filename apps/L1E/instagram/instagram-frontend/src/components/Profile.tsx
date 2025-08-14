import ProfileBio from "./ProfileBio";
import ProfileHeader from "./ProfileHeader";
import ProfileImage from "./ProfileImage";
import ProfilePosts from "./ProfilePosts";
import ProfileStats from "./ProfileStats";


interface ProfileProps {
  isMine: boolean;
  isPrivate: boolean;
  userName: string;
  bio: string;
  postsNumber: number;
  followersNumber: number;
  followingNumber: number;
}

const Profile = ({
  isMine,
  isPrivate,
  userName,
  bio,
  postsNumber,
  followersNumber,
  followingNumber,
}: ProfileProps) => {
  return (
    <div className="w-fit mx-auto">
      <div className="flex gap-[100px] mb-[60px] w-fit mx-auto ">
        <ProfileImage />
        <div className="space-y-5">
          <ProfileHeader isMine={isMine} isPrivate={isPrivate} userName={userName} />
          <ProfileStats
            postsNumber={postsNumber}
            followersNumber={followersNumber}
            followingNumber={followingNumber}
          />
          <ProfileBio bio={bio} />
        </div>
      </div>
      <ProfilePosts />
    </div>
  );
};

export default Profile;
