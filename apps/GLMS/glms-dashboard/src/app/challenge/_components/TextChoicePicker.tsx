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
      className={`flex w-[588px] justify-center items-center border h-[72px] rounded-[12px] p-4 ${isSelected ? 'border-b-[4px] border-[#000000] ' : 'border-[#ECEDF0]'}}`}
    >
      <h1 className="font-semibold w-[508px] text-black">{choice}</h1>
      <div data-testid="checkbox">
        {selectedChoice === id ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#000000" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#1C2024" fill-opacity="0.24" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ChoiceText;
