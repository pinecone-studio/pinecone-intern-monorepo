import { Field, FormikValues, useFormikContext } from 'formik';
import { ImageInput, ArticlesButton } from '../../_components/add/';

export const RightSection = () => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const isFormValid = () => {
    return values.image && values.title && values.body;
  };

  return (
    <div className="bg-white flex flex-col justify-between flex-1 p-6 h-[93.5vh]">
      <Field name="image" component={ImageInput} setFieldValue={setFieldValue} />
      <div className="flex flex-col gap-4">
        <ArticlesButton
          able={!isFormValid()}
          addClass={`${isFormValid() ? 'bg-slate-500 hover:bg-black hover:text-white' : 'bg-gray-300 text-gray-700'} font-bold rounded-md text-center p-2 w-full text-lg`}
          text="Ноорогт хадгалах"
          typeText="draft-button"
          dataCy="draft-button"
        />
        <ArticlesButton
          able={!isFormValid()}
          addClass={`${isFormValid() ? 'bg-slate-500 hover:bg-black hover:text-white' : 'bg-gray-300 text-gray-700'} font-bold rounded-md text-center p-2 w-full text-lg`}
          text="Нийтлэх"
          typeText="submit"
          dataCy="submit-button"
        />
      </div>
    </div>
  );
};
