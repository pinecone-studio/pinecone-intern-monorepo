type ProfileButtonProps = {
  text: string;
};

export const RecruitingButton: React.FC<ProfileButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
