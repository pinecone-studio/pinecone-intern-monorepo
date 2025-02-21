'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPassword } from '../../../components/userProfile/Password';
import { OrderHistory } from './OrderHisto';
import { useOrderUpdateMutation } from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAlert } from '../../../components/providers/AlertProvider';

const FormSchema = z.object({
  phoneNumber: z.string().min(8, {
    message: 'Утасны дугаар оруулна уу',
  }),
  email: z.string().email({
    message: 'Имэйл хаяг оруулна уу',
  }),
});
export const Modal = ({ orderData }: { orderData: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: '',
      email: '',
    },
  });
  const { showAlert } = useAlert();
  const [orderUpdate] = useOrderUpdateMutation({
    onCompleted: () => {
      showAlert('success', 'Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ');
    },
    onError: (error) => {
      showAlert('error', `${error}`);
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const user = localStorage.getItem('user');

    if (!user) return;

    const parsedUser = JSON.parse(user);

    const userID = parsedUser?._id;

    await orderUpdate({
      variables: {
        input: {
          newEmail: data.email,
          newPhoneNumber: data.phoneNumber,
          userId: userID,
        },
      },
    });
  }
  return (
    <div className="flex flex-col gap-6 ">
      {orderData === 'order' && (
        <Form {...form}>
          <form data-test-id="modal-form-submit" onSubmit={form.handleSubmit(onSubmit)} className="bg-[#131313] p-8 flex flex-col gap-6 rounded-lg">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white w-[777px] font-thin text-base mb-2"> Утасны дугаар:</FormLabel>
                  <FormControl>
                    <Input data-cy="order-phone-input" data-testid="order-page-phone" className="bg-[#09090B]  w-[750px] border-stone-600 text-white" placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-white font-thin text-base mb-2"> Имэйл хаяг:</FormLabel>
                  <FormControl>
                    <Input data-cy="order-email-input" data-testid="order-page-email" className="w-[750px] bg-[#09090B] border-stone-600  text-white" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end">
              <Button data-cy="order-save-input" data-testid="update-order-save-button" className="w-fit bg-[#00B7F4] text-black" type="submit">
                Хадгалах
              </Button>
            </div>
          </form>
        </Form>
      )}
      <div>
        {orderData === 'data' && <OrderHistory></OrderHistory>}
        {orderData === 'pass' && <UserPassword></UserPassword>}
      </div>
    </div>
  );
};
