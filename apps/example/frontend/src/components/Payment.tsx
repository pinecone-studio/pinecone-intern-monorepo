"use client"
import React, { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const images = [
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477160/StateBank_xuqtes.png",
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477160/TransBank_rhsegm.png",
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477159/MBank_wyy8vz.png",
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477160/Qpay_utnvv8.png",
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477160/KasBank_yfzzuv.png",
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477159/Ard_hfv6h8.png",
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477160/CapBank_opbmjo.png",
    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1728477160/MedfBank_gnh8pl.png"
];

export const Payment = () => {
    const [timeLeft, setTimeLeft] = useState<number>(10);
    const router = useRouter()
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    if (timeLeft === 0) {
        router.push("/buy/success")
    }
    console.log(timeLeft)
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    return (
        <div className='flex flex-col items-center gap-6'>
            <div className='bg-gray-200 py-1 px-2 rounded-full text-sm'>{formatTime(timeLeft)}</div>
            <QRCodeSVG value="https://github.com/benordb" />
            <p>Төлөх боломжтой банкууд:</p>
            <div className='grid grid-cols-4 gap-x-8 gap-y-4'>
                {images.map((src, index) => (
                    <Image key={index} width={40} height={40} src={src} alt="StateBank" />
                ))}
            </div>
        </div>
    )
}
