type Props = {
    onSaveDraft: () => void;
  };
  
  export const CreatePostSaved = ({ onSaveDraft }: Props) => {
    return (
      <div className="w-full h-[636.5px] flex flex-col gap-4 rounded-lg">
        <button type="button" onClick={onSaveDraft} className="bg-[#FFFFFF] text-[#18181B] p-2 rounded-lg">
          Хадгалаад гарах
        </button>
      </div>
    );
  };