import React from 'react'
import { ReviewStars } from './ReviewStars'
type ReviewCardProps = {
    comment: string,
    star: number,
    userName: string,
}
export const ReviewCard = ({ comment, star, userName }: ReviewCardProps) => {
    return (
        <div className='text-sm'>
            <div className=''></div>
            <div className='flex gap-1 mt-4 mb-1'>
                <h3>{userName}</h3>
                <ReviewStars percent={star} size={16} />
            </div>
            <p className='text-gray-500'>{comment}</p>
        </div>
    )
}
