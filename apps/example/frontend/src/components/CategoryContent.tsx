"use client"
import React, { useEffect, useState } from 'react'
import { Container, ProductGridCard } from './assets'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
const sizesData = [
    "Free",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
]
interface productType {
    _id: string,
    name: string,
    price: number,
    salePercent: number,
    description: string,
    category: categoryType[],
    images: string[],
}
interface categoryType {
    _id: string,
    name: string
}

export const CategoryContent = () => {
    const [products, setProducts] = useState<productType[]>([])
    const [categories, setCategories] = useState<categoryType[]>([])
    const [categoryId, setCategoryId] = useState<string>('')
    const [handleSize, setHandleSize] = useState<string>('')
    useEffect(() => {
        const getProducts = async () => {
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
            }
        }
        getProducts()
    }, [])
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.get('/category')
                setCategories(response.data.categories)
            } catch (err: unknown) {
                console.log(err);
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data?.message || "Login failed.");
                } else {
                    toast.error("An unknown error occurred.");
                }
            }
        }
        getCategories()
    }, [])
    const categoryfilteredProduct = categoryId === '' ? products : products.filter((product) => product.category.some((cat) => cat._id === categoryId))
    return (
        <Container>
            <div className='grid grid-cols-4'>
                <div className='space-y-12'>
                    <div className='space-y-4'>
                        <p onClick={() => setCategoryId('')} className='font-bold cursor-pointer'>Ангилал</p>
                        <ul className='text-sm space-y-2'>
                            {categories.map((category, index) => (<li onClick={() => setCategoryId(category._id)} className={`${categoryId === category._id ? 'underline underline-offset-4' : null} hover:underline hover:underline-offset-4 hover:text-blue-600 cursor-pointer`} key={index}>{category.name}</li>))}
                        </ul>
                    </div>
                    <div className='space-y-4'>
                        <p onClick={() => setHandleSize('')} className='font-bold cursor-pointer'>Хэмжээ</p>
                        <ul className='text-sm space-y-2'>
                            {sizesData.map((size, index) => (<li onClick={() => setHandleSize(size)} className={`${handleSize === size ? 'underline underline-offset-4' : null} hover:underline-offset-4 hover:text-blue-600 cursor-pointer hover:underline`} key={index}>{size}</li>))}
                        </ul>
                    </div>
                </div>
                <div className='grid grid-cols-3 col-span-3 gap-5'>
                    {categoryfilteredProduct.map((product, index) => (<ProductGridCard key={index} id={product._id} title={product.name} price={product.price} images={product.images} discount={product.salePercent} />))}
                </div>
            </div>
        </Container>
    )
}
