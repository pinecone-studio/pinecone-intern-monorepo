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
      <select className="flex w-96 h-9 border-[#D6D8DB] border p-2 rounded-lg" value={selectedOption} onChange={onSelect}>
        {options.map((e, i) => {
          return <option key={i}>{e}</option>;
        })}
      </select>
    </>
  );
};
