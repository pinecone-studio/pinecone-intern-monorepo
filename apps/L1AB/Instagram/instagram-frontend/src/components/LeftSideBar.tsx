'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { SearchDrawer } from './SearchDrawer';
import { MoreButton } from './MoreButton';
import { InstagramButton } from './InstagramButton';
import { NotificationDrawer } from './NotificationDrawer';
import { CreateButton } from './CreateButton';
import { NotificationButton } from './NotificationButton';
import { SearchButton } from './SearchButton';
import { HomeButton } from './HomeButton';
import { ProfileButton } from './ProfileButton';

const containerVariants = {
  close: {
    width: '5rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: '260px',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

export const LeftSideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  const toggleSearchDrawer = () => {
    if (isSideBarOpen && notifOpen) {
      setIsSideBarOpen(true);
      setNotifOpen(false);
      setSearchOpen((prev) => !prev);
    } else {
      setIsSideBarOpen(!isSideBarOpen);
      setNotifOpen(false);
      setSearchOpen((prev) => !prev);
    }
  };

  const toggleNotificationDrawer = () => {
    if (isSideBarOpen && searchOpen) {
      setIsSideBarOpen(true);
      setSearchOpen(false);
      setNotifOpen((prev) => !prev);
    } else {
      setIsSideBarOpen(!isSideBarOpen);
      setSearchOpen(false);
      setNotifOpen((prev) => !prev);
    }
  };

  const toggleHomeDrawer = async () => {
    setIsSideBarOpen(false);
    setSearchOpen(false);
    setNotifOpen(false);
  };

  useEffect(() => {
    if (isSideBarOpen) {
      containerControls.start('close');
      svgControls.start('close');
    } else {
      containerControls.start('open');
      svgControls.start('open');
    }
  }, [isSideBarOpen]);

  return (
    <div data-cy="LeftSideBar">
      <div>
        <SearchDrawer isOpen={searchOpen} toggleSearchDrawer={toggleSearchDrawer} />
        <NotificationDrawer isOpen={notifOpen} toggleNotificationDrawer={toggleNotificationDrawer} />
      </div>
      <motion.nav
        data-testid="sidebar"
        variants={containerVariants}
        initial="close"
        animate={containerControls}
        className={`flex flex-col z-50 gap-20 p-4 top-0 left-0 min-h-screen  z-100 bg-white ${isSideBarOpen ? 'shadow shadow-neutral-200' : 'border'}`}
      >
        <div onClick={toggleHomeDrawer}>
          <InstagramButton isOpen={isSideBarOpen} />
        </div>

        <div className="space-y-3">
          <div onClick={toggleHomeDrawer}>
            <HomeButton svgControls={svgControls} isOpen={isSideBarOpen} />
          </div>
          <SearchButton handleOpenClose={toggleSearchDrawer} svgControls={svgControls} isOpen={isSideBarOpen} />
          <NotificationButton handleOpenClose={toggleNotificationDrawer} svgControls={svgControls} isOpen={isSideBarOpen} />
          <CreateButton isOpen={isSideBarOpen} svgControls={svgControls} />
          <div onClick={toggleHomeDrawer}>
            <ProfileButton svgControls={svgControls} isOpen={isSideBarOpen} />
          </div>
        </div>
        <div className="mt-auto">
          <MoreButton isOpen={isSideBarOpen} svgControls={svgControls} />
        </div>
      </motion.nav>
    </div>
  );
};
