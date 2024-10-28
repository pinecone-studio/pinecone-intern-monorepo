"use client"
import React, { PropsWithChildren, useEffect } from 'react'

type SizesButtonProps = {
    chooseSize: string,
    setChooseSize: (value: string) => void,
    sizes?: {
        free?: number;
        s?: number;
        m?: number;
        l?: number;
        xl?: number;
        "2xl"?: number;
        "3xl"?: number;
    },
} & PropsWithChildren;

const sizesData = [
    "free",
    "s",
    "m",
    "l",
    "xl",
    "2xl",
    "3xl"
]

export const ProductSizesButton = ({ sizes, chooseSize, setChooseSize }: SizesButtonProps) => {
    const styleSize = (size: number | undefined) => {
        if (size === undefined) return "hidden"
        if (size === 0) return "bg-gray-100 text-gray-400 border-gray-400 cursor-not-allowed"
        return null
    }
    const handleSizeClick = (size: string) => {
        if (sizes?.[size as keyof typeof sizes] === 0) return;
        setChooseSize(size);
    }
    useEffect(() => {
        if (sizes) {
            const availableSize = Object.keys(sizes).find(
                (size) => sizes[size as keyof typeof sizes]! > 0
            );
            if (availableSize) setChooseSize(availableSize)
        }
    }, [setChooseSize, sizes])
    return (
        <div className='space-y-2'>
            <p className='underline underline-offset-4 text-sm'>Хэмжээний заавар</p>
            <div className='flex gap-1'>
                {sizesData.map((size) => (
                    <button
                        key={size}
                        onClick={() => handleSizeClick(size)}
                        className={`w-8 h-8 text-xs border border-black rounded-full ${chooseSize === size ? 'bg-black text-white' : ''} ${styleSize(sizes?.[size as keyof typeof sizes])}`}
                    >
                        {size == "free" ? "Free" : size.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    )
}
