/* eslint-disable no-secrets/no-secrets */
"use client";
import Image from "next/image";

export const SuggestCard = () => {
    type Follow = {
        title: string;
        name: string;
        img: string;
    };

    const followed: Follow[] = [
        {
            title: "Follows you",
            name: "John Doe",
            img: "https://res.cloudinary.com/dezeem4wu/image/upload/v1726459018/samples/man-portrait.jpg",
        },
        {
            title: "Follows you",
            name: "Jane Smith",
            img: "https://res.cloudinary.com/dezeem4wu/image/upload/v1726459018/samples/man-portrait.jpg",
        },
        {
            title: "Follows you",
            name: "Alice Brown",
            img: "https://res.cloudinary.com/dezeem4wu/image/upload/v1726459018/samples/man-portrait.jpg",
        },
    ];

    return (
        <>
            <div className="h-fit w-96 flex-col">
                <div className="flex justify-between ">
                    <p className="text-[#71717A] text-sm font-medium">Suggestions for you</p>
                    <p className="text-sm font-medium cursor-pointer">See All</p>
                </div>

                <div className="flex-col">
                    {followed.map((follow, index) => (
                        <div key={index} className="m-2 border rounded p-1 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="relative h-12 w-12 border rounded-full overflow-hidden">
                                    <Image
                                        src={follow.img}
                                        alt="Profile image"
                                        fill
                                        style={{ objectFit: "cover" }} 
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <p className="font-semibold">{follow.name}</p>
                                    <p className="text-sm text-[#71717A]">{follow.title}</p>
                                </div>
                            </div>

                            <div className="flex">
                                <p className="text-sm text-[#2563EB] text-[14px] font-medium cursor-pointer">follow</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
