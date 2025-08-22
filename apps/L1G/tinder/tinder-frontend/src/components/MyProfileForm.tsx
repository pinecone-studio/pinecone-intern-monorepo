'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from './MultiSelect';
import { profileFormSchema } from './schema/ProfileFormSchema';
import { NameGenderPreferenceFields } from './NameGenderPreferenceFields';
import { BirthDateField } from './BirthDateField';
import { Separator } from '@/components/ui/separator';
import { ProfessionSchoolFields } from './ProfessionSchoolFields';
import { UpdateProfileDocument, useGetAllInterestsQuery } from '@/generated';
import { useMutation } from '@apollo/client';


interface MyProfileFormProps {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    gender?: string;
    birthDate?: string;
    genderPreferences?: string;
    bio?: string;
    interests?: string[];
    profession?: string;
    schoolWork?: string;
  };
}

export const MyProfileForm: React.FC<MyProfileFormProps> = ({ user }) => {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      gender: user?.gender ?? '',
      birthDate: user?.birthDate ? new Date(user.birthDate) : new Date('2000-01-01'),
      genderPreference: user?.genderPreferences ?? 'Female',
      bio: user?.bio ?? '',
      interests: user?.interests ?? [],
      profession: user?.profession ?? '',
      school: user?.schoolWork ?? '',
    },
  });

const [updateProfile, { loading: updating, error: updateError }] = useMutation(UpdateProfileDocument);

  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    console.log('Updated profile data:', data);
    try {
      const res = await updateProfile({
        variables: {
          updateProfileId: user?.id,
          name: data.name,
          bio: data.bio,
          dateOfBirth: data.birthDate.toISOString().split("T")[0],
          genderPreferences: data.genderPreference,
          gender: data.gender,
          profession: data.profession,
          schoolWork: data.school,
          images: [],
        },
      });

      console.log("Profile updated:", res.data.updateProfile);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const { data, loading, error } = useGetAllInterestsQuery();
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
    <div className="flex flex-col w-full max-w-[672px]">
      <div className="flex flex-col gap-[1px] justify-start items-start ">
        <p className="text-[18px] font-sans font-[500] text-[#09090B]">Personal Information</p>
        <p className="text-[14px] font-sans font-[400] text-[#71717A]">This is how others will see you on the site.</p>
      </div>

      <div className="py-6">
        <Separator />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <NameGenderPreferenceFields control={form.control} />
            <BirthDateField control={form.control} />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Bio</FormLabel>
                  <FormControl>
                    <Input className="rounded-md" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Interests</FormLabel>
                  <FormControl>
                    <MultiSelect options={interestOptions} value={field.value} maxCount={10} />
                  </FormControl>
                  <FormDescription>You can select up to a maximum of 10 interests.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProfessionSchoolFields control={form.control} />
            <Button type="submit" className="rounded-md w-fit py-2 px-4 bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100">
              {updating ? "Updating..." : "Update Profile"}
            </Button>
             {updateError && <p className="text-red-500">{updateError.message}</p>}
          </div>
        </form>
      </Form>
    </div>
  );
};
