import CommentsCard from '../_components/CommentsCard';
// import { useGetCommentsQuery } from '../../../generated';

export const CommentsMain = () => {
  // const { data } = useGetCommentsQuery();
  // const comments = data?.getComments || [];

  return (
    <div>
      <CommentsCard/>
      {/* {comments.map((item) => (
        <div  key={item?._id}>
          {item?.comment && (
            <CommentsCard 
              comment={item.comment}
              name={item.name ?? ""}
              email={item.email ?? ""}
              createdAt={item.createdAt}
              articleId={item.articleId ?? ""} />
          )}
        </div>
      ))} */}
    </div>
  );
};
