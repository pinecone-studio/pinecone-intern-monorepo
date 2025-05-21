import { ChangeEvent } from "react";
import { Plus } from "lucide-react";

type ImageUploadProps = {
  handleImageUpload: (_e: ChangeEvent<HTMLInputElement>) => void;
};

export const ImageUpload = ({ handleImageUpload }: ImageUploadProps) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="image-upload"
        className="flex w-full cursor-pointer items-center justify-center rounded-full border border-[#E11D48] py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Plus data-testid="plus-icon" className="mr-2 h-4 w-4" />
        Upload image
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
};
