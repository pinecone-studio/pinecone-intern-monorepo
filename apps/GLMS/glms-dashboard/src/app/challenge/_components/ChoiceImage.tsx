interface IProps {
  choice: { _id: string; choice: string };
  setSelectedChoice: React.Dispatch<React.SetStateAction<string>>;
  selectedChoice: string;
}

const ChoiceImage = ({ choice, setSelectedChoice, selectedChoice }: IProps) => {
  const styles = { choiceStyle: 'object-cover rounded-[8px]', clickedChoiceStyle: 'object-cover rounded-[8px] opacity-70' };
  return (
    <div>
      <img
        onClick={() => setSelectedChoice(choice._id)}
        src={choice.choice}
        width={588}
        height={483}
        alt="ChoiceImage"
        className={`${choice._id === selectedChoice ? styles.clickedChoiceStyle : styles.choiceStyle}`}
      />
    </div>
  );
};

export default ChoiceImage;
