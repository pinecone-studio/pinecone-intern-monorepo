type CommentsButtonProps = {
  text: string;
};

export const CommentsButton: React.FC<CommentsButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
