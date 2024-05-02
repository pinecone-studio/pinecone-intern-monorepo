interface SelectButtonProps {
  options: string[];
  selectedOption: string;
  handleSelectChange: (_: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectButton: React.FC<SelectButtonProps> = ({ options, selectedOption, handleSelectChange }) => {
  return (
    <select
      value={selectedOption}
      onChange={handleSelectChange}
      data-cy="select-button"
      data-testid="select-button"
      style={{ height: '36px', width: '100%', borderRadius: '8px', border: '1px solid #D6D8DB', background: '#FEFEFE' }}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
