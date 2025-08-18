"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputs = [
    {
        name: 'name',
        placeholder: 'Name',
        type: "text",
        message: "name",
    },
    {
        name: 'username',
        placeholder: 'Username',
        type: "text",
        message: "username",
    },
    {
        name: 'bio',
        placeholder: 'Bio',
        type: "text",
        message: "bio",
    },
] as const;

const editProfile = () => {
    const formSchema = z.object({
        name: z.string(),
        username: z.string(),
        bio: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            bio: ""
        },
    });
    const onSubmit = async () => {

    };
    return (
        <div className="flex flex-col mx-auto w-[600px] h-[fit] mt-[65px] space-y-11">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <div className="space-y-5">
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <Image src="/profileImage.webp" alt="profileImage" width={40} height={40} className="w-10 h-10 rounded-full" />
                        <p>Ner baidag baigaa shuu</p>
                    </div>
                    <div className="w-fit px-4 py-2">
                        Change profile photo
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                        {
                            inputs.map((input, index) => {
                                return (
                                    <FormField
                                        key={input.name + index}
                                        control={form.control}
                                        name={input.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{input.placeholder}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={input.placeholder} {...field} type={input.type} className="rounded-md h-[38px]" data-cy={`Edit-Profile-${input.message}-Input`} />
                                                </FormControl>
                                                <div
                                                    data-cy={`Edit-Profile-${input.message}-Input-Error-Message`}
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
                        <Button data-cy="Edit-Profile-Submit-Button" type="submit" className="bg-blue-600/50 cursor-pointer">Submit</Button>
                    </form>
                </Form>
            </div>

        </div>
    );
}

export default editProfile;