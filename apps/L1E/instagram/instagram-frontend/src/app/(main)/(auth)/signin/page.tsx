"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { InputWithToggle } from "../components/InputWithToggle"

const BASE_URL = process.env.BASE_URL;

const inputs = [
    {
        name: 'email',
        placeholder: 'Mobile number or Email',
        type: "text",
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: "password",
    },
] as const;

const Users = ["Nake", "Naka", "Naak", "Naraa", "Naagii"]

const SignUpPage = () => {
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }).email(),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            // const res = await axios.post(`${BASE_URL}/auth/signup`, {
            //     email: value.email,
            //     password: value.password,
            //     fullname: value.fullname,
            //     username: value.username,
            // });

            router.push("/signup");

        } catch (error) {
            console.log((error as Error).message);
        }

    };

    return (
        <div className="bg-gray-50 w-full h-screen">
            <div className="w-[364px] h-fit space-y-3 mx-auto pt-[105px] rounded-[10px]">
                <div className="bg-white py-12 rounded-[10px]">
                    <div className="pb-7">
                        <img src="../Logo.svg" className="w-full px-[89px]" />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 w-full">
                            {
                                inputs.map((input, index) => {
                                    return (
                                        <FormField
                                        key={input.name+index}
                                            control={form.control}
                                            name={input.name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        {
                                                            input.type === "password"
                                                                ? <InputWithToggle {...field} placeholder={input.placeholder} type={input.type} className="rounded-md h-[38px]" />
                                                                : <Input placeholder={input.placeholder} {...field} type={input.type} className="rounded-md h-[38px]" />
                                                        }
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                })
                            }
                            <p className="text-sm font-medium text-[#2563EB] text-center py-[10px] px-[16px]">Forgot password?</p>
                            <Button type="submit" className="w-full bg-blue-600/50">Log in</Button>
                        </form>
                    </Form>
                </div>
                <div className="bg-white rounded-[10px] py-4">
                    <p className="text-center py-[10px] text-sm font-normal">Don't have an account? <a href="/signup" className="text-blue-600 font-bold pl-4">Sign up</a></p>
                </div>
            </div>
        </div>
    )
};

export default SignUpPage;