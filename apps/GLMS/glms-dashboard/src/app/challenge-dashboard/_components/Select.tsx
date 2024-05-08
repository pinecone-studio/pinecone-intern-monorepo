interface SelectButtonProps {
  options: string[];
  selectedOption: string;
  handleSelectChange: (_: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectButton: React.FC<SelectButtonProps> = ({ options, selectedOption, handleSelectChange }) => {
  return (
    <select className="h-9 w-full rounded-lg border-spacing-1 border-[#D6D8DB] bg-[#FEFEFE]" value={selectedOption} onChange={handleSelectChange} data-testid="select-button" data-cy="select-button">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
