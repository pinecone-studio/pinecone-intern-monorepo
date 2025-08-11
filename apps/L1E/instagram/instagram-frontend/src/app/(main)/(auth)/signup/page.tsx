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
import { useRouter } from "next/navigation"
import { InputWithToggle } from "../components/InputWithToggle"
import Image from "next/image"

const inputs = [
    {
        name: 'email',
        placeholder: 'Mobile number or Email',
        type: "text",
        message: "Email",
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: "password",
        message: "Password",
    },
    {
        name: 'fullname',
        placeholder: 'Full name',
        type: "text",
        message: "Full-Name",
    },
    {
        name: 'username',
        placeholder: 'Username',
        type: "text",
        message: "Username",
    },
] as const;

const Users = ["Nake", "Naka", "Naak", "Naraa", "Naagii"]

const SignUpPage = () => {
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
        password: z.string().min(1, { message: "Password is required" }).min(6, {
            message: "Password must be at least 6 characters.",
        }),
        fullname: z.string().min(1, { message: "Full name is required" }).min(2, {
            message: "Full name must be at least 2 characters.",
        }),
        username: z.string().min(1, { message: "Username is required" }).min(2, {
            message: "User name must be at least 2 characters.",
        }),
    }).refine((data) => !Users.includes(data.username), {
        path: ['username'],
        message: "A user with that username already exists.",
    });

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
            // const res = await axios.post(`${BASE_URL}/auth/signup`, {
            //     email: value.email,
            //     password: value.password,
            //     fullname: value.fullname,
            //     username: value.username,
            // });

            console.log(value, "this is value")

            router.push("/signin");

        } catch (error) {
            console.log((error as Error).message);
        }

    };

    return (
        <div className="bg-gray-50 w-full h-screen" data-cy="Sign-Up-Page">
            <div className="w-[364px] h-fit space-y-3 mx-auto pt-[105px] rounded-[10px]">
                <div className="bg-white py-12 rounded-[10px]">
                    <div className="pb-3">
                        <Image src="../Logo.svg" alt="instaLogo" className="w-full px-[89px]" width={364} height={292}/>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 w-full">
                            <p className="text-center text-sm font-normal text-foreground/90 text-center">Sign up to see photos and videos <br></br> from your friends</p>
                            {
                                inputs.map((input, index) => {
                                    return (
                                        <FormField
                                            key={input.name + index}
                                            control={form.control}
                                            name={input.name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        {
                                                            input.type === "password"
                                                                ? <InputWithToggle {...field} placeholder={input.placeholder} type={input.type} className="rounded-md h-[38px]" data-cy={`Sign-Up-${input.message}-Input`} />
                                                                : <Input placeholder={input.placeholder} {...field} type={input.type} className="rounded-md h-[38px]" data-cy={`Sign-Up-${input.message}-Input`} />
                                                        }
                                                    </FormControl>
                                                    <div
                                                        data-cy={`Sign-Up-${input.message}-Input-Error-Message`}
                                                        className={`text-center text-red-500 text-sm ${!input.message ? 'hidden' : ''}`}
                                                    >
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    )
                                })
                            }
                            <p className="text-sm font-normal text-center text-muted-foreground">People who use our service may have uploaded <br></br> your contact information to Instagram. <a href="/" className="text-blue-600">Learn <br></br> More</a></p>
                            <p className="text-sm font-normal text-center text-muted-foreground">By signing up, you agree to our Terms , Privacy <br></br> <a href="/" className="text-blue-600">Policy and Cookies Policy.</a></p>
                            <Button data-cy="Sign-Up-Submit-Button" type="submit" className="w-full bg-blue-600/50 cursor-pointer">Sign up</Button>
                        </form>
                    </Form>
                </div>
                <div className="bg-white rounded-[10px] py-4">
                    <p className="text-center py-[10px] text-sm font-normal">Have an account? <a href="/signin" className="text-blue-600 font-bold pl-4">Log in</a></p>
                </div>
            </div>
        </div>
    )
};

export default SignUpPage;