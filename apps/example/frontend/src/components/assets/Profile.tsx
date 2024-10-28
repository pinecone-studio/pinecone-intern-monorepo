"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
interface ProfileProps {
    userName: string;
}
export const Profile = ({ userName }: ProfileProps) => {
    const router = useRouter()
    return (
        <div onClick={() => router.push("/user")} className='flex items-center gap-2 cursor-pointer group'>
            <p className='group-hover:text-blue-600'>Hi! 🛒 {userName}  🛍️ </p>
            <Avatar className='border group-hover:border-blue-600'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}
