import { useGetCommentsByArticleIdQuery } from '@/generated';
import UserCommentCard from '../_components/UsersCommentCard';
import CreateCommentCard from './CreateCommentCard';

const UsersComments = ({ articleId }: { articleId: string }) => {
  const { data, refetch } = useGetCommentsByArticleIdQuery({
    variables: {
      articleId: articleId,
    },
  });
  const articleComments = data?.getCommentsByArticleId || [];
  return (
    <div>
      <h1 className="py-5 font-bold text-[20px]">Сэтгэгдэл</h1>
      <CreateCommentCard articleId={articleId} refetch={refetch} />
      <div className="flex w-full justify-center items-center gap-2 py-[40px]">
        <div className="flex w-full  h-[2px] bg-[#8B8E95]"></div>
        <h1>Сэтгэгдлүүд</h1>
        <div className="flex w-full bg-[#8B8E95] h-[2px]"></div>
      </div>
      {articleComments.map((item) => (
        <div key={item?._id} className="py-2">
          {item?.comment && <UserCommentCard id={item._id} refetch={refetch} email={item.email} comment={item.comment} name={item.name ?? ''} />}
        </div>
      ))}
    </div>
  );
};

export default UsersComments;
