interface IProps {
  choice: string | undefined | null;
  id: string | null | undefined;
  setSelectedChoice: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  selectedChoice: string | null | undefined;
}

const ChoiceImage = ({ choice, setSelectedChoice, selectedChoice, id }: IProps) => {
  const isSelected = selectedChoice === id;
  return (
    <div className="flex w-[588px] h-[483px]">
      <img onClick={() => setSelectedChoice(id)} src={choice!} width={588} height={483} alt="ChoiceImage" className={`object-cover rounded-[8px] ${isSelected && 'opacity-70'}`} />
    </div>
  );
};

export default ChoiceImage;
