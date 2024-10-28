import React, { PropsWithChildren } from 'react'
import { AdminHeader } from './AdminHeader'
import { AdminSideBar } from './AdminSideBar'

export const AdminContainer = ({ children }: PropsWithChildren) => {
    return (
        <div className='w-screen h-screen bg-gray-100 relative'>
            <AdminHeader />
            <div className='flex pt-12 w-full h-full'>
                <AdminSideBar />
                {children}
            </div>
        </div>
    )
}
