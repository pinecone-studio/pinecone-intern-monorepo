// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { nanoid } from 'nanoid';
// import { Textarea } from '@/components/ui/textarea';
// import { Input } from '@/components/ui/input';
// import Image from 'next/image';
// import { useAuth } from '@/components/providers';
// import { toast } from 'sonner';
// import { ChevronDown } from 'lucide-react';
// import DropdownMenuDemo from '@/components/search/EditProfileSelect';

// type UserType = {
//   userName: string;
//   fullName: string;
//   bio: string;
//   profileImage: string;
// };

// const Update = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState<UserType | null>(user);

//   useEffect(() => {
//     setProfile(user);
//   }, [user]);

//   const formSchema = z.object({
//     name: z.string().min(1, 'Name is required'),
//     username: z.string().min(1, 'Username is required'),
//     bio: z.string(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     values: profile
//       ? {
//           name: profile.fullName,
//           username: profile.userName,
//           bio: profile.bio,
//         }
//       : undefined,
//     resetOptions: {
//       keepDirtyValues: true,
//     },
//   });

//   const [file, setFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | undefined>(profile?.profileImage);

//   const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (selected) {
//       setImageUrl(URL.createObjectURL(selected));
//       setFile(selected);
//     }
//   };

//   const onSubmit = async (values: any) => {
//     try {
//       const formData = new FormData();
//       if (file) formData.append('file', file);
//       formData.append('upload_preset', 'ml_default');

//       const resp = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
//       const { url } = await resp.json();
//       console.log('Image URL:', url);

//       toast.success('Profile updated!');
//     } catch {
//       toast.error('Update failed');
//     }
//   };

//   return (
//     <div className="w-[600px] mx-auto">
//       <h2 className="font-semibold text-3xl mb-[44px]">Edit profile</h2>
//       {profile && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//             <div className="flex justify-between items-center">
//               <Image src={imageUrl ?? "/profileImage.webp"} alt="profile" width={40} height={40} className="w-10 h-10 rounded-full border object-cover" />
//            {/* <div className='flex justify-between items-center font-weight text-sm gap-2 px-4 py-2 bg-gray-50 rounded-lg' onClick={() => console.log("clicked")}>Change profile photo <ChevronDown strokeWidth={1} size={16} /></div> */}
//            <DropdownMenuDemo />
//             </div>
//             <FormField
//               key={nanoid()}
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold text-base">Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Full name" {...field} type="text" className="w-full" />
//                   </FormControl>
//                   <FormMessage />
//                   <p className="font-normal text-xs text-[#8E8E8E]">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
//                   <p className="font-normal text-xs text-[#8E8E8E]">You can only change your name twice within 14 days.</p>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               key={nanoid()}
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold text-base">Username</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Username" {...field} className="w-full"></Input>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               key={nanoid()}
//               control={form.control}
//               name="bio"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold text-base">Bio</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Bio" {...field} className="w-full" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex justify-end">
//               <Button type="submit" className='w-20 bg-blue-500 hover:bg-blue-500 cursor-pointer'>Submit</Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };

// export default Update;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useAuth } from "@/components/providers";
import { toast } from "sonner";
import DropdownMenuDemo, { ProfilePhotoAction } from "@/components/search/EditProfileSelect";

type UserType = {
  userName: string;
  fullName: string;
  bio: string;
  profileImage: string;
};

const Update = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserType | null>(user);

  useEffect(() => {
    setProfile(user);
  }, [user]);
  console.log("Profile in Update component:", profile);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    bio: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: profile
      ? {
          name: profile.fullName,
          username: profile.userName,
          bio: profile.bio,
        }
      : undefined,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(profile?.profileImage);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setImageUrl(URL.createObjectURL(selected));
      setFile(selected);
    }
  };

  const handleMenuSelect = (action: ProfilePhotoAction) => {
    if (action === "upload") {
      document.getElementById("fileInput")?.click();
    } else if (action === "remove") {
      setImageUrl("/profileImage.webp"); // reset to default
      setFile(null);
    } else {
      console.log("Cancel clicked");
    }
  };

  const onSubmit = async (values: any) => {
    // try {
    //   const formData = new FormData();
    //   if (file) formData.append("file", file);
    //   formData.append("upload_preset", "ml_default");

    //   const resp = await fetch(
    //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    //     { method: "POST", body: formData }
    //   );
    //   const { url } = await resp.json();
    //   console.log("Image URL:", url);

    //   toast.success("Profile updated!");
    // } catch {
    //   toast.error("Update failed");
    // }
  };

  return (
    <div className="w-[600px] mx-auto">
      <h2 className="font-semibold text-3xl mb-[44px]">Edit profile</h2>
      {profile && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex justify-between items-center">
              <Image
                src={imageUrl ?? "/profileImage.webp"}
                alt="profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border object-cover"
              />
              <DropdownMenuDemo onSelect={handleMenuSelect} />
            </div>

            {/* Hidden file input for Upload */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

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
                    <Input placeholder="Username" {...field} className="w-full" />
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
                    <Textarea placeholder="Bio" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className="w-20 bg-blue-500 hover:bg-blue-500 cursor-pointer">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Update;

 