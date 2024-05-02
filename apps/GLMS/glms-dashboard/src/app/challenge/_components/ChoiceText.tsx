interface IProps {
  choice: { _id: string; choice: string };
  selectedChoice: string;
  handleChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
}
const ChoiceText = ({ choice, selectedChoice, handleChange }: IProps) => {
  const styles = {
    choiceStyle: 'flex w-[588px] justify-center items-center border border-[#ECEDF0] h-[72px] rounded-[12px] p-4',
    checkedChoiceStyle: 'flex w-[588px] items-center justify-center border border-[#000000] border-b-[4px] h-[72px] rounded-[12px] p-4 ',
  };
  return (
    <div className={`${selectedChoice === choice._id ? styles.checkedChoiceStyle : styles.choiceStyle}}`}>
      <h1 className="font-semibold w-[508px]">{choice.choice}</h1>
      <input type="radio" name="radio-10" className="radio checked:bg-[#000000]" checked={selectedChoice === choice._id} onChange={handleChange} value={choice._id} />
    </div>
  );
};

export default ChoiceText;
