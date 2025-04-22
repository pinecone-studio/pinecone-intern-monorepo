import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EmailInput } from "../_components/Input";
import { LoginButton } from "../_components/Buton";

const schema = z.object({
  email: z.string().email(),
});
type FormData = z.infer<typeof schema>;


export const Dialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = (data: FormData) => {
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg p-6 w-[16%] h-[30%] bg-white flex flex-col items-center"
      >
        <p className="text-xl mt-2 font-semibold">Нэвтрэх</p>
        <img src="./images/PineconeStudio.png" className="w-[28%] mt-8" />
        <EmailInput register={register} hasError={!!errors.email} />
        <LoginButton disabled={!isValid} />
      </form>
    </div>
  );
};