import { PiEyeClosed } from 'react-icons/pi';
import { MdDeleteOutline, MdReply } from 'react-icons/md';

interface IButtonProps {
  label: string;
  disabled?: boolean;
  btnType?: "default" | "ghost" | "primary";
  onClick?: () => void;
  icon?: typeof PiEyeClosed | typeof MdDeleteOutline | typeof MdReply; 
}

const Button = ({ label, disabled, btnType, onClick, icon }: IButtonProps) => {
  const IconComponent = icon; 

  return (
    <button
      onClick={onClick}
      className={`btn btn-${btnType} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {IconComponent && <IconComponent />}
      {label}
    </button>
  );
};

export default Button;



