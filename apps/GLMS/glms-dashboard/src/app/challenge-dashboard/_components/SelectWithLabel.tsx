type ISelectPropsType = {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (_: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectWithLabel = ({ label, options, selectedOption, onSelect }: ISelectPropsType) => {
  return (
    <>
      <p style={{ fontWeight: 600, fontSize: '14px', color: '#121316' }}>{label}</p>
      <select className="flex w-[384px] h-[36px] border-[#D6D8DB] border-[1px] p-[8px] rounded-[8px]" value={selectedOption} onChange={onSelect}>
        {options.map((e) => {
          return <option>{e}</option>;
        })}
      </select>
    </>
  );
};
