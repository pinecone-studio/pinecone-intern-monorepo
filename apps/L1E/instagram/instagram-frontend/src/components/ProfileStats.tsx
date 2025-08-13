interface StatsProps {
  postsNumber: number;
  followersNumber: number;
  followingNumber: number;
}

const ProfileStats = ({ postsNumber, followersNumber, followingNumber }: StatsProps) => (
  <div className="flex gap-8">
    <p><b>{postsNumber}</b> posts</p>
    <p><b>{followersNumber}</b> followers</p>
    <p><b>{followingNumber}</b> following</p>
  </div>
);

export default ProfileStats;
