type ProfileButtonProps = {
  text: string;
};

export const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
