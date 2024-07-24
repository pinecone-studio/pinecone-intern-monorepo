import { InputField, QuillInput } from '../../_components/add';
import { Field } from 'formik';
export const LeftSection = () => {
  return (
    <div className="w-4/5 h-[93.5vh] flex justify-center items-center m-auto">
      <div className="w-4/5">
        <InputField type="text" data-cy="title-input" label={'Гарчиг өгөх'} name={'title'} placeholder={'Энд гарчгаа бичнэ үү...'} />
        <div className="mt-12 flex flex-col gap-4">
          <Field name="body" component={QuillInput} label="Нийтлэлээ бичих" placeholder="Бичиж эхэлнэ үү..." data-cy="title-body" />{' '}
        </div>
      </div>
    </div>
  );
};
