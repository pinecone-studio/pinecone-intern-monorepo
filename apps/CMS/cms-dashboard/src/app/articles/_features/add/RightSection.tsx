import { useState } from 'react';
import { ImageInput, CategoryInput } from '../../_components/add/';
import { ArticlesButton } from '../../_components/add/ArticlesButton';
import { useFormikContext } from 'formik';

type FieldProps = {
  typeText?: 'submit' | 'button' | 'reset';
};

export const RightSection = ({ typeText }: FieldProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { values, touched } = useFormikContext<{ title: string; body: string }>();
  const isDisabled = !touched.title || !touched.body || values.title === '' || values.body === '';
  const buttonClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div className="bg-white flex-1 p-6 h-[93.5vh] flex flex-col justify-between">
      <CategoryInput label="Шошгонууд" name="category" placeholder="Шошго" />
      <ImageInput setFile={setFile} />
      <div className="flex flex-col gap-4">
        <ArticlesButton
          able={isDisabled}
          addClass={`bg-slate-300 text-black font-bold hover:text-white rounded-sm p-2 ${buttonClasses} `}
          text="Ноорогт хадгалах"
          typeText={typeText}
          dataCy="publish-button"
        />
        <ArticlesButton
          able={isDisabled}
          addClass={`bg-slate-400 text-black font-bold hover:text-white rounded-sm p-2 ${buttonClasses} `}
          text="Нийтлэх"
          typeText={typeText}
          dataCy="save-draft-button"
        />
      </div>
    </div>
  );
};
