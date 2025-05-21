import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { AddTicketSchema } from '../utils/add-ticket-schema';

const AddTicketVenueInputs = ({ form }: { form: UseFormReturn<z.infer<typeof AddTicketSchema>> }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-6">
        <FormField
          name="venueName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тоглолтын болох газрын нэр*</FormLabel>
              <FormControl>
                <Input data-testid="venue-name" {...field} type="text" placeholder="Жишээ: МҮЭСТО" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="venueCapacity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Багтаамж*</FormLabel>
              <FormControl>
                <Input data-testid="venue-capacity" {...field} type="number" placeholder="Жишээ: 200" onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className=" flex gap-2 justify-around">
        <FormField
          name="venueAddress"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тоглолтын болох газрын хаяг*</FormLabel>
              <FormControl>
                <Input data-testid="venue-address" {...field} type="text" placeholder="Жишээ: Монгол улс, 210644, Улаанбаатар хот, Баянгол дүүрэг, Энхтайвны өргөн чөлөө-105, МҮЭСТОрдон" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="venueCity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Хот*</FormLabel>
              <FormControl>
                <Input data-testid="venue-city" {...field} type="text" placeholder="Жишээ: Улаанбаатар" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddTicketVenueInputs;
