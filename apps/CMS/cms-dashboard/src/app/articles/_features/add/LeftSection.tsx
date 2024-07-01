'use client'
import { InputField } from '../_components';
import dynamic from 'next/dynamic';
import { useField, useFormikContext } from 'formik';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TextField = () => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField('body');

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="w-4/5 h-[93.5vh] flex justify-center items-center m-auto">
      <div className="w-4/5">
        <InputField type="text" data-cy="title-input" label={'Гарчиг өгөх'} name={'title'} placeholder={'Энд гарчгаа бичнэ үү...'} />
        <div className='mt-12 flex flex-col gap-4'>
        <label htmlFor='body' className="font-semibold text-lg">Нийтлэлээ бичих</label>
        <ReactQuill
        value={field.value || ''}
        id={'body'}
        data-cy="title-body"
        onChange={(value) => setFieldValue('body', value)}
        placeholder="Бичиж эхлэх..."
        className={`form-control ql-toolbar ql-editor ql-container rounded-lg py-[18px] border-none px-6 bg-white ${meta.touched && meta.error ? 'border-red-500' : ''}`}
        modules={modules}
      />
        {meta.touched && meta.error ? <div className="text-red-500 text-sm">{meta.error}</div> : null}
        </div>
      </div>
    </div>
  );
};
