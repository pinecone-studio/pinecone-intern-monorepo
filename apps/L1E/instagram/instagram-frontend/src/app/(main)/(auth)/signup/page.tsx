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
        placeholder: 'Email',
        type: "text",
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: "password",
    },
    {
        name: 'fullname',
        placeholder: 'Full name',
        type: "text",
    },
    {
        name: 'username',
        placeholder: 'Username',
        type: "text",
    },
] as const;

const SignUpPage = () => {
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }).email(),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        fullname: z.string().min(2, {
            message: "Full name must be at least 2 characters.",
        }),
        username: z.string().min(2, {
            message: "User name must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            fullname: "",
            username: "",
        },
    });

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/signup`, {
                email: value.email,
                password: value.password,
                fullname: value.fullname,
                username: value.username,
            });

            router.push("/signin");

        } catch (error) {
            console.log((error as Error).message);
        }

    };

    return (
        <div className="w-[364px] h-fit mx-auto mt-[105px] rounded-[10px] border border-yellow-800">
            <img src="../Logo.svg" className="w-full px-[89px]" />
            <p className="text-center">Sign up to see photos and videos <br></br> from your friends</p>
           <div className="py-12 space-y-5">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 w-full border border-red-500">
                    {
                        inputs.map((input) => {
                            return (
                                <FormField
                                    control={form.control}
                                    name={input.name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                {
                                                    input.type === "password"
                                                        ? <InputWithToggle {...field} placeholder={input.placeholder} type={input.type} className="rounded-md" />
                                                        : <Input placeholder={input.placeholder} {...field} type={input.type} className="rounded-md" />
                                                }
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        })
                    }
                    <Button type="submit" className="w-full">Sign up</Button>
                </form>
            </Form>
           </div>
            <div className="border border-blue-700">
                <p className="text-center py-auto">Have an account? <a href="/signin">Log in</a></p>
            </div>
        </div>
    )
};

export default SignUpPage;