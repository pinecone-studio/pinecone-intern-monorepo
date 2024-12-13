'use client';
import { Button } from '@/components/ui/button';
import { styles } from './ProfilePagePosts';
import { Camera } from 'lucide-react';

export const ProfilePageFirstPost = () => {
  return (
    <div className="flex flex-col items-center mt-[64px] gap-5" data-testId="profilePageFirstPost">
      <div className="flex flex-col gap-4 items-center">
        <div className="p-[25px] rounded-full border-2 border-[#09090B]">
          <Camera size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-[30px] font-semibold leading-9 tracking-[-0.75px]">Share Photos</h1>
      </div>
      <p className="font-semibold leading-6 text-center w-[327px]">When you share photos, they will appear on your profile.</p>
      <Button className={styles.button} data-testId="share-first-photo">
        Share your first photo
      </Button>
      {/* <div className={styles.textContainer}>
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p>© 2024 INSTAGRAM FROM META</p>
      </div> */}
    </div>
  );
};
