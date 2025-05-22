
interface CreatePostButtonProps {
    onSubmit: () => void;
  }
  
  export const CreatePostButton: React.FC<CreatePostButtonProps> = ({ onSubmit }) => {
  return (
    <div>
      <button onClick={onSubmit} type="button" className="bg-[#F97316] text-[#FAFAFA] p-2 rounded-lg">
        Зар оруулах хүсэлт илгээх
      </button>
    </div>
  );
};