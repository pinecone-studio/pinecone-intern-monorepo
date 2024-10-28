import React from 'react'

export const OrderHistoryCardItem = () => {
    return (
        <div className='flex gap-2 text-xs'>
            <div style={{
                backgroundImage: `url(${"https://res.cloudinary.com/dqhguhv7o/image/upload/v1725611140/imageHat_qiq2za.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} className='w-9 h-9 rounded'></div>
            <div className='flex flex-col justify-between w-full'>
                <p>Chunky Glyph Tee</p>
                <div className='flex justify-between'>
                    <p>1 x 120’000₮</p>
                    <p className='font-bold'>120’000₮</p>
                </div>
            </div>
        </div>
    )
}
