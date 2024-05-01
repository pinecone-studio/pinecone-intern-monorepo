interface SelectButtonProps {
  options: string[];
  selectedOption: string;
  handleSelectChange: (_: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectButton: React.FC<SelectButtonProps> = ({ options, selectedOption, handleSelectChange }) => {
  return (
    <select
      className="h-[36px] w-full rounded-[8px] border-[1px] border-[#D6D8DB] bg-[#FEFEFE]"
      value={selectedOption}
      onChange={handleSelectChange}
      data-testid="select-button"
      data-cy="select-button"
    >
      {options.map((option, index) => (
        <option key={index} value={option} data-testid="select-option">
          {option}
        </option>
      ))}
    </select>
  );
};
