type LeavingButtonProps = {
  text: string;
};

export const LeavingButton: React.FC<LeavingButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
