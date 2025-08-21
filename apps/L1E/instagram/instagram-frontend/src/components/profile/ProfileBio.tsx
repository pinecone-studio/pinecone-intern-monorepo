const ProfileBio = ({ bio }: {
  bio: string | null | undefined
}) => (
  <div>
    <p>{bio || ""}</p>
  </div>
);

export default ProfileBio;
