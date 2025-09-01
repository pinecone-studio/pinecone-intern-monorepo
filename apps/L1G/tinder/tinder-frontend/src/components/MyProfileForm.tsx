'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from './MultiSelect';
import { profileFormSchema } from './schema/ProfileFormSchema';
import { BirthDateField } from './BirthDateField';
import { Separator } from '@/components/ui/separator';
import { ProfessionSchoolFields } from './ProfessionSchoolFields';
import { UpdateProfileDocument, useGetAllInterestsQuery } from '@/generated';
import { NameGenderPreferenceFields } from './NameGenderPreferenceFields';
import { useMutation } from '@apollo/client';

interface MyProfileFormProps {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    dateOfBirth?: string;
    genderPreferences?: string;
    bio?: string;
    interests?: { _id: string; interestName: string }[];
    profession?: string;
    schoolWork?: string;
  };
  images?: string[];
}

export const MyProfileForm: React.FC<MyProfileFormProps> = ({ user, images }) => {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      birthDate: user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      genderPreference: user?.genderPreferences ?? 'Female',
      bio: user?.bio ?? '',
      interests: user?.interests?.map((i) => i._id) ?? [],
      profession: user?.profession ?? '',
      school: user?.schoolWork ?? '',
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        birthDate: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
        genderPreference: user.genderPreferences ?? 'Female',
        bio: user.bio || '',
        interests: user.interests?.map((i) => i._id) || [],
        profession: user.profession || '',
        school: user.schoolWork || '',
      });
    }
  }, [user, form]);
  const [updateProfile] = useMutation(UpdateProfileDocument, {
    onCompleted: (data) => {
      console.log('Profile updated successfully', data);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    },
  });
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    console.log('Updated profile data:', data);
    if (!user?.id) {
      return;
    }
    try {
      await updateProfile({
        variables: {
          updateProfileId: user?.id || '',
          name: data.name,
          email: data.email,
          dateOfBirth: data.birthDate ? formatDate(data.birthDate) : null,
          genderPreferences: data.genderPreference,
          bio: data.bio,
          interests: data.interests,
          profession: data.profession,
          schoolWork: data.school,
          images: images ?? [],
        },
      });
    } catch (error) {
      console.error('Update mutation failed:', error);
    }
  };
  const { data } = useGetAllInterestsQuery();
  const interestOptions =
    data?.getAllInterests
      .filter((i) => !!i.interestName)
      .map((i) => ({
        value: i._id,
        label: i.interestName as string,
      })) || [];
  return (
    <div className="flex flex-col w-full max-w-[672px]">
      <div className="flex flex-col gap-[1px] justify-start items-start">
        <p className="text-[18px] font-sans font-[500] text-[#09090B]">Personal Information</p>
        <p className="text-[14px] font-sans font-[400] text-[#71717A]">This is how others will see you on the site.</p>
      </div>
      <div className="py-6">
        <Separator />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-6 px-1">
            <NameGenderPreferenceFields control={form.control} />
            {/* <BirthDateField control={form.control} /> */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Birth Date</FormLabel>
                  <FormControl>
                    <BirthDateField control={form.control} initialDate={field.value} />
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
                    <MultiSelect data-testid="multi-select-trigger" onValueChange={(val) => field.onChange(val)} options={interestOptions} value={field.value ?? []} maxCount={10} />
                  </FormControl>
                  <FormDescription>You can select up to a maximum of 10 interests.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProfessionSchoolFields control={form.control} />
            <Button type="submit" className="rounded-md w-fit py-2 px-4 bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100">
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
