import { ImageInput } from '../_components';
import { Field } from 'formik';

type FieldProps  = {
  text?: "submit" | "button" | "reset" | undefined;
  setFile: (_file: File | null) => void; 
}

export const RightSection = ({ text, setFile }: FieldProps) => {

  return (
    <div className="bg-white flex-1 p-6 h-[93.5vh]">
      {/* <ImageInput setFile={setFile} /> */}
      <Field
            name="image"
            label="Өнгөц зураг"
            component={ImageInput}
            setFieldValue={setFieldValue}
          />
      <button data-cy="submit-button" type={text} className="bg-black text-white">
        test button
      </button>
    </div>
  );
};
