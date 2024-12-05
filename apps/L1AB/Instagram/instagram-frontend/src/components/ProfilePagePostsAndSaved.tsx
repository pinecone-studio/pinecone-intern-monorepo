'use client';
import { Bookmark, Grid3x3 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { styles } from './ProfilePagePosts';

const ProfilePagePostsAndSaved = ({ user }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');
  const username = searchParams.get('username');
  return (
    <div className="flex gap-12">
      <div
        data-testId="posts-button"
        className={type === 'posts' ? styles.selected : styles.notSelected}
        onClick={() => {
          router.push(`/profile?username=${username}&type=posts`);
        }}
      >
        <Grid3x3 strokeWidth={2} size={16} />
        posts
      </div>
      {user?.username == username ? (
        <div
          data-testId="saved-button"
          className={type === 'saved' ? styles.selected : styles.notSelected}
          onClick={() => {
            router.push(`/profile?username=${username}&type=saved`);
          }}
        >
          <Bookmark strokeWidth={2} size={16} />
          saved
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePagePostsAndSaved;
