'use client';

import { useUpdateUserInfoMutation } from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/app/_components/context/AuthContext';
import { Button } from '@/components/ui/button';
import { UpdateUserInfoSchema } from '../_utils/update-use-info-schema';

const UserProfile = () => {
  const { user } = useAuth();
  const [updateUserInfo, { data, loading }] = useUpdateUserInfoMutation();

  const form = useForm<z.infer<typeof UpdateUserInfoSchema>>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: {
      email: user?.email,
      phone: String(user?.phone),
    },
  });

  if (!user) {
    return <div className="p-6 text-white text-center">Хэрэглэгч эхлээд нэвтрэх ёстой!</div>;
  }

  const handleSave = async (value: z.infer<typeof UpdateUserInfoSchema>) => {
    try {
      await updateUserInfo({
        variables: {
          id: user?.id,
          ...value,
          phone: Number(value.phone),
        },
      });
    } catch (err) {
      console.error('Хадгалах үед алдаа гарлаа:', err);
    }
  };

  return (
    <main className="flex-1 px-4 py-10 md:px-8 lg:px-16 text-white" data-cy="user-profile">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center" data-cy="profile-title">
          Захиалагчийн мэдээлэл
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} noValidate>
            <div className="bg-[#1c1c1e] p-8 md:p-10 rounded-xl space-y-6 shadow-lg" data-cy="profile-form">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">Имэйл хаяг</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="bg-white text-black rounded-md" data-testid="user-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">Утасны дугаар</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" className="bg-white text-black rounded-md" data-testid="user-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {data && <p className="text-green-400 text-sm">Мэдээлэл амжилттай өөрчлөгдлөө!</p>}
              <Button disabled={loading || !form.formState.isValid} type="submit" data-testid="save-profile" className="w-full md:w-auto">
                Хадгалах
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default UserProfile;
