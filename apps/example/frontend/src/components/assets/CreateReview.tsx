"use client"
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { ReviewStars } from './ReviewStars'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '@/lib/axios'
import { useAuth } from '../utils/authProvider'
import Cookies from "js-cookie"


interface CreateReviewProps {
    productId: string | string[];
}
export const CreateReview = ({ productId }: CreateReviewProps) => {
    const [star, setStar] = useState<number>(5)
    const [comment, setComment] = useState<string>('nice2')
    const { user } = useAuth()
    const token = Cookies.get("token");
    const createReview = async () => {
        try {
            const response = await api.post('/review', { productId, star, comment }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            toast.success(response.data.message)
        } catch (err: unknown) {
            console.log(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Login failed.");
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    }
    const handleCreate = () => {
        if (comment === '') return
        setComment('nice')
        setStar(5)
        createReview()
    }
    return (
        <div className={`bg-gray-100 p-6 rounded-lg text-sm space-y-6 mt-6 ${!user?._id ? "hidden" : null}`}>
            <div className='space-y-2'>
                <p>Одоор үнэлэх:</p>
                <ReviewStars percent={star} size={24} />
            </div>
            <div className='space-y-2'>
                <p>Сэтгэгдэл үлдээх:</p>
                <Textarea className='bg-white h-24' placeholder='Энд бичнэ үү' />
            </div>
            <button onClick={handleCreate} className='px-9 py-2 bg-blue-600 rounded-full text-white'>Үнэлэх</button>
        </div>
    )
}
