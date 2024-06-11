type ArticlesButtonProps = {
  text: string;
};

export const ArticlesButton: React.FC<ArticlesButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
