/* eslint-disable complexity */
'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultiSelect } from './MultiSelect';
import { useGetAllInterestsQuery, useUpdateProfileMutation } from '../generated';
import { UserData } from '@/app/(auth)/signup/page';
import { useState } from 'react';
import { ProfileInputField } from './ProfileInputField';

type ProfileFormProps = {
  onSuccess: () => void;
  onBack: () => void;
  userData: UserData;
  updateUserData: (_: Partial<UserData>) => void;
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  bio: z.string().optional(),
  interest: z.array(z.string()).default([]),
  profession: z.string().optional(),
  work: z.string().optional(),
});

export const ProfileForm = ({ onSuccess, onBack, userData, updateUserData }: ProfileFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [updateProfile] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      bio: '',
      interest: [],
      profession: '',
      work: '',
    },
  });
  const { data, loading, error } = useGetAllInterestsQuery();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateUserData({
      name: values.name,
      bio: values.bio,
      interests: values.interest,
      profession: values.profession,
      schoolWork: values.work,
    });
    setServerError(null);

    if (!userData.id) {
      setServerError('User ID is missing.');
      return;
    }

    try {
      const response = await updateProfile({
        variables: {
          updateProfileId: userData.id,
          genderPreferences: userData.genderPreferences,
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth instanceof Date ? userData.dateOfBirth.toISOString() : userData.dateOfBirth || undefined,
          name: values.name,
          bio: values.bio,
          interests: values.interest,
          profession: values.profession,
          schoolWork: values.work,
        },
      });
      if (response.data?.updateProfile) {
        onSuccess();
      } else {
        setServerError('Update failed');
      }
    } catch (e) {
      console.error('Update failed:', e);
      setServerError('Something went wrong.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading interests...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  const interestOptions =
    data?.getAllInterests
      .filter((i) => !!i.interestName)
      .map((i) => ({
        value: i._id,
        label: i.interestName as string,
      })) || [];

  return (
    <Form {...form}>
      <form
        data-testid="profile-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[400px] mx-auto h-[380px] min-h-[380px] max-h-fit sm:h-[400px] md:h-fit overflow-scroll"
      >
        <ProfileInputField control={form.control} name="name" label="Name" placeholder="Enter your name" testId="profile-name-input" />
        <ProfileInputField control={form.control} name="bio" label="Bio" placeholder="Tell us about yourself" testId="profile-bio-input" />

        <FormField
          control={form.control}
          name="interest"
          data-testid="interest"
          render={({ field }) => (
            <FormItem className="w-full px-1">
              <FormLabel>Interest</FormLabel>
              <FormControl className="h-[40px]">
                <MultiSelect onValueChange={(val) => field.onChange(val)} options={interestOptions} value={field.value} maxCount={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ProfileInputField control={form.control} name="profession" label="Profession" placeholder="Enter your profession" testId="profile-profession-input" />
        <ProfileInputField control={form.control} name="work" label="School/Work" placeholder="What do you do?" testId="profile-work-input" />

        <div className="flex justify-between items-center ">
          <Button onClick={onBack} type="button" className="border-[#E4E4E7] border text-black bg-white hover:bg-[#E4E4E7] w-16 h-9 rounded-full py-2 px-4">
            Back
          </Button>
          {serverError && <p className="text-red-500 mt-2">{serverError}</p>}
          <Button className="bg-[#E11D48E5] w-fit h-9 rounded-full py-2 px-4 hover:bg-[#eb5e7de5]" type="submit" disabled={form.formState.isSubmitting} data-testid="submit-button">
            {form.formState.isSubmitting ? 'Submitting...' : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
