'use client';

import { motion } from 'framer-motion';
import Notifications from './Notifications';

const variants = {
  close: { x: 0, opacity: 0, transition: { type: 'spring', damping: 15, duration: 0.5 }, width: 0 },
  open: { x: 0, opacity: 1, transition: { type: 'spring', damping: 15, duration: 0.5 }, width: 411 },
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

        className={`z-10 drawer bg-white fixed dark:bg-black space-y-5  border h-full left-[80px] rounded-r-2xl divide-y divide-slate-200 transition-transform duration-100 ${isOpen ? 'w-[411px]' : 'w-0'}`}
        style={{
          boxShadow: '10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div>
          <div className="space-y-5 px-4 py-6">
            <h1 className="font-semibold text-2xl dark:text-white">Notifications</h1>
            <Notifications />
          </div>
        </div>
      </motion.nav>
    </>
  );
};
