import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { AddTicketSchema } from '../utils/add-ticket-schema';

const AddTicketSeatInput = ({ form }: { form: UseFormReturn<z.infer<typeof AddTicketSchema>> }) => {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex justify-evenly gap-4">
        <FormField
          name="AvialableTicketCountBackSeat"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Арын суудлын тоо*</FormLabel>
              <FormControl>
                <Input data-testid="back-seat-count" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="ticketCountVip"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>VIP суудлын тоо*</FormLabel>
              <FormControl>
                <Input data-testid="vip-seat-count" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="AvialableTicketCountStandard"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Энгийн суудлын тоо*</FormLabel>
              <FormControl>
                <Input data-testid="standard-seat-count" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className=" flex justify-evenly gap-4">
        <FormField
          name="BackSeatTicketPrice"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Арын суудлын үнэ*</FormLabel>
              <FormControl>
                <Input data-testid="back-seat-price" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="VIPTicketPrice"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>VIP суудлын үнэ*</FormLabel>
              <FormControl>
                <Input data-testid="vip-seat-price" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="StandardTicketPrice"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Энгийн суудлын үнэ*</FormLabel>
              <FormControl>
                <Input data-testid="standard-seat-price" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddTicketSeatInput;
