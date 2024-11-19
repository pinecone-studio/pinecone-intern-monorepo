import { PlusIcon } from 'lucide-react';

export const AddImage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 self-stretch border-[1px] border-[#E4E4E7] rounded-md h-[160px]">
      <div className="flex flex-col items-center cursor-pointer">
        <PlusIcon color="#2563EB" size={20} className="duration-500 hover:scale-150" />
        <p className="text-sm text-muted-foreground">Зураг оруулах</p>
      </div>
    </div>
  );
};
