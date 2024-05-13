import CheckBoxIconFalse from '../../../assets/icon/challenge/CheckBoxIconFalse';
import CheckBoxIconTrue from '../../../assets/icon/challenge/CheckBoxIconTrue';
interface IProps {
  id: string | null | undefined;
  choice: string | null | undefined;
  selectedChoice: string | undefined | null;
  handleChange: (_: string | undefined | null) => void;
}
const ChoiceText = ({ choice, selectedChoice, handleChange, id }: IProps) => {
  const isSelected = selectedChoice === id;
  return (
    <div
      data-testid="container"
      onClick={() => {
        handleChange(id);
      }}
      className={`flex max-w-[588px] cursor-pointer justify-center items-center border h-[72px] rounded-[12px] p-4 ${isSelected ? 'border-b-[4px] border-[#000000] ' : 'border-[#ECEDF0]'}}`}
    >
      <h1 className="font-semibold w-[508px] text-black">{choice}</h1>
      <div data-testid="checkbox">{selectedChoice === id ? <CheckBoxIconTrue /> : <CheckBoxIconFalse />}</div>
    </div>
  );
};

export default ChoiceText;
