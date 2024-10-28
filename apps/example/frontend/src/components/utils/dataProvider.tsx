"use client"
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie"

interface categoryDataType {
    _id: string,
    name: string,
}
interface cartProductType {
    product: string,
    quantity: number,
    size: string,
}
interface DataContextType {
    carousel: string[];
    saveProduct: string[];
    cartProduct: cartProductType[];
    categories: categoryDataType[];
    setCarousel: Dispatch<SetStateAction<string[]>>;
    setSaveProduct: Dispatch<SetStateAction<string[]>>;
    setCartProduct: Dispatch<SetStateAction<cartProductType[]>>;
    createProduct: (name: string, description: string, category: string, price: number, salePercent: number, images: string[], qty: object) => Promise<void>;
    createOrder: (firstName: string, lastName: string, phoneNumber: string, address: string, totalPrice: number) => Promise<void>;
}
const DataContext = createContext<DataContextType>({} as DataContextType);

const carouselData = [
    "https://res.cloudinary.com/dzm85pldh/image/upload/v1724812125/carousel3_soiorf.png",
    "https://res.cloudinary.com/dzm85pldh/image/upload/v1724812144/carousel2_wprz02.png",
    "https://res.cloudinary.com/dzm85pldh/image/upload/v1724812150/carousel1_k6q85b.png"
];
export const DataProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();

    const [carousel, setCarousel] = useState<string[]>(carouselData);
    const [saveProduct, setSaveProduct] = useState<string[]>([]);
    const [cartProduct, setCartProduct] = useState<cartProductType[]>([]);
    const [categories, setCategories] = useState<categoryDataType[]>([]);
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
    const createProduct = async (name: string, description: string, category: string, price: number, salePercent: number, images: string[], qty: object) => {
        try {
            await api.post("/product", { name, description, category, price, salePercent, images, qty })
            toast.success("Бүтээгдэхүүн амжилттай нэмэгдлээ")
            router.push("/admin/product")
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to logout")
            } else {
                toast.error("An unknown error occurred")
            }
        }
    }
    const createOrder = async (firstName: string, lastName: string, phoneNumber: string, address: string, totalPrice: number) => {
        try {
            const token = Cookies.get("token");
            if (!token) return;
            await api.post("/order", { products: cartProduct, totalPrice, firstName, lastName, phoneNumber, address }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success("Бүтээгдэхүүн амжилттай нэмэгдлээ")
            setCartProduct([])
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to logout")
            } else {
                toast.error("An unknown error occurred")
            }
        }
    }
    return (
        <DataContext.Provider
            value={{ saveProduct, setSaveProduct, cartProduct, setCartProduct, carousel, setCarousel, categories, createProduct, createOrder }}
        >
            {children}
        </DataContext.Provider>
    );
}
export const useData = () => useContext(DataContext);