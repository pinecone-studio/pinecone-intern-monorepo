interface IProps {
  choice: { _id: string; choice: string };
  setSelectedChoice: React.Dispatch<React.SetStateAction<string>>;
  selectedChoice: string;
}

const ChoiceImage = ({ choice, setSelectedChoice, selectedChoice }: IProps) => {
  const isSelected = selectedChoice === choice._id;
  return (
    <div>
      <img onClick={() => setSelectedChoice(choice._id)} src={choice.choice} width={588} height={483} alt="ChoiceImage" className={`object-cover rounded-[8px] ${isSelected && 'opacity-70'}`} />
    </div>
  );
};

export default ChoiceImage;
