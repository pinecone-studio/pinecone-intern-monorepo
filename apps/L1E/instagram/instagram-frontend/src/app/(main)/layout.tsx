import { Sidebar } from '@/components/Sidebar'
import React from 'react'
import CreatePost from './create/page'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row'>
      <div className='w-fit'>
        <Sidebar />
      </div>
      <div className='flex-1 ml-[300px] mx-auto'>
        {children}
        <CreatePost />
      </div>
    </div>
  )
}

export default Layout