'use client';

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react'; // Import eye icons
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/AuthProvider';

const FormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    repeatPass: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  })
  .refine((data) => data.password === data.repeatPass, {
    message: 'Passwords do not match.',
    path: ['repeatPass'],
  });

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPass: '',
    },
  });

  const { signup } = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signup({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-[#09090B] border border-[#27272A] rounded-2xl flex flex-col gap-6 py-8 px-12">
        <p className="text-white text-center text-[24px] font-light">Бүртгүүлэх</p>
        <div className="flex flex-col gap-6 items-center">
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FAFAFA] font-thin">Имэйл хаяг:</FormLabel>
                      <FormControl>
                        <Input className="w-[350px] h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 border border-[#27272A] rounded-sm" placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="w-[350px]" />
                    </FormItem>
                  )}
                />
                {/* Password Field */}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FAFAFA] font-thin">Нууц үг үүсгэх:</FormLabel>
                      <FormControl>
                        <div className="relative w-[350px]">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 pr-10 border border-[#27272A] rounded-sm"
                            placeholder="Нууц үг"
                            {...field}
                          />
                          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="w-[350px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repeatPass"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-[350px]">
                          <Input
                            type={showRepeatPassword ? 'text' : 'password'}
                            className="w-full h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 pr-10 border border-[#27272A] rounded-sm"
                            placeholder="Нууц үг дахин оруулна уу"
                            {...field}
                          />
                          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowRepeatPassword((prev) => !prev)}>
                            {showRepeatPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="w-[350px]" />
                    </FormItem>
                  )}
                />

                <Button className="w-[350px] h-[36px] hover:bg-blue-600 bg-[#00B7F4] text-black text-sm font-light rounded-sm" type="submit">
                  Бүртгүүлэх
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="text-muted-foreground text-[14px] text-center mt-4 font-extralight">
          Та бүртгэлтэй хаягтай бол
          <Link href={'/signin'}>
            <button className="bg-transparent underline px-[4px]">нэвтрэх</button>
          </Link>
          хэсгээр орно уу.
        </div>
      </div>
    </div>
  );
};

export default SignUp;
