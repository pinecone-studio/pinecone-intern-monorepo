'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TitleContact } from './TitleContact';
import { EmergencyContact } from './EmergencyContact';

const formSchema = z.object({
  phoneNumber: z.string(),
  email: z.string().email('Invalid email address'),
  name8720214312: z.string(),
  select: z.string().nonempty('Please select an option'),
});

const Contact: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="flex lg:w-[672px] sm:w-[200px] md:w-[300px] flex-col gap-6">
      <Form {...form}>
        <TitleContact />
        <div className="w-full flex justify-center">
          <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-1">
          <div className="flex w-full items-center gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
          </div>
          <EmergencyContact />

          <div className="flex w-full items-center gap-4">
            <FormField
              control={form.control}
              name="select"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Relationship</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Sibling">Sibling</SelectItem>
                      <SelectItem value="Child">Child</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="flex py-2 px-4 text-[#FAFAFA] bg-[#2563EB] rounded-md hover:bg-blue-400">
            Update profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Contact;
