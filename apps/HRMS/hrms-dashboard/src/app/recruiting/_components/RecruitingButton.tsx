type RecruitingButtonProps = {
  text: string;
};

export const RecruitingButton = (props: RecruitingButtonProps) => {
  const { text } = props;
  return <button>{text}</button>;
};
