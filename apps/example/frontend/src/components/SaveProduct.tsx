'use client';

import { SaveProductCard } from './';
import { useGetSavedProductsQuery } from '../generated';

export const SaveProduct = () => {
    const { data } = useGetSavedProductsQuery();

    return (
        <div className="w-[622px] m-auto space-y-6">
            <div className="flex font-bold text-xl gap-1">Хадгалсан бараа <div className="text-gray-400 font-normal">(4)</div></div>
            <div className="space-y-6 pb-6">
                {data?.getSavedProducts.map((product) => <SaveProductCard key={product.product._id} {...product.product} />)}
            </div>
        </div>
    )
}
