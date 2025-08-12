"use client";
import Link from 'next/link';
import { Home,Search,  AlignJustify, Heart, PlusSquare ,ImagePlus ,BookOpenCheck , Smile} from 'lucide-react';
import { usePost } from "./context/PostContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import EmojiPicker from 'emoji-picker-react';  

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import Image from 'next/image';

export function Sidebar() {
  const { handlePostClick , postStep} = usePost();
  console.log('PostStep in Sidebar:', postStep);
  console.log(handlePostClick , "clickinggg")
  return (
    <div className="fixed left-0 top-0 h-screen  border-r p-4 bg-red-50">
      <div className="inline-flex flex-col h-[1000px] bg-slate-200   p-[36px_32px_16px_16px] justify-between items-start flex-shrink-0">
      
        <div className='flex flex-col space-y-6 gap-[48px] items-start self-stretch'>       
            <Image src={'/logo.svg'} alt="Logo" width={103} height={29}/>

        <nav className="flex flex-col items-start bg-green-200 gap-2 self-stretch">
         <Link href="/" className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors">
            <Home className="h-[24px] w-[24px]" />
            <span className='text-[16px] font-normal'>Home</span>
          </Link>
          
          <Link href="/explore" className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="h-[24px] w-[24px]" />
            <span className='text-[16px] font-normal'>Explore</span>
          </Link>
          
          
          <Link href="/notifications" className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors">
            <Heart className="h-[24px] w-[24px]" />
            <span className='text-[16px] font-normal'>Notifications</span>
          </Link>

<DropdownMenu >
  <DropdownMenuTrigger asChild className=""> 
    <Link 
      href="#" 
      className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors"  
    >
      <PlusSquare className="h-[24px] w-[24px]" />
      <span className='text-[16px] font-normal'>Create</span>
    </Link>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='w-[154px] h-[72px] rounded-md flex flex-col mt-2 items-start justify-start mr-4'>
    <DropdownMenuItem   onClick={(e) =>{ e.preventDefault() ,handlePostClick()}} className='flex pt-[6px] pr-[8px] justify-between items-center self-stretch'>
      Post <ImagePlus className='w-[16px] h-[16px]'/>
    </DropdownMenuItem>
    <DropdownMenuItem className='flex p-[6px_8px] justify-between items-center self-stretch'>
      Story <BookOpenCheck className='w-[16px] h-[16px]'/>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

          <Link href="/profile" className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors">
            <Avatar className='w-[24px] h-[24px]'>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" width={24} height={24} />
               {/* <AvatarImage src={user?.avatar || '/default-avatar.png'} alt={user?.username || 'User'} width={24} height={24} /> */}
               {/* <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback> */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
            <span className='text-[16px] font-normal'>Profile</span>
          </Link>
        </nav>
        </div>

        <div>
          <Link href="/more" className="flex items-center self-stretch p-[12px_120.984px_12px_12px]  hover:text-primary gap-4 bg-yellow-200">
            <AlignJustify className="h-[24px] w-[24px]" />
            <span className='text-[16px] font-normal'>More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}