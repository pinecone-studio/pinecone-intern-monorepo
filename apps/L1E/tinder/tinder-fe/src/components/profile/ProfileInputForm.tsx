import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  Age: z.number().min(1, {
    message: 'Age must be at least 1.',
  }),
});

const ProfileInputForm = ({ 'data-testid': testId }: { 'data-testid'?: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Age: 0,
    },
  });

  return (
    <Form {...form}>
      <form data-testid={testId}>
        <FormField
          control={form.control}
          name="Age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl className="w-[280px] h-[40px]">
                <Input type="number" placeholder="Enter your age" {...field} />
              </FormControl>
              <FormDescription>Your age is used to determine your eligibility.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProfileInputForm;
