'use client';

import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { Heart } from 'lucide-react';

interface NotificationProps {
  isOpen: boolean;
  svgControls: AnimationControls;
  handleOpenClose: () => void;
}

export const NotificationButton = ({ isOpen, svgControls, handleOpenClose }: NotificationProps) => {
  return (
    <>
      <NavigationLink href={undefined} name={isOpen ? '' : 'Notification'}>
        <Heart data-testid="notif-click" className="stroke-inherit stroke-[1.5] min-w-6 w-6" onClick={() => handleOpenClose()}>
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
