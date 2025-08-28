'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useAuth } from '@/components/providers';

const Update = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(user);
  useEffect(() => {
    setProfile(user);
  }, [user]);
  console.log(profile)
  const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    username: z.string().min(1, { message: 'Name is required' }),
    bio: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      bio: '',
    },
  });

  const [selectedValue, setSelectedValue] = useState<string>('');
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const [file, setFile] = useState<File | string>('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImage = (event: ChangeEvent) => {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    setImageUrl(window.URL.createObjectURL(file));
    setFile(file);
  };

  const UPLOAD_PRESET = 'ml_default';
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const formData = new FormData();
  formData.append('file', file as File);
  formData.append('upload_preset', UPLOAD_PRESET);

  const onSubmit = async (value: any) => {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const { url } = await response.json();
    console.log(url, 'yrl');

    const food = await axios.post(``, {
      ...value,
    });
  };

  return (
    <div className="w-[600px] mx-auto">
      <h2 className="font-semibold text-3xl mb-[44px]">Edit profile</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="">
            <Image src="/" alt="profileImage" width={40} height={40} />
            <input className="hidden" type="file" onChange={handleImage}></input>
          </div>
          <FormField
            key={nanoid()}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} type="text" className="w-full" />
                </FormControl>
                <FormMessage />
                <p className="font-normal text-xs text-[#8E8E8E]">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                <p className="font-normal text-xs text-[#8E8E8E]">You can only change your name twice within 14 days.</p>
              </FormItem>
            )}
          />
          <FormField
            key={nanoid()}
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">Username</FormLabel>
                <FormControl>
                  <Textarea placeholder="Username" {...field} className="w-full"></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={nanoid()}
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Bio" {...field} type="number" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Update;
