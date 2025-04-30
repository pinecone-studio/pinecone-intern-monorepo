import { FiEdit2 } from "react-icons/fi";
interface InfoEditorProps {
  label: string;
  value: string;
  withBorder?: boolean;
  onEditClick?: () => void;
}

export const InfoEditor = ({ label, value, withBorder = false, onEditClick }: InfoEditorProps) => {
  return (
    <div className="w-full mt-5">
      <p className="text-[#8B8E95]">{label}</p>
      <div className="flex justify-between">
        <p className="text-xl text-[#09090B]">{value}</p>
        <FiEdit2 className="text-lg cursor-pointer" onClick={onEditClick} data-testid="edit-icon"/>
      </div>
      {withBorder&&<div className="border-b-[1px] border-[#E4E4E7] w-full h-8" data-testid="info-editor-border"></div>}
    </div>
  );
};