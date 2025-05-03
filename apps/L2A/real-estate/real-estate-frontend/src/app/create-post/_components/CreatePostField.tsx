import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  trigger?: (_name?: Path<T>) => Promise<boolean> | undefined;
  name: Path<T>;
};

export const CreatePostField = <T extends FieldValues>({ register, error, name: _name, trigger }: Props<T>) => {
  return (
    <div>
      <label htmlFor={_name} className="block text-sm text-[#09090B] pb-2">
        Талбай
      </label>
      <input
        id={_name}
        {...register(_name, { required: 'Талбайн утгыг заавал оруулна уу' })}
        onBlur={trigger ? () => trigger(_name) : undefined}
        name={_name}
        type="number"
        placeholder="Талбай (м2)"
        data-testid="field"
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-1'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
