import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RemoveFollowersDialog } from './RemoveFollowersDialog';

interface props {
  name: string;
  img: string;
  fullname: string;
  suggest: string;
  id: string;
}
const style = {
  container: 'px-3 flex gap-3 items-center py-1',
  subContainer: 'w-full flex gap-3 items-center',
  name: 'font-medium leading-5 text-[14px]',
  fullname: 'text-[12px] leading-4 text-[#71717A]',
  suggest: 'text-[10px] leading-4 text-[#71717A]',
};

export const FollowersDialogRemove = ({ name, img, fullname, suggest }: props) => {
  return (
    <div className={style.container}>
      <div className={style.subContainer}>
        <Avatar className="size-11">
          <AvatarImage src={img} alt="@shadcn" />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className={style.name}>{name}</h3>
          <p className={style.fullname}>{fullname}</p>
          {suggest && <p className={style.suggest}>{suggest}</p>}
        </div>
      </div>
      <RemoveFollowersDialog img={img} />
    </div>
  );
};
