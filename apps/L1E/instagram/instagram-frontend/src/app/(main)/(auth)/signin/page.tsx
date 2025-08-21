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
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/AuthProvider"
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
] as const;

const SignInPage = () => {

    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(1, {
            message: "Email is required",
        }).email({ message: 'Invalid email address' }),
        password: z.string().min(1, { message: "Password is required" }).min(6, {
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

    const {login} = useAuth()
    const onSubmit = async (values: z.infer<typeof formSchema>) => { 
        try {
            
            await login(values.email, values.password)
            router.push('/')
        } catch (err) {
            console.error(err)
            // Surface server-side auth error on the email field for Cypress expectations
            form.setError('email', { message: 'A user with that email does not exist.' })
        }
    };
    return (
        <div className="bg-gray-50 w-full h-screen" data-cy="Sign-In-Page">
            <div className="w-[364px] h-fit space-y-3 mx-auto pt-[105px] rounded-[10px]">
                <div className="bg-white py-12 rounded-[10px]">
                    <div className="pb-3">
                        <Image src="../fix/Logo.svg" alt="instaLogo" className="w-full px-[89px]" width={364} height={292}/>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 w-full">
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
                                                         <Input placeholder={input.placeholder} {...field} type={input.type} className="rounded-md h-[38px]" data-cy={`Sign-In-${input.message}-Input`} />
                                                    </FormControl>
                                                    <div
                                                        data-cy={`Sign-In-${input.message}-Input-Error-Message`}
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
                            <Button data-cy="Sign-In-Submit-Button" type="submit" className="w-full bg-blue-600/50 cursor-pointer">Log in</Button>
                        </form>
                    </Form>
                </div>
                <div className="bg-white rounded-[10px] py-4">
                    <p className="text-center py-[10px] text-sm font-normal">Do not have an account? <a href="/signup" className="text-blue-600 font-bold pl-4">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
};

export default SignInPage;