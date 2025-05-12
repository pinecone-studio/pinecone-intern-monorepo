import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { AddTicketSchema } from '../utils/add-ticket-schema';

const AddTicketImageURLInput = ({ form }: { form: UseFormReturn<z.infer<typeof AddTicketSchema>> }) => {
  return (
    <>
      <FormField
        name="thumbnailUrl"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Зураг</FormLabel>
            <FormControl>
              <Input {...field} type="text" data-testid="thumbnail-url" placeholder="https:/**" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddTicketImageURLInput;
