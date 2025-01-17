import { Edit } from '@/components/svg/Edit';
import { Menu } from '@/components/svg/Menu';
import { Notification } from '@/components/svg/Notification';
import { Shop } from '@/components/svg/Shop';
import React from 'react';

const UserProfile  = () => {
    const user = {
        img:null,
        phone: 91919191,
        gmail:"ganjaa@gmail.com",
        password: 11111
    }
    
  return (
    <div className="max-h-[500px] bg-white text-center flex flex-col items-center p-4">
  
      <header className="w-full flex items-center justify-between mb-6">
        <div className="w-12 h-12">
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <span className="material-icons"><Shop/></span>
          </button>
          <button>
            <span className="material-icons"><Notification/></span>
          </button>
          <button>
            <span className="material-icons"><Menu/></span>
          </button>
        </div>
      </header>

   
      <div className="flex flex-col items-center bg-gray-100 min-h-[679px] rounded-xl shadow-md p-6 w-full max-w-sm">
     
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-4xl text-gray-600 material-icons">{user.img}</span>
          </div>
          <button
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm"
            aria-label="Edit avatar"
          >
            <span className="material-icons text-gray-500"><Edit/></span>
          </button>
        </div>


        <div className="mt-4 w-full flex flex-col gap-5 text-left">
         
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Утас:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user.phone}</p>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label="Edit phone number"
              >
                <span className="material-icons"><Edit/></span>
              </button>
            </div>
          </div>

          <div className='w-full border border-gray-300 '></div>
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Имэйл хаяг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user.gmail}</p>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label="Edit email"
              >
                <span className="material-icons"><Edit/></span>
              </button>
            </div>
          </div>

          <div className='w-full border border-gray-300 '></div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-medium">Нууц үг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user.password}</p>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label="Edit password"
              >
                <span className="material-icons"><Edit/></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
