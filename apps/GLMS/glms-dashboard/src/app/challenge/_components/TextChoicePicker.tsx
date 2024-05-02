interface IProps {
  choice: { _id: string; choice: string };
  selectedChoice: string;
  handleChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
}
const ChoiceText = ({ choice, selectedChoice, handleChange }: IProps) => {
  const isSelected = selectedChoice === choice._id;
  return (
    <div className={`flex w-[588px] justify-center items-center border h-[72px] rounded-[12px] p-4 ${isSelected ? 'border-b-[4px] border-[#000000] ' : 'border-[#ECEDF0]'}}`}>
      <h1 className="font-semibold w-[508px]">{choice.choice}</h1>
      <input type="radio" name="radio-10" className="radio checked:bg-[#000000]" checked={selectedChoice === choice._id} onChange={handleChange} value={choice._id} />
    </div>
  );
};

export default ChoiceText;
