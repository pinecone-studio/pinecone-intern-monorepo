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
      <CreateCommentCard articleId={articleId} refetch={refetch} />
      {articleComments.map((item) => (
        <div key={item?._id}>{item?.comment && <UserCommentCard email={item.email} comment={item.comment} name={item.name ?? ''} />}</div>
      ))}
    </div>
  );
};

export default UsersComments;
