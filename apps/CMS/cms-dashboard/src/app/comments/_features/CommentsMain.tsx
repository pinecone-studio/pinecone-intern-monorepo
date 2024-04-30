import CommentsCard from '../_components/CommentsCard';
import { useGetCommentsQuery } from '../../../generated';
import { Grid } from '@mui/material';

export const CommentsMain = () => {
  const { data } = useGetCommentsQuery();
  const comments = data?.getComments || [];

  return (
    <div>
      {comments.map((item) => (
        <Grid item xs={6} key={item?._id}>
          {item?.comment && (
            <CommentsCard 
              comment={item.comment}
              name={item.name ?? ""}
              email={item.email ?? ""}
              createdAt={item.createdAt}
              articleId={item.articleId ?? ""} />
          )}
        </Grid>
      ))}
    </div>
  );
};
