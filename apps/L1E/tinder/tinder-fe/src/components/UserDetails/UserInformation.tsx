'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Logo } from '../Logo';
import { Title } from '../mkae/Title';
import { Tinder } from '../mkae/Tinder2024';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  Username: z.string().min(1, {
    message: 'Name must be at least 1 characters.',
  }),
  Bio: z.string().min(1, {
    message: 'Bio must be at least 1 characters.',
  }),
  Interest: z.string().min(1, {
    message: 'Interest must be at least 1 characters.',
  }),
  Profession: z.string().min(1, {
    message: 'Profession must be at least 1 characters.',
  }),
  SchoolWork: z.string().min(1, {
    message: 'SchoolWork must be at least 1 characters.',
  }),
});

export const UserInformation = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Username: '',
      Bio: '',
      Interest: '',
      Profession: '',
      SchoolWork: '',
    },
  });

  return (
    <div className="w-screen h-screen justify-between items-center flex flex-col">
      <div className="w-screen h-screen flex justify-center mt-[80px] ">
        <div className="w-[400px], h-[670px] gap-[24px] flex flex-col justify-center items-center ">
          <Logo />
          <Title text="Your Details" desc="Please provide the following information to help us get to know you better." />
          <div className="flex flex-col gap-7">
            <Form {...form}>
              <form className="w-full h-[506px]  flex flex-col gap-[24px]">
                <FormField
                  control={form.control}
                  name="Username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Tell us about yourself" {...field} className="h-[80px] text-start flex items-start justify-start " />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest</FormLabel>
                      <FormControl>
                        <Input placeholder="What are your interests?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter you profession" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="SchoolWork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School/Work</FormLabel>
                      <FormControl>
                        <Input placeholder="What are your interests?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-[400px] h-9 flex justify-between text-end">
                  <Button className=" bg-white border rounded-full w-[64px] h-[36px] text-black ">Back</Button>
                  <Button className="bg-[#E11D48E5] text-white rounded-full w-[64px] h-[36px] ">Next</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Tinder />
    </div>
  );
};
