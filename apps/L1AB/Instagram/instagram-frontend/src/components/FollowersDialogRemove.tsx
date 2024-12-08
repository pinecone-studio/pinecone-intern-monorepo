import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RemoveFollowersDialog } from './RemoveFollowersDialog';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from './providers';
import Link from 'next/link';

const style = {
  container: 'px-3 flex gap-3 items-center py-1',
  subContainer: 'w-full flex gap-3 items-center',
  name: 'font-medium leading-5 text-[14px]',
  fullname: 'text-[12px] leading-4 text-[#71717A]',
  suggest: 'text-[10px] leading-4 text-[#71717A]',
};

interface FollowersDialogRemoveProps {
  id: string;
  name: string;
  img: string;
  fullname?: string;
  suggest?: string;
  type: 'followers' | 'following';
  profileUser: { _id: string; username: string };
  handleRemoveFollowing: any;
  handleRemoveFollower: any;
}

export const FollowersDialogRemove = ({ id, name, img, fullname, suggest, type, profileUser, handleRemoveFollowing, handleRemoveFollower }: FollowersDialogRemoveProps) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const { user }: any = useContext(UserContext);

  const getActionButton = () => {
    if (username === user?.username) {
      return <RemoveFollowersDialog profileUser={profileUser} id={id} img={img} type={type} name={name} handleRemoveFollower={handleRemoveFollower} handleRemoveFollowing={handleRemoveFollowing} />;
    } else {
      return <Button className="bg-[#F4F4F5] py-2 px-4 text-[#262626] hover:bg-[#F4F4F5] h-9">Follow</Button>;
    }
  };

  return (
    <div className={style.container}>
      <Link href={`/profile?type=posts&username=${name}`} className={style.subContainer}>
        <Avatar className="w-11 h-11">
          <AvatarImage src={img} alt={name} className="object-cover" />
          <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className={style.name}>{name}</h3>
          {fullname && <p className={style.fullname}>{fullname}</p>}
          {suggest && <p className={style.suggest}>{suggest}</p>}
        </div>
      </Link>
      {getActionButton()}
    </div>
  );
};
