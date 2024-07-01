import dynamic from 'next/dynamic';
import { useField, useFormikContext } from 'formik';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const QuillInput = ({ ...props }): JSX.Element => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <>
      <label htmlFor={props.name} className="font-semibold text-lg">
        {props.label}
      </label>
      <ReactQuill
        value={field.value || ''}
        id={props.name}
        onChange={(value) => setFieldValue(props.name, value)}
        placeholder={props.placeholder}
        className={`form-control ql-toolbar ql-editor ql-container rounded-lg py-[18px] border-none px-6 bg-white ${meta.touched && meta.error ? 'border-red-500' : ''}`}
        modules={modules}
      />
      {meta.touched && meta.error && <div className="text-xs mt-2 absolute text-red-600">{meta.error}</div>}
    </>
  );
};
