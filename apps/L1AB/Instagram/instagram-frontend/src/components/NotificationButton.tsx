'use client';

import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { Heart } from 'lucide-react';
import { useNotification } from './providers/NotificationProvider';

interface NotificationProps {
  isOpen: boolean;
  svgControls: AnimationControls;
  handleOpenClose: () => void;
}

export const NotificationButton = ({ isOpen, svgControls, handleOpenClose }: NotificationProps) => {
  const { isNotifyNew, setIsNotifyNew } = useNotification();
  const handleNewNotification = () => {
    const now = new Date();
    const currentNow = now.toISOString();
    localStorage.setItem('now', currentNow);
    setIsNotifyNew(false);
  };

  return (
    <>
      <NavigationLink href={undefined} name={isOpen ? '' : 'Notification'}>
        <Heart
          data-testid="notif-click"
          className="stroke-inherit stroke-[1.5] min-w-6 w-6 relative"
          onClick={() => {
            handleOpenClose();
            handleNewNotification();
          }}
        >
          {isNotifyNew && <circle cx="80%" cy="23%" r="5" className="fill-red-600" stroke="none" />}
          <motion.path
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            animate={svgControls}
          />
        </Heart>
      </NavigationLink>
    </>
  );
};
