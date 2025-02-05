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
      message: 'Хэрэглэгчийн нэр 8-с дээш байх шаардлагатай.',
    }),
    email: z.string().min(8, { message: 'Э-майл 8-с дээш байх шаардлагатай жүү' }),
    phone: z.string().min(8, { message: 'Утасны дугаар 8 оронтой байх шаардлагатай жүү' }),
    password: z.string().min(8, { message: 'Нууц үг 8-аас дээш байх шаардлагатай жүү' }),
    confirmPassword: z.string().min(8, { message: 'Баталгаажуулах нууц нь 8-аас дээш байх шаардлагатай жүү' }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: 'Баталгаажуулах нууц үг нь нууц үгтэй таарах ёстой жүү', path: ['comfirmPassword'] }
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
                  <FormLabel>Хэрэглэгчийн нэр</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Name-Input" data-testid="Register-Page-Name-Input" placeholder="Хэрэглэгчийн нэрээ оруулаарай" {...field} />
                  </FormControl>
                  <FormDescription>Таны энэ хэрэглэгчийн нэр шүү бусдаас содон нэр сонгоорой хөөрхөнөө.</FormDescription>
                  <FormMessage data-cy="Register-Page-Name-Error-Message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Э-мэйл</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Email-Input" data-testid="Register-Page-Email-Input" placeholder="Өөрийнхөө э-мэйлийг оруулаарай" {...field} />
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
                  <FormLabel>Утасны дугаар</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Phone-Input" data-testid="Register-Page-Phone-Input" placeholder="Өөрийнхөө утасны дугаарыг оруулаарай" {...field} />
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
                  <FormLabel>Нууц үг</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Password-Input" data-testid="Register-Page-Password-Input" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>Мартахгүй 8 оронтой тоо оруулаарай нууц үг чинь болно шүү</FormDescription>
                  <FormMessage data-cy="Register-Page-Password-Error-Message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Баталгаажуулах нууц үг</FormLabel>
                  <FormControl>
                    <Input data-cy="Register-Page-Confirm-Password-Input" data-testid="Register-Page-Confirm-Password-Input" placeholder="Нууц үгээ давтаад л хийчхээ хө" {...field} />
                  </FormControl>
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
