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
] as const;

const SignInPage = () => {
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }).email(),
        password: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/signin`, {
                email: value.email,
                password: value.password,
            });

            router.push("/");

        } catch (error) {
            console.log((error as Error).message);
        }

    };

    return (
        <div className="w-[500px] h-screen mx-auto mt-[100px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full border border-red-500">
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
                                                        ? <InputWithToggle {...field} placeholder={input.placeholder} type={input.type} />
                                                        : <Input placeholder={input.placeholder} {...field} type={input.type} />
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
            <div>
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    )
};

export default SignInPage;