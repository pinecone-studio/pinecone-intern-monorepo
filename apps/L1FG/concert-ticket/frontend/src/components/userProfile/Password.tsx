'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNewPasswordMutation } from '@/generated';
import { useAlert } from '../providers/AlertProvider';
const FormSchema = z.object({
  oldPassword: z.string().min(6, {
    message: 'Хуучин нууц үгээ хийнэ үү',
  }),
  newPassword: z.string().min(6, {
    message: 'Шинэ нууц үг дөрвөөс дээш тэмдэгт байх ёстой.',
  }),
  repeatPassword: z.string().min(6, {
    message: 'Шинэ нууц үгээ давтан хийнэ үү',
  }),
});

export const UserPassword = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
  });
  const [newPassword] = useNewPasswordMutation({
    onCompleted: () => {
      showAlert('success', 'Нууц үг амжилттай шинэчлэгдлээ');
    },
    onError: (error) => {
      showAlert('error', `${error.message}`);
    },
  });

  const { showAlert } = useAlert();

  const userId = localStorage.getItem('user');

  if (!userId) return;

  const parsedUser = JSON.parse(userId);

  const userID = parsedUser?._id;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.newPassword !== data.repeatPassword) return showAlert('warning', 'Шинэ нууц үгийг давтан хийнэ үү');
    await newPassword({
      variables: {
        input: { newPassword: data.newPassword, oldPassword: data.oldPassword, userId: userID },
      },
    });
  }

  return (
    <div className="bg-[#131313] rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} data-testid="check-button" className="w-2/3 space-y-6 p-8">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-thin text-base">Хуучин нууц үг:</FormLabel>
                <FormControl>
                  <Input data-testid="old-password" className="bg-black w-[777px] text-white" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-thin text-base ">Шинэ нууц үг:</FormLabel>
                <FormControl>
                  <Input data-testid="new-password" className="bg-black w-[777px] text-white" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-thin text-base">Шинэ нууц үг давтах:</FormLabel>
                <FormControl>
                  <Input data-testid="repeat-password" className="bg-black w-[777px] text-white" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-end w-[777px] ">
            <Button data-testid="save-button" className="bg-[#00B7F4] text-black px-4 py-2" type="submit">
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
