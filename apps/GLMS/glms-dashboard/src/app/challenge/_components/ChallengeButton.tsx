type ChallengeButtonProps = {
  text: string;
};

export const ChallengeButton: React.FC<ChallengeButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
