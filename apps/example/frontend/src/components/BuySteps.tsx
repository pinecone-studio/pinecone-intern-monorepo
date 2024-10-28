"use client"
import React from 'react'
import { FaCheck } from "react-icons/fa6";

interface BuyStepsProps {
    step: number
}
const stepsData = [
    1, 2, 3
]
export const BuySteps = ({ step }: BuyStepsProps) => {
    return (
        <div className='w-64 relative m-auto'>
            <div className='flex justify-between'>
                {
                    stepsData.map((item, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full border  border-black flex justify-center items-center ${item <= step ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}>{item < step ? <FaCheck /> : item}</div>
                    ))
                }
            </div>
            <div className='border-b border-black -z-10 absolute top-1/2 left-0 w-full'></div>
        </div>
    )
}
