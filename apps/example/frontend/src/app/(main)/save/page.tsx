"use client"
import { SaveCard } from "@/components/assets";
import { useData } from "@/components/utils/dataProvider";

export default function Save() {
    const { saveProduct } = useData()
    return (
        <div className="w-[528px] m-auto space-y-6">
            <div className="flex font-bold text-xl gap-1">Хадгалсан бараа<div className="text-gray-400 font-normal">({saveProduct.length})</div></div>
            <div className="space-y-6 pb-6">
                {saveProduct.map((item, index) => <SaveCard id={item} key={index} />)}
            </div>
        </div>
    )
}