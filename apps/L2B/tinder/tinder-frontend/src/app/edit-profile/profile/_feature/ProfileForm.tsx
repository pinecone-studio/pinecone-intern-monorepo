/* eslint-disable camelcase */

'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/auth/context/AuthContext';

import { z } from 'zod';
import { ProfileNameEmailFields, ProfileDobField, ProfileBioField, ProfileInterest, ProfileProfessionField, ProfileSchoolField, ProfileGenderInterest } from './index';
import { calculateAge, getApproxDOBFromAge } from '@/app/utils/calculate-age';
import { useUpdateProfileMutation } from '@/generated';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),

  dob: z
    .date({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Invalid date',
    })
    .optional(),
  interestedIn: z.string(),
  bio: z.string().min(5, { message: 'Bio must be at least 5 characters.' }),
  profession: z.string().min(2, { message: 'Profession must be at least 2 characters.' }),
  school: z.string().min(2, { message: 'School must be at least 2 characters.' }),
  interestOptions: z.array(z.string()).max(10, 'You can select up to 10 interests'),
});

export type ProfileFormType = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const { currentProfile } = useAuth();
  const [updateProfile, { loading }] = useUpdateProfileMutation({
    onCompleted: () => {
      toast.success('successfully changed!');
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      dob: undefined,
      bio: '',
      profession: '',
      school: '',
      interestOptions: [],
      interestedIn: '',
    },
  });
  console.log(currentProfile);
  useEffect(() => {
    if (currentProfile) {
      const dob = getApproxDOBFromAge(currentProfile.age);
      form.reset({
        name: currentProfile.profileInfo.name,
        email: currentProfile.user.email,
        dob,
        bio: currentProfile.profileInfo.bio,
        profession: currentProfile.profileInfo.profession,
        school: currentProfile.profileInfo.school,
        interestedIn: currentProfile.interestedIn,
      });
    }
  }, [currentProfile, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const age = calculateAge(values.dob);

    await updateProfile({
      variables: {
        updateProfileId: currentProfile!.user._id,
        input: {
          age,
          interestedIn: values.interestedIn,
          profileInfo: {
            name: values.name,
            bio: values.bio,
            profession: values.profession,
            school: values.school,
            interest: 'Art',
          },
        },
      },
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ProfileNameEmailFields control={form.control} />
        <ProfileDobField control={form.control} />
        <ProfileBioField control={form.control} />
        <ProfileGenderInterest control={form.control} />
        <ProfileInterest control={form.control} name="interestOptions" />
        <ProfileProfessionField control={form.control} />
        <ProfileSchoolField control={form.control} />

        <Button data-testid="profile-submitButton" type="submit" className="bg-red-500 hover:bg-red-700" disabled={loading}>
          {loading ? 'updating...' : ' Update profile'}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
