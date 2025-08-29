"use client";
import Link from 'next/link';
import { Home, Search, AlignJustify, Heart, PlusSquare, ImagePlus, BookOpenCheck, Instagram } from 'lucide-react';
import { usePost } from "./context/PostContext"
import { useAuth } from "./providers/AuthProvider"
import { useRouter } from 'next/navigation';
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
import { useState } from 'react';
import SearchResults from './search/Search';

export const Sidebar: React.FC = () => {

  const { handlePostClick} = usePost();
  const { user } = useAuth();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  }

  const handleCreatePost = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to create a post. Redirecting to login page...");
      router.push('/signin');
      return;
    }
    handlePostClick();
  };
  // console.log('PostStep in Sidebar:', postStep);
  // console.log(handlePostClick, "clickinggg")
  return (
    <div className="fixed left-0 top-0 h-screen border-r bg-white">
      {!isSearchOpen &&
        <div className="inline-flex flex-col h-[1000px] p-[36px_32px_16px_16px] justify-between items-start flex-shrink-0">

          <div className='flex flex-col space-y-6 gap-[48px] items-start self-stretch pt-[16px]'>
            <Image src={'../fix/logo.svg'} alt="Logo" width={103} height={29} />

            <nav className="flex flex-col items-start gap-2 self-stretch">
              <Link href="/" className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors">
                <Home className="h-[24px] w-[24px]" />
                <span className='text-[16px] font-normal'>Home</span>
              </Link>

              <Link href="/" className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors" onClick={handleSearchClick}>
                <Search className="h-[24px] w-[24px]" />
                <span className='text-[16px] font-normal'>Search</span>
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
                    <span data-cy="create" className='text-[16px] font-normal'>Create</span>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[154px] h-[72px] rounded-md flex flex-col mt-2 items-start justify-start mr-4'>
                  <DropdownMenuItem data-cy="create-post" onClick={handleCreatePost} className='flex pt-[6px] pr-[8px] justify-between items-center self-stretch'>
                    Post <ImagePlus className='w-[16px] h-[16px]' />
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex p-[6px_8px] justify-between items-center self-stretch'>
                    Story <BookOpenCheck className='w-[16px] h-[16px]' />
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
            <Link href="/more" className="flex items-center self-stretch p-[12px_120.984px_12px_12px] hover:text-primary gap-4">
              <AlignJustify className="h-[24px] w-[24px]" />
              <span className='text-[16px] font-normal'>More</span>
            </Link>
          </div>
        </div>}

      {isSearchOpen &&
        <div className='flex flex-row'>
          <div className="inline-flex flex-col h-[1130px] p-4 justify-between items-center flex-shrink-0">

            <div className='flex flex-col justify-between items-center space-y-6 gap-[48px] self-stretch  pt-[36px]'>
              <div className='w-[29px] h-[29px]'><Instagram className='cursor-pointer'/></div>

              <nav className="flex flex-col items-start gap-2 self-stretch">
                <Link href="/" className="flex items-center w-full p-3 hover:text-primary rounded-lg hover:bg-gray-100 transition-colors">
                  <Home className="h-[24px] w-[24px]" />
                </Link>

                <Link href="/" className="flex items-center w-full p-3 hover:text-primary rounded-lg hover:bg-gray-100 transition-colors" onClick={handleSearchClick}>
                  <Search className="h-[24px] w-[24px]" />
                </Link>

                <Link href="/notifications" className="flex items-center w-full p-3 hover:text-primary rounded-lg hover:bg-gray-100 transition-colors">
                  <Heart className="h-[24px] w-[24px]" />
                </Link>

                <DropdownMenu >
                  <DropdownMenuTrigger asChild className="">
                    <Link
                      href="#"
                      className="flex items-center w-full p-3 hover:text-primary gap-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <PlusSquare className="h-[24px] w-[24px]" />
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-[154px] h-[72px] rounded-md flex flex-col mt-2 items-start justify-start mr-4'>
                    <DropdownMenuItem data-cy="create-post" onClick={handleCreatePost} className='flex pt-[6px] pr-[8px] justify-between items-center self-stretch'>
                      Post <ImagePlus className='w-[16px] h-[16px]' />
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex p-[6px_8px] justify-between items-center self-stretch'>
                      Story <BookOpenCheck className='w-[16px] h-[16px]' />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/profile" className="flex items-center w-full p-3 hover:text-primary rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar className='w-[24px] h-[24px]'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" width={24} height={24} />
                    {/* <AvatarImage src={user?.avatar || '/default-avatar.png'} alt={user?.username || 'User'} width={24} height={24} /> */}
                    {/* <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback> */}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </nav>
            </div>

            <div className="flex items-center justify-center self-stretch hover:text-primary">
              <Link href="/more">
                <AlignJustify className="h-[24px] w-[24px]" />
              </Link>
            </div>
          </div>
          {/* <hr className='w-full rotate-90'/> */}
          <div className='w-px h-screen bg-[#E4E4E7]'></div>
          <div className=' pt-[36px]'>
            <SearchResults />
          </div>
        </div>
      }
    </div>
  );
}