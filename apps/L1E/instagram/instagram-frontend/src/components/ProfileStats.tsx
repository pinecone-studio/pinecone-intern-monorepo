interface StatsProps {
  postsNumber: number;
  followersNumber: number;
  followingNumber: number;
}

const ProfileStats = ({ postsNumber, followersNumber, followingNumber }: StatsProps) => (
  <div className="flex gap-8">
    <p className="font-normal text-base" data-testid="posts-count">{postsNumber} posts</p>
    <p className="font-normal text-base" data-testid="followers-count">{followersNumber} followers</p>
    <p className="font-normal text-base" data-testid="following-count">{followingNumber} following</p>
  </div>
);

export default ProfileStats;
