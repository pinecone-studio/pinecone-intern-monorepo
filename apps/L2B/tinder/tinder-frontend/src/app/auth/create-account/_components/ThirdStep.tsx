'use client';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().min(2).max(50),
  interest: z.string().min(2).max(50),
  profession: z.string().min(2).max(50),
  schoolWork: z.string().min(2).max(50),
});
const ThirdStep = ({ setStep, step }: { setStep: (_step: number) => void; step: number }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      interest: '',
      profession: '',
      schoolWork: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(3);
  }
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="w-[350px] flex flex-col items-center">
        <p className="text-[24px] text-[#09090B] font-semibold">Your Details</p>
        <p className="text-[#71717A]">Please provide the following information to help us get to know you better.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} data-cy="input-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Tell us about yourself" {...field} data-cy="input-bio" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest</FormLabel>
                <FormControl>
                  <Input placeholder="What are your interests?" {...field} data-cy="input-interest" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input placeholder="Enter you profession" {...field} data-cy="input-profession" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schoolWork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School/Work</FormLabel>
                <FormControl>
                  <Input placeholder="What are your interests" {...field} data-cy="input-school" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button className="rounded-full w-[64px] h-[36px]" type="button" onClick={() => setStep(step - 1)}>
              Back
            </Button>
            <Button className="bg-[#E11D48E5] rounded-full w-[64px] h-[36px]" type="submit" data-cy="next-button">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ThirdStep;
