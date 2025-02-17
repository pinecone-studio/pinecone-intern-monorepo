'use client';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TicketSubscriberBuysection from '../../../components/ticketConfirm/TicketBuySection';
import { OrderProps } from '@/app/ticketReservation/[ticketID]/page';

const FormSchema = z.object({
  phoneNumber: z.string().min(8, {
    message: 'Утасны дугаар оруулна уу',
  }),
  email: z.string().email({
    message: 'Имэйл хаяг оруулна уу',
  }),
});
type SubBuyProps = {
  handleNext: () => void;
  value: OrderProps;
  ticketID: string;
  handleChange: (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const TicketSubscriber = ({ handleChange, handleNext, value, ticketID }: SubBuyProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: '',
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleChange({ target: { name: 'phoneNumber', value: data.phoneNumber } } as unknown as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'email', value: data.email } } as unknown as React.ChangeEvent<HTMLInputElement>);
    handleNext();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between">
          <div className="  bg-[#131313] rounded-xl  flex flex-col p-8 mx-0 gap-6 items-center">
            {' '}
            <div className="text-white font-light text-xl">Захиалагчийн мэдээлэл</div>{' '}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white  font-thin text-base mb-2"> Утасны дугаар:</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="reservation-phone-input"
                      className="bg-black text-[13px] texted-[#A1A1AA] pl-[10px] border-[#27272A] text-white  w-[564px] h-[36px] my-[10px] border rounded-md"
                      placeholder={`${!value.phoneNumber ? 'phone number' : value.phoneNumber} `}
                      {...field}
                    />
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
                    <Input
                      data-cy="reservation-email-input"
                      className="bg-black text-[13px] texted-[#A1A1AA] pl-[10px] border-[#27272A] text-white  w-[564px] h-[36px] my-[10px] border rounded-md"
                      placeholder={`${!value.email ? 'Email' : value.email} `}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
          </div>
          <button type="submit">
            <TicketSubscriberBuysection ticketID={ticketID} value={value} />
          </button>{' '}
        </div>
      </form>
    </Form>
  );
};
export default TicketSubscriber;
