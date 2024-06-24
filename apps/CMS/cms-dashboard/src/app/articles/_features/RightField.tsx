import { useState } from 'react';
import { ImageInput } from '../_components';

interface FieldProps {
  type?: "submit" | "button" | "reset" | undefined;
}

export const RightField = ({ type }: FieldProps) => {
  const [file, setFile] = useState<File | null>(null);
  /* eslint-disable @typescript-eslint/no-unused-vars */
console.log(file);

  return (
    <div className="bg-white flex-1 p-6 h-[93.5vh]">
      <ImageInput setFile={setFile} />
      <button data-cy="submit-button" type={type} className="bg-black text-white">
        test button
      </button>
    </div>
  );
};
