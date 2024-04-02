type ArticlesButtonProps = {
  text: string;
};

export const ArticlesButton = (props: ArticlesButtonProps) => {
  const { text } = props;
  return <button>{text}</button>;
};
