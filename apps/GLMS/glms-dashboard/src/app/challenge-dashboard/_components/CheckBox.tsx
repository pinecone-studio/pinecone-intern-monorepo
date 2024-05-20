type CheckBoxType = {
  label: string;
  checked: boolean;
  onClick: () => void;
  className: string;
  isExist?: boolean;
};
export const CheckBox = ({ label, checked, onClick, className, isExist }: CheckBoxType) => {
  return (
    <div className={`${className} ${!isExist && 'hidden'}`}>
      <input type="checkbox" checked={checked} onChange={onClick} className="checkbox checkbox-md" />
      <span className="label-text my-1">{label}</span>
    </div>
  );
};
