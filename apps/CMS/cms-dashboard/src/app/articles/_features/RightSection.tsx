import { useState } from 'react';
import { ImageInput } from '../_components';
import { ArticlesButton } from '../_components';
import { useFormikContext } from 'formik';

type FieldProps = {
  typeText?: 'submit' | 'button' | 'reset' | undefined;
};

export const RightSection = ({ typeText }: FieldProps) => {
  const [file, setFile] = useState<File | null>(null);
  console.log(file);

  const { values, touched } = useFormikContext<{ title: string; body: string }>();
  const isDisabled = (!touched.title && !touched.body) || values.title === '' || values.body === '';

  return (
    <div className="bg-white flex-1 p-6 h-[93.5vh] flex flex-col justify-between">
      <div>
        <ImageInput setFile={setFile} />
      </div>
      <div className="flex flex-col gap-4">
        <ArticlesButton able={isDisabled} addClass="bg-slate-200 text-black font-bold hover:text-white" text="Ноорогт хадгалах" data-cy="save-draft-button" />
        <ArticlesButton able={isDisabled} addClass="bg-slate-400 text-black font-bold hover:text-white" text="Нийтлэх" typeText={typeText} data-cy="publish-button" />
      </div>
    </div>
  );
};
