"use client"
import { api } from '@/lib/axios';
import React, { useEffect, useState } from 'react'
import { PiHeartStraightFill } from 'react-icons/pi'
import { useData } from '../utils/dataProvider';
import { toast } from 'sonner';
import { useAuth } from '../utils/authProvider';
import { useRouter } from 'next/navigation';

interface productType {
    _id: string,
    name: string,
    price: number,
    salePercent: number,
    description: string,
    images: string[],
}
interface SaveCardProps {
    id: string,
}
interface cartProductType {
    product: string,
    quantity: number,
    size: string,
}
export const SaveCard = ({ id }: SaveCardProps) => {
    const [product, setProduct] = useState<productType>({} as productType);
    const { saveProduct, setSaveProduct, setCartProduct } = useData()
    const { user } = useAuth()
    const router = useRouter()

    const handleCart = () => {
        if (user?._id) {
            const newCartProduct: cartProductType = {
                product: id,
                quantity: 1,
                size: "free"
            }
            setCartProduct(prevProducts => [...prevProducts, newCartProduct])
        } else {
            toast.info("Та нэвтэрнэ үү!!!")
        }
    }
    const handleRemoveSave = () => {
        const newSaveProduct = saveProduct.filter(product => product !== id)
        setSaveProduct(newSaveProduct)
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await api.get(`/product/${id}`)
                setProduct(response.data.product)
            } catch (err: unknown) {
                console.log(err);
            }
        }
        getProduct();
    }, [id])

    const showPrice = (price: number | undefined, discount: number | undefined) => {
        price = price === undefined ? 0 : price;
        const newPrice = stringPrice(price)
        if (discount) {
            const newDiscountedPrice = stringDiscountedPrice(price, discount)
            const newDiscount = stringDiscount(discount)
            return (
                <div className='flex items-center gap-2'>
                    <p className='font-bold'>{newDiscountedPrice}</p>
                    <p className='text-xs line-through text-[#71717A]'>{newPrice}</p>
                    <p className='font-bold text-red-500'>{newDiscount}</p>
                </div>
            )
        } else {
            return (
                <p className='font-bold'>{newPrice}</p>
            )
        }
    }
    const stringPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
    }
    const stringDiscountedPrice = (price: number, discount: number): string => {
        return (price - (price * discount / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
    }
    const stringDiscount = (discount: number) => {
        return `${discount}%`
    }
    return (
        <div className='flex w-full gap-6'>
            <div onClick={() => router.push(`/product/${id}`)} style={{
                backgroundImage: `url(${product.images ? product.images[0] : null})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} className='w-[120px] h-[120px] rounded-2xl cursor-pointer'></div>
            <div className='w-80 space-y-2'>
                <div className='space-y-1'>
                    <h1>{product.name}</h1>
                    <div className='font-bold text-sm'>{showPrice(product.price, product.salePercent)}</div>
                </div>
                <button onClick={handleCart} className='bg-blue-600 px-3 py-1 text-white rounded-full text-sm'>Сагслах</button>
            </div>
            <button className='w-10 h-10 flex justify-center items-center'>
                <PiHeartStraightFill onClick={handleRemoveSave} className='w-6 h-6' />
            </button>
        </div>
    )
}
