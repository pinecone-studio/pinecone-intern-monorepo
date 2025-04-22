import { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<{ email: string }>;
  hasError?: boolean;
};

export const EmailInput = ({ register, hasError }: Props) => {
  return (
    <div className="flex flex-col mt-6 w-full">
      <label htmlFor="email" className="text-sm mb-[3px]">
        Имэйл хаяг
      </label>
      <input
        id="email"
        {...register('email')}
        type="email"
        className={`h-[5%] py-4 px-2 border ${
          hasError ? 'border-red-500' : 'border-gray-300'
        } rounded-md text-sm`}
      />
    </div>
  );
};