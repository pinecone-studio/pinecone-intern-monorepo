'use client';

import { Product } from '@/generated';
import Image from 'next/image';

export const SaveProductCard = ({ _id, price, name, images }: Product) => {
    return (
        <div data-testid="saved-product-card">
            <div className='flex w-full gap-6 p-4 rounded-2xl border'>
                <div className="relative min-w-[100px] h-[100px] rounded-2xl cursor-pointer overflow-hidden">
                    <Image alt={name} fill src={images[0]} className="object-contain" />
                </div>
                <div className='w-full space-y-2'>
                    <div className='space-y-1'>
                        <h1>{name}</h1>
                        <div className='font-bold text-sm'>{price.toLocaleString()}</div>
                    </div>
                    <button className='bg-blue-600 px-3 py-1 text-white rounded-full text-sm'>Сагслах</button>
                </div>
                <button className='min-w-10 h-10 flex justify-center items-center'>
                    {/* <PiHeartStraightFill onClick={handleRemoveSave} className='w-6 h-6' /> */}
                </button>
            </div>
        </div>
    )
}
