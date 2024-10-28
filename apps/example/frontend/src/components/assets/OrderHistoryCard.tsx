"use client"
import React, { useState } from 'react'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { OrderHistoryCardItem } from './OrderHistoryCardItem'

export const OrderHistoryCard = () => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <div className='bg-gray-100 rounded-2xl px-6 py-8 space-y-4'>
            <div onClick={() => setShow(!show)} className='flex justify-between items-center cursor-pointer'>
                <div className='flex items-center gap-2'>
                    <h3 className='font-bold text-base'>2024-09-03 15:34</h3>
                    <div className='px-2 py-[2px] bg-blue-600 rounded-full text-white text-xs'>хүргэлтэнд гарсан</div>
                </div>
                {show ? <IoChevronUp className='w-4 h-4' /> : <IoChevronDown className='w-4 h-4' />}
            </div>
            <div className={`${!show ? 'hidden' : null} border-b border-dashed pb-6 space-y-2`}>
                <OrderHistoryCardItem />
                <OrderHistoryCardItem />
                <OrderHistoryCardItem />
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-base'>Үнийн дүн:</p>
                <p className='text-lg font-bold'>480’000₮</p>
            </div>
        </div>
    )
}
