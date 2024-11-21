'use client';
import { Bookmark, Grid3x3 } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfilePageFirstPost } from './ProfilePageFirstPost';

export const styles = {
  button: 'bg-white hover:bg-white text-[#2563EB] font-medium leading-5 text-[14px] outline-none',
  selected: 'flex gap-[7px] items-center py-[17px] border-t-[1.5px] border-[#09090B] text-[#09090B] cursor-pointer',
  notSelected: 'flex gap-[7px] items-center py-[17px] text-[#71717A] cursor-pointer',
  line: 'border-[#E4E4E7] border-t-[1px] w-[935px] flex justify-center uppercase gap-12',
  imageContainer: 'relative w-[309px] h-[309px]',
  postsContainer: 'grid grid-cols-3 gap-1',
  container: 'flex flex-col gap-4 min-h-full',
  textContainer: 'w-[935px] mt-7 text-center flex flex-col gap-4 text-[12px] text-[#71717A] leading-4',
};

export const ProfilePagePosts = ({ postImage }: { postImage: string | null }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');

  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div
          className={type === 'posts' ? styles.selected : styles.notSelected}
          onClick={() => {
            router.push('/profile?type=posts');
          }}
        >
          <Grid3x3 strokeWidth={2} size={16} />
          posts
        </div>
        <div
          className={type === 'saved' ? styles.selected : styles.notSelected}
          onClick={() => {
            router.push('/profile?type=saved');
          }}
        >
          <Bookmark strokeWidth={2} size={16} />
          saved
        </div>
      </div>
      {postImage ? (
        <div className={styles.postsContainer}>
          <div className={styles.imageContainer}>
            <Image src={postImage} objectFit="cover" fill alt="post" />
          </div>
        </div>
      ) : (
        <ProfilePageFirstPost />
      )}
    </div>
  );
};
