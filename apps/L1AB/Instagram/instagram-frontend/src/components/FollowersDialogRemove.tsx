import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RemoveFollowersDialog } from './RemoveFollowersDialog';

const style = {
  container: 'px-3 flex gap-3 items-center py-1',
  subContainer: 'w-full flex gap-3 items-center',
  name: 'font-medium leading-5 text-[14px]',
  fullname: 'text-[12px] leading-4 text-[#71717A]',
  suggest: 'text-[10px] leading-4 text-[#71717A]',
};

export const FollowersDialogRemove = ({ name, img, fullname, suggest }: any) => {
  return (
    <div className={style.container}>
      <div className={style.subContainer}>
        <Avatar className="w-11 h-11">
          <AvatarImage src={img} alt="@shadcn" className="object-cover" />
          <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
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
