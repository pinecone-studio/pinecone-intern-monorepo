"use client"
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface CartCardProps {
    id: string,
    size: string,
    quantity: number,
}
interface productType {
    _id: string,
    name: string,
    price: number,
    salePercent: number,
    description: string,
    qty: {
        free?: number;
        s?: number;
        m?: number;
        l?: number;
        xl?: number;
        "2xl"?: number;
        "3xl"?: number;
    },
    images: string[],
}
export const CartCardDisable = ({ id, size, quantity }: CartCardProps) => {
    const [product, setProduct] = useState<productType>({} as productType);
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await api.get(`/product/${id}`)
                setProduct(response.data.product)
            } catch (err: unknown) {
                console.log(err);
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data?.message || "Login failed.");
                } else {
                    toast.error("An unknown error occurred.");
                }
            }
        }
        getProduct()
    }, [id])
    const stringPrice = () => {
        if (product.salePercent) {
            const productPrice = (product.price - (product.price * product.salePercent / 100)) * quantity
            return productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
        }
        const productPrice = product.price * quantity
        return productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
    }
    const stringPriceOne = () => {
        if (product.salePercent) {
            const productPrice = (product.price - (product.price * product.salePercent / 100))
            return productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
        }
        const productPrice = product.price + 0
        return productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
    }
    return (
        <div className='flex justify-between gap-6'>
            <div className='relative overflow-hidden min-w-20 h-20 rounded-lg'>
                <Image src={product.images && product.images[0]} style={{ objectFit: 'cover' }} fill alt={product.name} priority />
            </div>
            <div className='w-full text-start'>
                <div className="flex flex-col justify-between h-full">
                    <div>{product.name}</div>
                    <div className='text-sm'>{quantity} * {stringPriceOne()} <span className='font-semibold'>( {size.toUpperCase()} )</span></div>
                    <div className='font-bold'>{stringPrice()}</div>
                </div>
            </div>
        </div >
    )
}
