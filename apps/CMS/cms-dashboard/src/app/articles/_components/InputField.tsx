import { Field, useField } from 'formik';

export const InputField = ({ ...props }): JSX.Element => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <label htmlFor={props.name} className="font-semibold text-lg pt-28 pb-12">
        {props.label}
      </label>
      <Field
        id={props.name}
        type={props.type}
        {...field}
        placeholder={props.placeholder}
        as={props.as}
        rows={props.rows}
        key={props.key}
        className={`input rounded-lg pl-5 pb-3 focus:outline-none transition-colors duration ease-in-out focus:border-blue-500 focus:bg-white focus:placeholder-transparent w-full ${props.addClass}`}
      />
      {meta.touched && meta.error && <div className="text-xs text-red-600">{meta.error}</div>}
    </>
  );
};
