'use client';
import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from './providers';

interface ProfileProps {
  isOpen: boolean;
  svgControls: AnimationControls;
}
export const ProfileButton = ({ isOpen, svgControls }: ProfileProps) => {
  const pathname = usePathname();
  const { user }: any = useContext(UserContext);
  console.log(pathname);
  return (
    <NavigationLink href={`/profile?username=${user?.username}`} name={isOpen ? '' : 'Profile'}>
      <Avatar
        className={
          pathname == '/profile'
            ? 'w-6 h-6 overflow-hidden rounded-full flex justify-center items-center border-2 uppercase border-black'
            : 'w-6 h-6 overflow-hidden rounded-full flex justify-center items-center uppercase'
        }
      >
        <AvatarImage src={user?.profilePicture} alt={user?.username} className="object-cover" />
        <AvatarFallback data-testid="avatar-fallback" className="uppercase text-[#ccc]">
          {user?.username.slice(0, 1)}
        </AvatarFallback>
        <motion.path
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          animate={svgControls}
        />
      </Avatar>
    </NavigationLink>
  );
};
