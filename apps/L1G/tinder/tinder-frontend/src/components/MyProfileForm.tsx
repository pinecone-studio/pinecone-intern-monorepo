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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { useCurrentUser } from '@/app/contexts/CurrentUserContext';
import { toast } from 'sonner'; // If you have toast notifications

interface MyProfileFormProps {
  user?: {
    id?: string;
    name?: string | null;
    email?: string;
    dateOfBirth?: string | null;
    gender?: string | null;
    genderPreferences?: string | null;
    bio?: string | null;
    interests?: { _id: string; interestName: string }[] | null;
    profession?: string | null;
    schoolWork?: string | null;
    images?: string[]; // Add images property
  };
}

export const MyProfileForm: React.FC<MyProfileFormProps> = ({ user }) => {
  const { refetchUser } = useCurrentUser();
  
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: new Date('2000-01-01'),
      gender: '',
      genderPreference: 'Female',
      bio: '',
      interests: [],
      profession: '',
      school: '',
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      const birthDate = user.dateOfBirth ? new Date(user.dateOfBirth) : new Date('2000-01-01');
      const interestIds = user.interests?.map(interest => interest._id) || [];
      
      form.reset({
        name: user.name || '',
        email: user.email || '',
        birthDate,
        gender: user.gender || '',
        genderPreference: user.genderPreferences || 'Female',
        bio: user.bio || '',
        interests: interestIds,
        profession: user.profession || '',
        school: user.schoolWork || '',
      });
    }
  }, [user, form]);

  const [updateProfile, { loading: updating, error: updateError }] = useMutation(UpdateProfileDocument, {
    onCompleted: (data) => {
      console.log('Profile updated successfully:', data);
      // Refetch user data to get fresh data
      refetchUser();
      // Show success message if you have toast notifications
      // toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      console.error('Update failed:', error);
      // Show error message if you have toast notifications
      // toast.error(`Update failed: ${error.message}`);
    }
  });

  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    console.log('Submitting profile data:', data);
    
    if (!user?.id) {
      console.error('User ID is missing');
      return;
    }

    try {
      await updateProfile({
        variables: {
          updateProfileId: user.id,
          name: data.name,
          email: data.email,
          dateOfBirth: data.birthDate.toISOString().split('T')[0],
          gender: data.gender,
          genderPreferences: data.genderPreference,
          bio: data.bio,
          interests: data.interests || [],
          profession: data.profession,
          schoolWork: data.school,
          images: user.images || [], // Keep existing images
        },
      });
    } catch (err) {
      console.error('Update mutation failed:', err);
    }
  };

  const { data: interestsData, loading: interestsLoading, error: interestsError } = useGetAllInterestsQuery();

  if (interestsError) {
    return <p className="text-center text-red-500">Interests error: {interestsError.message}</p>;
  }

  const interestOptions = interestsData?.getAllInterests.map((i) => ({
    value: i._id,
    label: i.interestName ?? '',
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <NameGenderPreferenceFields control={form.control} />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Email</FormLabel>
                  <FormControl>
                    <Input 
                      className="rounded-md" 
                      type="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                    <MultiSelect 
                      data-testid="multi-select-trigger" 
                      onValueChange={(val) => field.onChange(val)} 
                      options={interestOptions} 
                      value={field.value ?? []} 
                      maxCount={10}
                      disabled={interestsLoading}
                    />
                  </FormControl>
                  <FormDescription>You can select up to a maximum of 10 interests.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <ProfessionSchoolFields control={form.control} />
            
            <Button 
              type="submit" 
              disabled={updating}
              className="rounded-md w-fit py-2 px-4 bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100"
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </Button>
            
            {updateError && (
              <p className="text-red-500">Error: {updateError.message}</p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};