type AssessmentButtonProps = {
  text: string;
};

export const LeavingButton = (props: AssessmentButtonProps) => {
  const { text } = props;
  return <button>{text}</button>;
};
