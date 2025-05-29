import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { useFetchProfileQuery } from '@/generated';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Loading from './Loading';
import { useAuth } from '../auth/context/AuthContext';
const UserHeader = () => {
  const { logout, user } = useAuth();

  const { data } = useFetchProfileQuery({
    variables: { id: user?._id ?? '' },
    skip: !user?._id,
  });

  if (!user) {
    return <Loading />;
  }

  return (
    <header className="w-full flex  justify-center items-center mt-3 border-b p-[16px]" style={{ borderColor: '#E4E4E7', alignSelf: 'stretch' }}>
      <div className="flex justify-between items-center w-[80%]">
        <div>
          <Link href="/swipe-page">
            <Image src="/tinder.svg" width={100} height={25} alt="header-image" data-testid="header-image" />
          </Link>
        </div>

        <div className="flex items-center gap-[16px]">
          <Link href="/message" data-testid="message-link">
            <button className="w-10 h-10 py-2 px-4" data-testid="message-button">
              <MessageSquare className="h-[16px] w-[16px]" />
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" data-testid="avatar-button">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-black">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={data?.fetchProfile.images?.[0]} alt="profile image" />
                    <AvatarFallback>
                      <img src="/defaultAvatar.webp" alt="default avatar" className="w-full h-full object-cover rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuGroup>
                <Link href="/edit-profile/profile" data-testid="profile-link">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuItem onClick={logout} data-testid="logout-button">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
