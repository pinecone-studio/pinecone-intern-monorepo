import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';

type Props = { control: Control<any> };

export function NameEmailFields({ control }: Props) {
  return (
    <div className="flex gap-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input className="rounded-md" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input className="rounded-md" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
