import { useState } from 'react';
import { ImageInput } from '../_components';

type FieldProps  = {
  text?: "submit" | "button" | "reset" | undefined;
}

export const RightField = ({ text }: FieldProps) => {
  const [file, setFile] = useState<File | null>(null);
console.log(file);

  return (
    <div className="bg-white flex-1 p-6 h-[93.5vh]">
      <ImageInput setFile={setFile} />
      <button data-cy="submit-button" type={text} className="bg-black text-white">
        test button
      </button>
    </div>
  );
};
