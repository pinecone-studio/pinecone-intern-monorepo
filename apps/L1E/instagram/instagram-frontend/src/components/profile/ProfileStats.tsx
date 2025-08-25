interface StatsProps {
  posts: number;
  followers: number;
  following: number;
}

const ProfileStats = ({ posts, followers, following }: StatsProps) => (
  <div className="flex gap-8">
    <p className="font-normal text-base" data-testid="posts-count">{posts} posts</p>
    <p className="font-normal text-base" data-testid="followers-count">{followers} followers</p>
    <p className="font-normal text-base" data-testid="following-count">{following} following</p>
  </div>
);

export default ProfileStats;
