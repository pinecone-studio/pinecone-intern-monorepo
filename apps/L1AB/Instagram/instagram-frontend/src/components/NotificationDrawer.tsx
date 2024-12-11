'use client';

import { motion } from 'framer-motion';
import Notifications from './Notifications';

const variants = {
  close: { x: -491, opacity: 0, transition: { type: 'spring', damping: 15, duration: 0.5 } },
  open: { x: 0, opacity: 1, transition: { type: 'spring', damping: 15, duration: 0.5 } },
};

interface Props {
  toggleNotificationDrawer: () => void;
  isOpen: boolean;
}
export const NotificationDrawer = ({ isOpen }: Props) => {
  return (
    <>
      <motion.nav
        data-testid="notification-drawer"
        variants={variants}
        initial="close"
        animate={isOpen ? 'open' : 'close'}
        exit="close"
        transition={{ type: 'spring', damping: 15, duration: 0.5 }}
        className={`drawer fixed z-10 bg-white space-y-5 w-[411px]  h-full left-[80px] py-6 px-4 transition-transform duration-100 shadow shadow-neutral-200 ${
          isOpen ? 'translate-x-[-411px]' : 'translate-x-0'
        }`}
      >
        <div>
          <div className="space-y-5">
            <h1 className="font-semibold text-2xl">Notifications</h1>
            <Notifications />
          </div>
        </div>
      </motion.nav>
    </>
  );
};
