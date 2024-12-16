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
    width: '260px',
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

const errorChecker = (a: boolean, b: boolean) => {
  return a || b;
};

export const LeftSideBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [visitedUsers, setVisitedUsers] = useState<any>([]);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  const visitedUsersHandler = (users: Record<string, string>[]) => {
    setVisitedUsers(users);
  };

  const toggleSearchDrawer = () => {
    setSearchOpen((prev) => !prev);
    setNotifOpen(false);
  };

  const toggleNotificationDrawer = () => {
    setNotifOpen((prev) => !prev);
    setSearchOpen(false);
  };

  const toggleHomeDrawer = async () => {
    containerControls.start('open');
    svgControls.start('close');

    setSearchOpen(false);
    setNotifOpen(false);
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('visitedUsers') || '[]');
    setVisitedUsers(storedUsers);

    if (searchOpen || notifOpen) {
      containerControls.start('close');
      svgControls.start('close');
    } else {
      containerControls.start('open');
      svgControls.start('open');
    }
  }, [searchOpen, notifOpen]);

  return (
    <div data-cy="LeftSideBar" className="fixed left-0 z-20">
      <div>
        <SearchDrawer isOpen={searchOpen} toggleSearchDrawer={toggleSearchDrawer} visitedUsers={visitedUsers} visitedUsersHandler={visitedUsersHandler} />
        <NotificationDrawer isOpen={notifOpen} toggleNotificationDrawer={toggleNotificationDrawer} />
      </div>
      <motion.nav
        data-testid="sidebar"
        variants={containerVariants}
        initial="close"
        animate={containerControls}
        className={`flex flex-col z-50 gap-20 p-4 top-0 left-0 min-h-screen  z-100 bg-white ${errorChecker(notifOpen, searchOpen) ? 'shadow shadow-neutral-200' : 'border'}`}
      >
        <div onClick={toggleHomeDrawer}>
          <InstagramButton isOpen={errorChecker(notifOpen, searchOpen)} />
        </div>

        <div className="space-y-3">
          <div data-testid="homeButton" onClick={toggleHomeDrawer}>
            <HomeButton svgControls={svgControls} isOpen={notifOpen || searchOpen} />
          </div>
          <SearchButton handleOpenClose={toggleSearchDrawer} svgControls={svgControls} isOpen={errorChecker(notifOpen, searchOpen)} />
          <NotificationButton data-testid="notifyButton" handleOpenClose={toggleNotificationDrawer} svgControls={svgControls} isOpen={errorChecker(notifOpen, searchOpen)} />
          <CreateButton data-testid="createButton" isOpen={errorChecker(notifOpen, searchOpen)} svgControls={svgControls} />
          <div data-testid="profileButton" onClick={toggleHomeDrawer}>
            <ProfileButton svgControls={svgControls} isOpen={errorChecker(notifOpen, searchOpen)} />
          </div>
        </div>
        <div data-testid="moreButton" className="mt-auto">
          <MoreButton isOpen={errorChecker(notifOpen, searchOpen)} svgControls={svgControls} />
        </div>
      </motion.nav>
    </div>
  );
};
