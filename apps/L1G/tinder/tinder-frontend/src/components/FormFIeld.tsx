'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from './MultiSelect';
import { useGetAllInterestsQuery } from '../generated'; 

type ProfileFormProps = {
  onSuccess: () => void;
  onBack: () => void;
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  bio: z.string().optional(),
  interest: z.array(z.string()).optional(),
  profession: z.string().optional(),
  work: z.string().optional(),
});

const ProfileForm = ({ onSuccess, onBack }: ProfileFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      interest: [],
      profession: '',
      work: '',
    },
  });
  const { data, loading, error } = useGetAllInterestsQuery();

  const onSubmit = (_values: z.infer<typeof formSchema>) => {
    onSuccess();
  };
  if (loading) {
    return <p className="text-center text-gray-500">Loading interests...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  const interestOptions =
    data?.getAllInterests.map((i) => ({
      value: i._id,
      label: i.interestName,
    })) || [];

  return (
    <Form {...form}>
      <form data-testid="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[400px] mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input data-testid="profile-name-input" placeholder="Enter your name" {...field} />
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
                <Input data-testid="profile-bio-input" placeholder="Tell us about yourself" {...field} />
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
                <MultiSelect options={interestOptions} value={field.value} maxCount={10} />
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
                <Input data-testid="profile-proffession-input" placeholder="Enter your profession" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="work"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School/Work</FormLabel>
              <FormControl>
                <Input data-testid="profile-work-input" placeholder="What do you do?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <Button onClick={onBack} type="button" className="border-[#E4E4E7] border text-black bg-white hover:bg-[#E4E4E7] w-16 h-9 rounded-full py-2 px-4">
            Back
          </Button>
          <Button className="bg-[#E11D48E5] w-16 h-9 rounded-full py-2 px-4 hover:bg-[#eb5e7de5]" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
