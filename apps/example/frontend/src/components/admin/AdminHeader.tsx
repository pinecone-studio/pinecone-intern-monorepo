import Link from 'next/link'
import React from 'react'
import { FaRegUser, FaRegBell } from "react-icons/fa6";

export const AdminHeader = () => {
  return (
    <div className='h-12 bg-black flex justify-between items-center px-6 absolute w-full top-0'>
      <Link href='/admin'>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.83278 3.57635L4.6047 9.61843C4.20186 10.3746 4 11.2045 4 12.0355C4 12.8667 4.20186 13.6965 4.6047 14.4526L7.83278 20.4948C8.42777 21.6109 9.59137 22.3079 10.8576 22.3079H14.2865V20.5963H14.2853C13.6528 20.5963 13.071 20.2483 12.7734 19.6903L9.54657 13.647C9.27689 13.1432 9.14248 12.59 9.14248 12.0355C9.14248 11.4811 9.27689 10.9278 9.54657 10.4242L12.7734 4.3809C13.071 3.82283 13.6528 3.47493 14.2853 3.47493H14.2865V1.76318H10.8576C9.59137 1.76318 8.42777 2.46034 7.83278 3.57635Z" fill="white" />
          <path d="M27.3953 9.61848L24.1673 3.5764C23.5722 2.46026 22.4088 1.76323 21.1425 1.76323H17.7135V3.47485H17.7148C18.3474 3.47485 18.9292 3.82287 19.2266 4.38082L22.4534 10.4241C22.7232 10.9279 22.8574 11.4811 22.8574 12.0356C22.8574 12.59 22.7232 13.1433 22.4534 13.647L19.2266 19.6902C18.9292 20.2483 18.3474 20.5962 17.7148 20.5962H17.7135V22.3079H21.1425C22.4088 22.3079 23.5722 21.6109 24.1673 20.4948L27.3953 14.4527C27.798 13.6965 28 12.8666 28 12.0356C28 11.2046 27.798 10.3747 27.3953 9.61848Z" fill="white" />
        </svg>
      </Link>
      <div className='flex items-center gap-4'>
        <Link href='/admin'>
          <div className='p-2'>
            <FaRegBell size={20} color='white' />
          </div>
        </Link>
        <Link href='/admin'>
          <div className='p-2'>
            <FaRegUser size={20} color='white' />
          </div>
        </Link>
        <p className='text-white px-2'>Username</p>
      </div>
    </div>
  )
}
