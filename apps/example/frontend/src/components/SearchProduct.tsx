"use client"
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface productType {
    _id: string,
    name: string,
    price: number,
    salePercent: number,
    description: string,
    images: string[],
}
interface SearchProductProps {
    inputValue: string;
    searching: boolean;
    setSearching: (value: boolean) => void;
}
export const SearchProduct = ({ inputValue, searching, setSearching }: SearchProductProps) => {
    const [products, setProducts] = useState<productType[]>([])
    const [cards, setCards] = useState<productType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get('/product')
                setProducts(response.data.products)
            } catch (err: unknown) {
                console.log(err);
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data?.message || "Login failed.");
                } else {
                    toast.error("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        }
        getProducts()
    }, [])
    useEffect(() => {
        if (inputValue.trim() === "") {
            setCards(products);
        } else {
            const filteredCards = products.filter((item) =>
                item.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setCards(filteredCards);
        }
    }, [products, inputValue])
    if (loading) {
        return (
            <div className='absolute z-30 top-0 w-screen flex justify-center items-center h-full'>
                <p>Loading...</p>
            </div>
        );
    }
    const handleCardClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };
    return (
        <div className={searching ? 'absolute z-30 top-[68px] w-screen' : 'hidden'}>
            <div className='w-[560px] h-[380px] overflow-y-scroll m-auto bg-white border rounded-2xl p-8 space-y-4'>
                {cards.length > 0 ? (
                    cards.map((product, index) => (
                        <div key={index} onMouseEnter={() => setSearching(true)} onClick={() => handleCardClick(product._id)} className='cursor-pointer flex gap-6'>
                            <Image src={product.images[0]} alt={product.name} width={100} height={100} className='object-cover rounded-2xl' />
                            <div>
                                <h3 className='text-xl font-bold'>{product.name}</h3>
                                <p className='text-sm text-gray-500'>{product.description.slice(0, 50)}...</p>
                                <p className='text-sm text-gray-600'>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮"}</p>
                            </div>
                        </div>
                    ))) : (
                    <p className='text-center text-gray-500'>No products found.</p>
                )
                }
            </div>
        </div>
    )
}
