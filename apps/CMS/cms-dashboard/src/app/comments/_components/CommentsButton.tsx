type CommentsButtonProps = {
  text: string;
};

export const CommentsButton = (props: CommentsButtonProps) => {
  const { text } = props;
  return <button>{text}</button>;
};
