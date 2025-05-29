'use client';
import { useUpdateUserInfoMutation } from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UpdateUserInfoSchema } from '../../_utils/update-use-info-schema';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/app/_components/context/AuthContext';
import { Button } from '@/components/ui/button';

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
    return <div>Хэрэглэгч эхлээд нэвтрэх ёстой!</div>;
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
    <main className="flex-1 p-8" data-cy="user-profile">
      <h1 className="text-3xl font-bold mb-8" data-cy="profile-title">
        Захиалагчийн мэдээлэл
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)}>
          <div className="bg-[#1c1c1e] p-8 rounded-xl space-y-6 max-w-4xl" data-cy="profile-form">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имэйл хаяг:</FormLabel>
                  <FormControl>
                    <Input data-testid="user-email" type="text" {...field} />
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
                  <FormLabel>Утасны дугаар:</FormLabel>
                  <FormControl>
                    <Input data-testid="user-phone" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {data && <div>Мэдээлэл амжилттай өөрчлөгдлөө!</div>}
            <Button disabled={loading || !form.formState.isValid} type="submit" data-testid="save-profile">
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default UserProfile;
