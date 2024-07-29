import { Field, FormikValues, useFormikContext } from 'formik';
import { ImageInput, ArticlesButton, CategoryInput } from '../../_components/add/';

export const RightSection = () => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const isFormValid = () => {
    return values.image && values.title && values.body;
  };

  return (
    <div className="bg-white flex flex-col justify-between flex-1 p-6 h-[93.5vh]">
      <div className='flex flex-col gap-8'>
        <CategoryInput name={'category'} placeholder={'Шошгонууд'} label={'Шошго'} />
        <Field name="image" component={ImageInput} setFieldValue={setFieldValue} />
      </div>
      <ArticlesButton
        able={!isFormValid()}
        addClass={`${isFormValid() ? 'bg-black text-white' : 'bg-gray-400 text-gray-700'} font-bold rounded-md text-center p-2 w-full text-lg`}
        text="Нийтлэх"
        typeText="submit"
        dataCy="submit-button"
      />
    </div>
  );
};
