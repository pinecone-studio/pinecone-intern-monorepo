"use client"
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react'
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import { useData } from '../utils/dataProvider';
type ProductGridCardProps = {
    id: string,
    index?: number,
    title: string,
    price: number,
    discount?: number,
    images: string[]
} & PropsWithChildren;
export const ProductGridCard = ({ id, price, title, images, index, discount }: ProductGridCardProps) => {
    const router = useRouter()
    const { saveProduct, setSaveProduct } = useData()
    const costumHeight = index === 7 || index === 6 ? "h-[736px]" : "h-80"
    if (discount) {

    }
    const showPrice = (price: number, discount: number | undefined) => {
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
    const handleSave = () => {
        setSaveProduct(prevProducts => [...prevProducts, id])
    }
    const handleRemoveSave = () => {
        const newSaveProduct = saveProduct.filter(product => product !== id)
        setSaveProduct(newSaveProduct)
    }
    return (
        <div key={price} className="mb-6 space-y-2">
            <div className='overflow-hidden rounded-2xl relative shadow-xl'>
                <div onClick={() => router.push(`/product/${id}`)} style={{
                    backgroundImage: `url(${images})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} className={`bg-gray-20 cursor-grab duration-300 hover:scale-125 ${costumHeight}`}></div>
                {saveProduct?.includes(id) ? <PiHeartStraightFill onClick={handleRemoveSave} className='w-6 h-6 absolute top-4 right-4 text-black cursor-pointer' /> : <PiHeartStraight onClick={handleSave} className='w-6 h-6 absolute top-4 right-4 text-black cursor-pointer' />}
            </div>
            <div>
                <div>{title}</div>
                {showPrice(price, discount)}
            </div>
        </div>
    )
}
