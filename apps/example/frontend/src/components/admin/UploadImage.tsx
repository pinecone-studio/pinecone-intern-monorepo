import { api } from '@/lib/axios';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";

interface UploadImageProps {
    images: string[];
    setImages: (images: string[]) => void;
}

export const UploadImage = ({ images, setImages }: UploadImageProps) => {
    const [loading, setLoading] = useState(false);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) handleUpload(files[0])
    }
    const handleUpload = async (file: File) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newImageUrl = res.data.secure_url as string;
            setImages([...images, newImageUrl]);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setLoading(false);
        }
    }
    const handleRemoveImage = (imageURL: string) => {
        setImages(images.filter(img => img !== imageURL));
    }
    return (
        <div className='flex gap-2'>
            {
                images[0] ? <div className="relative w-32 h-32 rounded-lg overflow-hidden group"><Image
                    src={images[0]}
                    layout="fill"
                    objectFit="cover"
                    alt='Uploaded'
                />
                    <button
                        type="button"
                        className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(images[0])}
                    >
                        <MdOutlineClose />
                    </button>
                </div> : <label className="flex items-center justify-center w-32 h-32 border border-dashed rounded-lg ">{loading ? <div className='h-5 w-5 border-2 rounded-full border-b-black animate-spin'></div> : <CiImageOn className='text-2xl' />}</label>
            }
            {
                images[1] ? <div className="relative w-32 h-32 rounded-lg overflow-hidden group"><Image
                    src={images[1]}
                    layout="fill"
                    objectFit="cover"
                    alt='Uploaded'
                />
                    <button
                        type="button"
                        className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(images[1])}
                    >
                        <MdOutlineClose />
                    </button>
                </div> : <label className="flex items-center justify-center w-32 h-32 border border-dashed rounded-lg ">{loading && images.length === 1 ? <div className='h-5 w-5 border-2 rounded-full border-b-black animate-spin'></div> : <CiImageOn className='text-2xl' />}</label>
            }
            {
                images[2] ? <div className="relative w-32 h-32 rounded-lg overflow-hidden group"><Image
                    src={images[2]}
                    layout="fill"
                    objectFit="cover"
                    alt='Uploaded'
                />
                    <button
                        type="button"
                        className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(images[2])}
                    >
                        <MdOutlineClose />
                    </button>
                </div> : <label className="flex items-center justify-center w-32 h-32 border border-dashed rounded-lg ">{loading && images.length === 2 ? <div className='h-5 w-5 border-2 rounded-full border-b-black animate-spin'></div> : <CiImageOn className='text-2xl' />}</label>
            }
            {
                images[3] ? <div className="relative w-32 h-32 rounded-lg overflow-hidden group"><Image
                    src={images[3]}
                    layout="fill"
                    objectFit="cover"
                    alt='Uploaded'
                />
                    <button
                        type="button"
                        className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(images[3])}
                    >
                        <MdOutlineClose />
                    </button>
                </div> : <label className="flex items-center justify-center w-32 h-32 border rounded-lg cursor-pointer">
                    {loading && images.length === 3 ? <div className='h-5 w-5 border-2 rounded-full border-b-black animate-spin'></div> : <div className='p-1 bg-gray-300 rounded-full'><FaPlus /></div>}
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
            }

        </div>
    )
}
