import React from 'react';
import { LiaStarSolid, LiaStarHalfSolid } from "react-icons/lia";

type ReviewStarsProps = {
    percent: number;
    size: number;
};

export const ReviewStars = ({ percent, size }: ReviewStarsProps) => {
    const fullStars = Math.floor(percent);
    const hasHalfStar = percent % 1 >= 0.5;
    return (
        <div className="flex text-yellow-300">
            {Array.from({ length: fullStars }).map((_, index) => (
                <LiaStarSolid key={index} style={{ width: size, height: size }} />
            ))}
            {hasHalfStar && <LiaStarHalfSolid style={{ width: size, height: size }} />}
        </div>
    );
};
