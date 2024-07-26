import { toolbarOptions } from '@/lib/toolbar-options';
import { FieldProps, useField, useFormikContext } from 'formik';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

interface QuillInputProps extends FieldProps {
  label?: string;
  placeholder?: string;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const QuillInput = ({ field, label, placeholder }: QuillInputProps) => {
  const { setFieldValue } = useFormikContext();
  const [input, meta] = useField(field.name);

  return (
    <div className="flex flex-col gap-4">
      {label && <Label htmlFor={field.name} text={label} />}
      <div className='input bg-white rounded-lg py-[18px] mt-3 px-6 focus:outline-offset-1 focus:outline-sky-500 focus:bg-white focus:placeholder-transparent w-full h-full'>
        <ReactQuill
          id={field.name}
          value={input.value}
          onChange={(value) => setFieldValue(field.name, value)}
          placeholder={placeholder}
          className="ql-editor ql-container ql-toolbar"
          modules={{ toolbar: toolbarOptions }}
        />
      </div>
      {meta.touched && meta.error && <ErrorMessage message={meta.error} />}
    </div>
  );
};

const Label = ({ htmlFor, text }: { htmlFor: string; text: string }) => (
  <label htmlFor={htmlFor} className="tracking-light text-lg font-semibold text-[#121316] leading-6">
    {text}
  </label>
);

const ErrorMessage = ({ message }: { message: string }) => <div className="text-base mt-1 text-red-600">{message}</div>;
