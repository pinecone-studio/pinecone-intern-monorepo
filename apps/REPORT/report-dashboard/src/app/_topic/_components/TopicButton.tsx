type TopicButtonProps = {
  text: string;
};

export const TopicButton = (props: TopicButtonProps) => {
  const { text } = props;
  return <button>{text}</button>;
};
