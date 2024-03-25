type AssessmentButtonProps = {
  text: string;
};

export const AssessmentButton = (props: AssessmentButtonProps) => {
  const { text } = props;
  return <button>{text}</button>;
};
