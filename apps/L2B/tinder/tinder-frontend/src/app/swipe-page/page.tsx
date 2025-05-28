'use client';
import UserHeader from '../_components/UserHeader';
import Footer from '../_components/Footer';
import SwipeFeature from './_feature/Swipe';

const UserPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      <UserHeader />
      <SwipeFeature />
      <Footer />
    </div>
  );
};

export default UserPage;
