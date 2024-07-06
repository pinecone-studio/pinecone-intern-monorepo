import { Field, useFormikContext } from 'formik';
import { ImageInput } from '../_components';

type FieldProps = {
  text?: "submit" | "button" | "reset" | undefined;
};

export const RightSection = ({ text }: FieldProps) => {
  const { setFieldValue } = useFormikContext();

  return (
    <div className="bg-white flex-1 p-6 h-[93.5vh]">
      <Field
        name="image"
        component={ImageInput}
        setFieldValue={setFieldValue}
      />
      <button data-cy="submit-button" type={text} className="bg-black text-white">
        test button
      </button>
    </div>
  );
};
