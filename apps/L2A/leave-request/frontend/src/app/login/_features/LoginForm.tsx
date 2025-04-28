import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { EmailInput } from "../_components/EmailInput";
import { LoginButton } from "../_components/LoginButon";

const schema = z.object({
  email: z.string().email(),
});
type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg p-6 w-[16%] h-[30%] bg-white flex flex-col items-center"
      >
        <p className="text-xl mt-2 font-semibold">Нэвтрэх</p>
        <Image
          src="/images/PineconeStudio.png"
          alt="Pinecone Studio Logo"
          width={100}
          height={100}
          className="w-[28%] mt-8"
        />
        <EmailInput register={register} hasError={!!errors.email} />
        <LoginButton disabled={!isValid} />
      </form>
    </div>
  );
};
