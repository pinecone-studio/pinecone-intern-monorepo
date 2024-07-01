import { Field, useField } from 'formik';

export const InputField = ({ ...props }): JSX.Element => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <label htmlFor={props.name} className="font-semibold text-lg">
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
        className={`input rounded-lg py-[18px] mt-3 px-6 focus:outline-none focus:border-blue-500 focus:bg-white focus:placeholder-transparent w-full h-full ${props.addClass}`}
      />
      {meta.touched && meta.error && <div className="text-xs mt-2 absolute text-red-600">{meta.error}</div>}
    </>
  );
};
