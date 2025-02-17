'use client';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/AuthProvider';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signin } = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signin({
      email: data.email,
      password: data.password,
    });
  }
  return (
    <div className="flex h-screen justify-center items-center" data-testid="login-form-onSubmit-button">
      <div className="flex flex-col items-center gap-6 px-12 py-8  bg-[#09090B] border border-[#27272A] rounded-xl">
        <p className="text-white   text-[24px] font-thin">Нэвтрэх</p>
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-4">
            <Form {...form}>
              <form data-cy="signup-submit-button" onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FAFAFA]  font-thin">Имэйл хаяг:</FormLabel>
                      <FormControl>
                        <Input
                          data-cy="signin-email-input"
                          className="w-[350px] h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 border border-[#27272A] rounded-sm"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="w-[350px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FAFAFA]  font-thin">Нууц үг:</FormLabel>
                      <FormControl>
                        <Input
                          data-cy="signin-password-input"
                          className="w-[350px] h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 border border-[#27272A] rounded-sm"
                          placeholder="Нууц үг"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="w-[350px]" />
                    </FormItem>
                  )}
                />

                <Button data-cy="signin-button" data-testid="signup-button" className="w-[350px] h-[36px] hover:bg-blue-600 bg-[#00B7F4] text-black text-sm font-light rounded-sm" type="submit">
                  Нэвтрэх
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="text-muted-foreground font-thin text-[14px] mx-auto w-[350px] flex-col text-center ">
          Та бүртгэлтэй хаяггүй бол {}
          <Link href={'/signup'}>
            <button className="bg-transparent underline"> бүртгүүлэх </button>
          </Link>
          <p></p>хэсгээр орно уу.
        </div>
      </div>
    </div>
  );
};
export default Login;
