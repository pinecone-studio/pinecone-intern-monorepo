/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Logo from '../common/Logo';
import Title from '../common/Title';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './ImageUpload';

const UserInformation = () => {
  const [step, setStep] = useState<'user' | 'image'>('user');
  const form = useForm({
    defaultValues: {
      name: '',
      bio: '',
      hobby: '',
      profession: '',
      job: '',
    },
  });

  const getSavedData = (): any => {
    const savedData = localStorage.getItem('signupFormData');
    return savedData ? JSON.parse(savedData) : {};
  };

  const prefillForm = (data: any) => {
    const fields: { name: 'name' | 'bio' | 'hobby' | 'profession' | 'job'; key: string }[] = [
      { name: 'name', key: 'Username' },
      { name: 'bio', key: 'Bio' },
      { name: 'hobby', key: 'Interest' },
      { name: 'profession', key: 'Profession' },
      { name: 'job', key: 'SchoolWork' },
    ];

    fields.forEach(({ name, key }) => {
      form.setValue(name, data[key] || '');
    });
  };

  useEffect(() => {
    const savedData = getSavedData();
    prefillForm(savedData);
  }, []);

  const saveFormDataToLocalStorage = (data: any) => {
    const savedData = getSavedData();
    const updatedData = { ...savedData, ...data };
    localStorage.setItem('signupFormData', JSON.stringify(updatedData));
  };

  const handleFormSubmit = (data: unknown) => {
    saveFormDataToLocalStorage(data);
    setStep('image');
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center">
      {step === 'user' && (
        <div className="w-screen h-screen flex justify-center mt-[80px]">
          <div className="w-[400px] gap-[24px] flex flex-col justify-center items-center">
            <Logo />
            <Title text="Your Details" desc="Please provide the following information to help us get to know you better." />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Tell us about yourself" {...field} className="h-[80px] text-start flex items-start justify-start" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hobby"
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
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your profession" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job"
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
                <div className="w-full flex justify-between">
                  <Button type="button" className="bg-white border rounded-full w-[64px] h-[36px] text-black">
                    Back
                  </Button>
                  <Button data-testid="usernext" type="submit" className="bg-[#E11D48E5] text-white rounded-full w-[64px] h-[36px]">
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
      {step === 'image' && <ImageUpload />}
    </div>
  );
};

export default UserInformation;
