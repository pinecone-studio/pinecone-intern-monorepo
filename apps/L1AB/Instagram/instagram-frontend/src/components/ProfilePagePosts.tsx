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
  postsContainer: 'grid grid-cols-3 gap-1 pb-9',
  container: 'flex flex-col gap-4 min-h-full ',
  textContainer: 'w-[935px] mt-7 text-center flex flex-col gap-4 text-[12px] text-[#71717A] leading-4',
};

export const ProfilePagePosts = ({ userPosts }: { userPosts: any }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');
  const username = searchParams.get('username');

  return (
    <div className={styles.container} data-cy="Profile-page-posts">
      <div className={styles.line}>
        <div
          className={type === 'posts' ? styles.selected : styles.notSelected}
          onClick={() => {
            router.push(`/profile?username=${username}&type=posts`);
          }}
        >
          <Grid3x3 strokeWidth={2} size={16} />
          posts
        </div>
        <div
          className={type === 'saved' ? styles.selected : styles.notSelected}
          onClick={() => {
            router.push(`/profile?username=${username}&type=saved`);
          }}
        >
          <Bookmark strokeWidth={2} size={16} />
          saved
        </div>
      </div>
      {type == 'posts' && userPosts?.length > 0 ? (
        <div className={styles.postsContainer}>
          {userPosts?.map((post: any, i: any) => (
            <div key={i} className={styles.imageContainer}>
              <Image src={post.images[0]} objectFit="cover" fill alt="post" />
            </div>
          ))}
        </div>
      ) : (
        <ProfilePageFirstPost />
      )}
    </div>
  );
};
