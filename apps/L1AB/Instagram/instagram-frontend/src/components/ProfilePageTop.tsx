import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface props {
  profileImg: string;
  profileUsername: string;
  postCount: string;
  followersCount: string;
  followingCount: string;
  profileFullname: string;
  description: string;
}
const styles = {
  button: 'bg-[#F4F4F5] py-2 px-4 text-[#262626] hover:bg-[#F4F4F5] h-9',
  header: 'text-[20px] leading-7 font-semibold tracking-[-0.5px]',
  container: 'flex gap-x-[100px] pl-[72px]',
  textContainer: 'flex gap-1',
};

export const ProfilePageTop = ({ profileImg, profileUsername, postCount, followersCount, followingCount, profileFullname, description }: props) => {
  return (
    <div className={styles.container}>
      <Avatar className="size-[150px]">
        <AvatarImage src={profileImg} className="object-cover" />
        <AvatarFallback>{profileUsername.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <h2 className={styles.header}>{profileUsername}</h2>
          <div className="flex gap-2">
            <Button className={styles.button}>Edit Profile</Button>
            <Button className={styles.button}>Ad tools</Button>
          </div>
          <Settings size={24} absoluteStrokeWidth={true} strokeWidth={1} />
        </div>
        <div className="flex gap-8 text-[#262626]">
          <div className={styles.textContainer}>
            <p className="font-semibold">{postCount}</p>
            <p>posts</p>
          </div>
          <div className={styles.textContainer}>
            <p className="font-semibold">{followersCount}</p>
            <p>followers</p>
          </div>
          <div className={styles.textContainer}>
            <p className="font-semibold">{followingCount}</p>
            <p>following</p>
          </div>
        </div>
        <div className="text-[14px] text-[#18181B] leading-5">
          <h3 className="font-semibold ">{profileFullname}</h3>
          <p className=" text-[#71717A] text-[12px] leading-4">product/service</p>
          <p className="font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};
