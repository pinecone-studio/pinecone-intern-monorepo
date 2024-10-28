"use client"
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { useData } from './utils/dataProvider';

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
export const CartCard = ({ id, size, quantity }: CartCardProps) => {
    const [product, setProduct] = useState<productType>({} as productType);
    const [productPrice, setProductPrice] = useState<number>(0)
    const [qty, setQty] = useState<number>(quantity)
    const { setCartProduct } = useData()
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
    useEffect(() => {
        if (product) {
            let calculatedPrice = product.price * quantity;

            if (product.salePercent) {
                calculatedPrice = (product.price - (product.price * product.salePercent) / 100) * quantity;
            }

            setProductPrice(calculatedPrice);
        }
    }, [product, quantity]);
    const stringPrice = () => {
        return productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
    }
    const handleRemoveCartProduct = () => {
        setCartProduct(prevCart => prevCart.filter(item => item.product !== id))
    }
    return (
        <div className='p-4 border rounded-xl flex justify-between bg-white gap-6'>
            <div className='relative overflow-hidden min-w-24 h-24 rounded-lg'>
                {
                    product.images ? <Image src={product.images && product.images[0]} style={{ objectFit: 'cover' }} fill alt={product.name} priority sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" /> : <div className='w-full h-full bg-blue-100'></div>
                }
            </div>
            <div className='w-full text-start'>
                <div className="flex flex-col justify-between h-full">
                    <div>{product.name} <span className='font-bold'>( {size.toUpperCase()} )</span> </div>
                    <div><button onClick={() => setQty(qty - 1)} className='w-8 h-8 border border-black rounded-full'>-</button><span className='px-4'>{qty}</span><button onClick={() => setQty(qty + 1)} className='w-8 h-8 border border-black rounded-full'>+</button></div>
                    <div className='font-bold'>{stringPrice()}</div>
                </div>
            </div>
            <button onClick={handleRemoveCartProduct} className='h-fit p-1'>
                <IoTrashOutline className='text-2xl hover:text-red-500' />
            </button>
        </div >
    )
}
