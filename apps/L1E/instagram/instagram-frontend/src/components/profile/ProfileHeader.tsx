import ProfileButtons from "./ProfileButtons";

interface HeaderProps {
  isMine: boolean;
  isPrivate: boolean;
  userName: string;
}

const ProfileHeader = ({ isMine, isPrivate, userName }: HeaderProps) => (
  <div className="flex gap-4">
    <p className="my-auto text-xl font-semibold">{userName}</p>
    <ProfileButtons isMine={isMine} isPrivate={isPrivate} />
  </div>
);

export default ProfileHeader;
