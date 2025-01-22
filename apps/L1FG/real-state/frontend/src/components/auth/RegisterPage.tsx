'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z
  .object({
    name: z.string().min(8, {
      message: 'Username must be at least 8 characters.',
    }),
    email: z.string().min(4, { message: 'email must be at least 2 characters' }),
    phone: z.string().min(8, { message: 'phone must be at 8 characters' }),
    password: z.string().min(8, { message: 'password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'password must be save' }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: ' should be match', path: ['comfirmPassword'] }
  );

type RegisterPageProps = {
  onSubmit: (_data: z.infer<typeof FormSchema>) => Promise<void>;
};

const RegisterPage = ({ onSubmit }: RegisterPageProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div data-cy="Register-Page" className="flex items-center justify-center h-screen w-screen">
      <div className="min-w-[500px] h-[600px] flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Name-Input" data-testid="Register-Page-Name-Input" placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage data-cy="Register-Page-Name-Error-Message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Email-Input" data-testid="Register-Page-Email-Input" placeholder="Please enter email" {...field} />
                  </FormControl>
                  <FormMessage data-cy="Register-Page-Email-Error-Message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Phone-Input" data-testid="Register-Page-Phone-Input" placeholder="Please enter a phonenumber" {...field} />
                  </FormControl>
                  <FormMessage data-cy="Register-Page-Phone-Error-Message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Password-Input" data-testid="Register-Page-Password-Input" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>Please enter a password. It will be your password</FormDescription>
                  <FormMessage data-cy="Register-Page-Password-Error-Message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Confirm-Password-Input" data-testid="Register-Page-Confirm-Password-Input" placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormDescription>Please enter same to password</FormDescription>
                  <FormMessage data-cy="Register-Page-Confirm-Password-Error-Message" />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center w-full justify-center gap-4">
              <Button data-cy="Register-Page-Submit-Button" data-testid="Register-Page-Submit-Button" className="bg-[#F97316] w-full flex justify-center" type="submit">
                Бүртгүүлэх
              </Button>
              <Button data-cy="Register-Page-To-Login-Page" className="border bg-ground text-black hover:bg-[#F97316] hover:text-white hover:border-[#F97316] w-full flex justify-center">
                <Link href={'/login'}>Нэвтрэх</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
