"use client"
import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useAuth } from './utils/authProvider'
import { useRouter } from 'next/navigation'


export const UserSection = () => {
    const { logout } = useAuth()
    const router = useRouter()
    return (
        <div className='divide-y space-y-6'>
            <p>Хэрэглэгчийн хэсэг</p>
            <div className='space-y-8 pt-6 text-sm'>
                <div className='space-y-2'>
                    <Label htmlFor="firstName">Овог:</Label>
                    <Input id="firstName" />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor="lastName">Нэр:</Label>
                    <Input id="lastName" />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor="phoneNumber">Утасны дугаар:</Label>
                    <Input id="phoneNumber" />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor="email">Имэйл хаяг:</Label>
                    <Input id="email" />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor="address">Хаяг:</Label>
                    <Textarea id="address" className='min-h-24' />
                </div>
                <div className='flex justify-between'>
                    <button className='bg-blue-600 rounded-full px-4 py-2 text-white items-end'>Мэдээлэл шинэчлэх</button>
                    <button onClick={() => { router.push("/"), logout() }} className='bg-red-600 text-xs rounded-full px-4 py-2 text-white items-end'>Гарах</button>
                    {/* <button onClick={() => router.push("/forget")} className='bg-blue-600 text-xs rounded-full px-4 py-2 text-white items-end'>Нууц үг шинэчлэх</button> */}
                </div>
            </div>
        </div>
    )
}
