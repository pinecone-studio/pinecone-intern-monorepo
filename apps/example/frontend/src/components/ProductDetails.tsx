"use client"
import React, { useEffect, useState } from 'react'
import { Container, CreateReview, ProductGridCard, ProductPieces, ProductSizesButton, ReviewCard, ReviewStars } from './assets'
import { PiHeartStraight, PiHeartStraightFill } from 'react-icons/pi';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/lib/axios';
import { useData } from './utils/dataProvider';
import { useAuth } from './utils/authProvider';

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
interface reviewType {
    _id: string;
    user: {
        name: string;
    };
    star: number;
    comment: string;
}
interface cartProductType {
    product: string,
    quantity: number,
    size: string,
}
export const ProductDetails = () => {
    const { id } = useParams();
    const { setCartProduct } = useData();
    const { user } = useAuth()
    const [product, setProduct] = useState<productType>();
    const [products, setProducts] = useState<productType[]>([]);
    const [reviews, setReviews] = useState<reviewType[]>([])
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
        const getReviews = async () => {
            try {
                const response = await api.get(`/review/product/${id}`)
                setReviews(response.data.review)
            } catch (err: unknown) {
                console.log(err);
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data?.message || "Login failed.");
                } else {
                    toast.error("An unknown error occurred.");
                }
            }
        }
        getReviews()
    })
    const { saveProduct, setSaveProduct } = useData()
    const [chooseImage, setChooseImage] = useState(0)
    const [chooseSize, setChooseSize] = useState<string>('')
    const [pieces, setPieces] = useState<number>(1)
    const [showReview, setShowReview] = useState<boolean>(false)
    const chooseSizePieces: number = product?.qty?.[chooseSize as keyof typeof product.qty] || 0;
    const stringPrice = (price: number, discount: number) => {
        const discountedPrice = price - (price * discount / 100)
        return (discountedPrice * pieces).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
    }
    const initialValue = 0;
    const productReviewStarNumber = reviews.reduce((accumulator, currentValue) => accumulator + currentValue.star, initialValue,) / reviews.length
    const productReviewStar = Number(productReviewStarNumber.toFixed(1))
    const handleSave = () => {
        setSaveProduct(prevProducts => [...prevProducts, id as string])
    }
    const handleRemoveSave = () => {
        const newSaveProduct = saveProduct.filter(product => product !== id)
        setSaveProduct(newSaveProduct)
    }
    const handleCart = () => {
        if (user?._id) {
            const newCartProduct: cartProductType = {
                product: id.toString(),
                quantity: pieces,
                size: chooseSize
            }
            setCartProduct(prevProducts => [...prevProducts, newCartProduct])
        } else {
            toast.info("Та нэвтэрнэ үү!!!")
        }
    }
    return (
        <Container>
            <div className='space-y-20'>
                <div className='flex gap-5 items-start'>
                    <div className='flex justify-between items-center flex-1'>
                        <div className='space-y-2'>
                            {product?.images.map((image, index) => index < 6 ? <div onClick={() => setChooseImage(index)} key={index} style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }} className={`h-16 w-16 rounded-sm cursor-pointer ${chooseImage === index ? "border border-black" : null}`}></div> : null)}

                        </div>
                        <div style={{
                            backgroundImage: `url(${product?.images[chooseImage]})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }} className="h-[521px] w-[422px] rounded-2xl cursor-move"></div>
                    </div>
                    <div className='flex-1'>
                        <div className='h-[521px] space-y-6 flex flex-col justify-center relative'>
                            <div className='space-y-4'>
                                <div className='space-y-2'>
                                    <div className='border border-blue-500 text-xs font-semibold py-[2px] px-[10px] w-fit rounded-full'>шинэ</div>
                                    <div className='flex items-center gap-4'>
                                        <p className='font-bold text-2xl'>{product?.name}</p>
                                        {saveProduct?.includes(id as string) ? <PiHeartStraightFill onClick={handleRemoveSave} className='w-6 h-6 top-4 right-4 text-black' /> : <PiHeartStraight onClick={handleSave} className='w-6 h-6 top-4 right-4 text-black' />}
                                    </div>
                                    <p>{product?.description}</p>
                                </div>
                                <ProductSizesButton sizes={product?.qty} chooseSize={chooseSize} setChooseSize={setChooseSize} />
                                <ProductPieces chooseSizePieces={chooseSizePieces} pieces={pieces} setPieces={setPieces} />
                            </div>
                            <div className='space-y-2'>
                                <p className='text-xl font-bold'>{stringPrice(product?.price || 0, product?.salePercent || 0)}</p>
                                <button onClick={handleCart} className='px-9 py-2 bg-blue-600 text-white rounded-3xl'>Сагсанд нэмэх</button>
                            </div>
                            <div className='absolute bottom-0 left-0 text-sm space-y-1'>
                                <div className='flex gap-4'>
                                    <p>Үнэлгээ</p>
                                    <button onClick={() => setShowReview(!showReview)} className='text-blue-600 underline underline-offset-4'>бүгдийг {showReview ? 'хураах' : 'харах'}</button>
                                </div>
                                <div className='flex items-center space-x-1'>
                                    <ReviewStars percent={!productReviewStar ? 5 : productReviewStar} size={24} />
                                    <p className='font-bold'>{productReviewStar ? productReviewStar : "5.0"}</p>
                                    <p className='text-gray-500'>({reviews.length})</p>
                                </div>
                            </div>
                        </div>
                        <div className={` w-full ${!showReview ? 'hidden' : null}`}>
                            <CreateReview productId={id} />
                            <div className='space-y-5 divide-y divide-dashed'>
                                {reviews.map((review, index) => <ReviewCard key={index} star={review.star} userName={review.user.name} comment={review.comment} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='text-3xl font-bold mb-6'>Холбоотой бараа</p>
                    <div className='grid grid-cols-4 gap-5'>
                        {products.map((product, index) => index <= 7 ? (<ProductGridCard key={index} id={product._id} title={product.name} price={product.price} images={product.images} discount={product.salePercent} />) : null)}
                    </div>
                </div>
            </div>
        </Container>
    )
}
