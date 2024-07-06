import React from 'react';
import { FieldProps, useField } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillInputProps extends FieldProps {
  label?: string;
  placeholder?: string;
}

export const QuillInput = ({ field, form, label, placeholder }: QuillInputProps) => {
  const [input, meta] = useField(field.name);

  return (
    <div className="flex flex-col gap-4">
      {label && <Label htmlFor={field.name} text={label} />}
      <ReactQuill
        id={field.name}
        value={input.value}
        onChange={(value) => form.setFieldValue(field.name, value)}
        placeholder={placeholder}
      />
      {meta.touched && meta.error && <ErrorMessage message={meta.error} />}
    </div>
  );
};

const Label = ({ htmlFor, text }: { htmlFor: string; text: string }) => (
  <label htmlFor={htmlFor} className="tracking-light text-lg font-semibold text-[#121316] leading-6">
    {text}
  </label>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-base mt-4 text-red-600">{message}</div>
);
