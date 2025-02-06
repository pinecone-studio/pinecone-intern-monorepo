import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().min(8, {
    message: 'Хэрэглэгчийн нэр 8-с дээш байх шаардлагатай.',
  }),
  password: z.string().min(8, {
    message: 'Нууц үг 8-аас дээш байх шаардлагатай ',
  }),
});
type LoginPageProps = {
  onSubmit: (_values: z.infer<typeof FormSchema>) => void;
};

const LoginPage = ({ onSubmit }: LoginPageProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <div data-cy="Login-Page" className="flex flex-col justify-center items-center">
      <div className="min-w-[448px] flex flex-col items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Е-Мэйл</FormLabel>
                  <FormControl>
                    <Input data-cy="Login-Page-Email-Input" data-testid="Login-Page-Email-Input" placeholder="Е-Mэйл" {...field} />
                  </FormControl>
                  <FormMessage data-cy="Login-Email-Input-Error-Message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Нууц үг</FormLabel>
                    <Link data-cy="Login-Page-To-Forget-Password-Button" href={'/forget-password'}>
                      Нууц үг сэргээх
                    </Link>
                  </div>

                  <FormControl>
                    <Input data-cy="Login-Page-Password-Input" data-testid="Login-Page-Password-Input" placeholder="Нууц үгээ оруулна уу ?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button data-testid="Login-Page-Submit-Button" data-cy="Login-Page-Submit-Button" className="bg-[#F97316] w-full text-center flex justify-center" type="submit">
              Нэвтрэх
            </Button>
            <Button data-cy="Login-Page-To-Register-Button" className="border shadow-lg w-full text-center flex justify-center">
              <Link href={'/register'}>Бүртгүүлэх</Link>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
