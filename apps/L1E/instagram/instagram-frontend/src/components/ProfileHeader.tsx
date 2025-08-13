import ProfileButtons from "./ProfileButtons";

interface HeaderProps {
  isMine: boolean;
  isPrivate: boolean;
  userName: string;
}

const ProfileHeader = ({ isMine, isPrivate, userName }: HeaderProps) => (
  <div>
    <p>{userName}</p>
    <ProfileButtons isMine={isMine} isPrivate={isPrivate} />
  </div>
);

export default ProfileHeader;
