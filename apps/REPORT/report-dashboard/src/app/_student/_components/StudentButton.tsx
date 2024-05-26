type StudentButtonProps = {
  text: string;
};

export const StudentButton: React.FC<StudentButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
