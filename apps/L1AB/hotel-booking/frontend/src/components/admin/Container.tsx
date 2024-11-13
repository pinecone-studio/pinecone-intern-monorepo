import React, { PropsWithChildren } from 'react'
import { Footer, Header, SideBar } from './assets'

export const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="w-screen h-screen flex fixed">
            <SideBar />
            <div className="bg-secondary w-full flex flex-col justify-between">
                <Header />
                <div style={{ height: 'calc(100vh - 112px)' }} className='overflow-hidden'>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}
