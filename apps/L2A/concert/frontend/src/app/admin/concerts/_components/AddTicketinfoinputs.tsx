import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { AddTicketSchema } from '../utils/add-ticket-schema';

const AddTicketInfoInput = ({ form }: { form: UseFormReturn<z.infer<typeof AddTicketSchema>> }) => {
  return (
    <>
      <FormField
        name="title"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Тоглолтын нэр*</FormLabel>
            <FormControl>
              <Input data-testid="concert-title" {...field} type="text" placeholder="Жишээ: Монголын Гайхамшигт Урлагийн тоглолт" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Хөтөлбөрийн тухай*</FormLabel>
            <FormControl>
              <Textarea data-testid="concert-description" {...field} rows={5} className="" placeholder='Жишээ: Ардын урлагийн "Хуур Магнай" чуулга нь Монголынхоо гайха..' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="artistName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Уран бүтээлчийн нэр*</FormLabel>
            <FormControl>
              <Input data-testid="artist-name" {...field} type="text" placeholder="Жишээ: Жавхлан" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddTicketInfoInput;
