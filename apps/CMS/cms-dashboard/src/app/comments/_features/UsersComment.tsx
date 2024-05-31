import { useGetCommentsByArticleIdQuery } from '@/generated';
import UserCommentCard from '../_components/UsersCommentCard';

const UsersComments = ({ articleId }: { articleId: string }) => {
  const { data } = useGetCommentsByArticleIdQuery({
    variables: {
      articleId: articleId,
    },
  });
  const articleComments = data?.getCommentsByArticleId || [];

  return (
    <div>
      {articleComments.map((item) => (
        <div key={item?._id}>{item?.comment && <UserCommentCard comment={item.comment} name={item.name ?? ''} />}</div>
      ))}
    </div>
  );
};

export default UsersComments;
