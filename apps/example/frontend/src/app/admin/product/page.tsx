"use client"

import { AddProduct, ProductAll } from "@/components/admin"
import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io";

export default function Product() {
    const [tabs, setTabs] = useState("product")
    return (
        <div className="w-full">
            <div className="h-14 border-b-2">
                {
                    tabs == "add" ? <div className={`h-full px-4 py-2 flex items-center gap-2`}><button onClick={() => setTabs("product")}><IoIosArrowBack className="w-6 h-6" /></button>Бүтээгдэхүүн нэмэх</div> :
                        <>
                            <button onClick={() => setTabs("product")} className={`text-sm h-full px-4 py-2 ${tabs == "product" ? "font-bold border-b-4 border-black" : ""}`}>Бүтээгдэхүүн</button>
                            <button onClick={() => setTabs("category")} className={`text-sm h-full px-4 py-2 ${tabs == "category" ? "font-bold border-b-4 border-black" : ""}`}>Ангилал</button>
                        </>
                }
            </div>
            {tabs == "product" ? (<ProductAll setTabs={setTabs} />) : null}
            {tabs == "add" ? (<AddProduct />) : null}
        </div>
    )
}