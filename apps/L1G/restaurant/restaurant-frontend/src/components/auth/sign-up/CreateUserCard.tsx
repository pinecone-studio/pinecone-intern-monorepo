'use client';
import { z } from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LoginButton } from './LoginButton';
import { useCreateUserMutation } from '@/generated';
import { formSchemaUser, initialValuesUser } from '@/helpers/form-schemas';

export const CreateUserCard = () => {
  const router = useRouter();
  const [register] = useCreateUserMutation();
  const handleSubmit = async (values: z.infer<typeof formSchemaUser>) => {
    try {
      await register({
        variables: {
          input: {
            username: values.username,
            email: values.email,
            password: values.password,
          },
        },
      });
      router.push('/sign-in');
    } catch (error) {
      form.setError('email', {
        type: 'manual',
        message: 'Имэйл хаяг бүртгэлтэй байна.',
      });
    }
  };

  const form = useForm<z.infer<typeof formSchemaUser>>({
    resolver: zodResolver(formSchemaUser),
    defaultValues: initialValuesUser,
  });

  return (
    <div data-cy="create-user" className="flex flex-col w-screen h-screen px-2 py-4 justify-center items-center">
      <Card className="flex flex-col border-none outline-none shadow-none rounded-lg w-[327px] gap-[32px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-[32px] text-[#441500] self-center">Бүртгүүлэх</CardTitle>
            </CardHeader>
            <div className="gap-2">
              <CardContent className="p-1">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-cy="createUser-username"
                          data-testid="createUser-username-input"
                          type="text"
                          className=" w-full h-[36px] py-1 px-3 border solid border-[#E4E4E7] bg-[#FFFFFF] rounded-md text-sm leading-[20px] text-[#71717A]"
                          placeholder="Хэрэглэгчийн нэр"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-cy="createUser-username-error" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent className="p-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-cy="createUser-email"
                          data-testid="createUser-email-input"
                          type="email"
                          className=" w-full h-[36px] py-1 px-3 border solid border-[#E4E4E7] bg-[#FFFFFF] rounded-md text-sm leading-[20px] text-[#71717A]"
                          placeholder="Имэйл хаяг"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-cy="createUser-email-error" data-testid="createUser-email-error" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent className="p-1">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-cy="createUser-password"
                          data-testid="createUser-password-input"
                          type="password"
                          className=" w-full h-[36px] py-1 px-3 border solid border-[#E4E4E7] bg-[#FFFFFF] rounded-md text-sm leading-[20px] text-[#71717A]"
                          placeholder="Нууц үг"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-cy="createUser-password-error" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent className="p-1">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-cy="createUser-confirmPassword"
                          data-testid="createUser-confirmPassword-input"
                          type="password"
                          className=" w-full h-[36px] py-1 px-3 border solid border-[#E4E4E7] bg-[#FFFFFF] rounded-md text-sm leading-[20px] text-[#71717A]"
                          placeholder="Нууц үг давтах"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-cy="createUser-confirmPassword-error" />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="p-1">
                <Button data-cy="createUser-submit-btn" data-testid="createUser-submit-btn" type="submit" className="flex px-4 py-2 w-full h-[36px] rounded-md bg-[#441500] ">
                  Бүртгүүлэх
                </Button>
              </CardFooter>
            </div>
          </form>
        </Form>
        <div className="flex gap-[10px] w-full items-center">
          <div className="w-full h-[1px] bg-[#E4E4E7]" />
          <h1 className="text-[12px] text-[#71717A] font-normal">Эсвэл</h1>
          <div className="w-full h-[1px] bg-[#E4E4E7]" />
        </div>
        <LoginButton />
      </Card>
    </div>
  );
};
