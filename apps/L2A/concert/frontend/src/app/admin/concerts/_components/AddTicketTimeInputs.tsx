import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { AddTicketSchema } from '../utils/add-ticket-schema';

const AddTicketTimeInput = ({ form }: { form: UseFormReturn<z.infer<typeof AddTicketSchema>> }) => {
  return (
    <div className=" flex justify-center gap-3">
      <FormField
        name="startDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Тоглолт эхлэх өдөр</FormLabel>
            <FormControl>
              <Input data-testid="start-date" {...field} type="date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="endDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Тоглолт дуусах өдөр</FormLabel>
            <FormControl>
              <Input data-testid="end-date" {...field} type="date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="musicStart"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Тоглолт эхлэх цаг</FormLabel>
            <FormControl>
              <Input data-testid="music-start" {...field} type="time" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddTicketTimeInput;
