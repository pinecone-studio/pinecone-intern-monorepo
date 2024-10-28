import React from 'react'
import { OrderHistoryCard } from './assets'
export const OrderHistory = () => {
    return (
        <div className='divide-y space-y-6'>
            <p>Захиалгын түүх</p>
            <div className='space-y-4 pt-6 text-sm'>
                <OrderHistoryCard />
                <OrderHistoryCard />
            </div>
        </div>
    )
}
