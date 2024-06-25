import { InputField } from '../_components';
import dynamic from 'next/dynamic';
import { useField, useFormikContext } from 'formik';
import 'react-quill/dist/quill.snow.css';

export const TextField = () => {
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField('body');

  return (
    <div className="w-4/5 h-[93.5vh] flex justify-center items-center m-auto">
      <div className="w-4/5">
        <InputField type="text" data-cy="title-input" label={'Гарчиг өгөх'} name={'title'} placeholder={'Энд гарчгаа бичнэ үү...'} addClass="mb-12" />
        <label className="font-semibold text-lg">Нийтлэлээ бичих</label>
        <ReactQuill
          value={field.value}
          onChange={(value) => setFieldValue('body', value)}
          placeholder="Бичиж эхлэх..."
          className={`form-control bg-white ${meta.touched && meta.error ? 'border-red-500' : ''}`}
        />
        {meta.touched && meta.error ? <div className="text-red-500 text-sm">{meta.error}</div> : null}
      </div>
    </div>
  );
};
