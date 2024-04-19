import { useGetCommentsByArticleIdQuery } from '../../../generated';

const useCommentData = (articleId: string) => {
  const { data, loading, error } = useGetCommentsByArticleIdQuery({
    variables: { articleId },
  });

  if (loading) {
    return { loading: true, error: null, data: null, numberOfComments: 0 };
  }

  if (error) {
    return { loading: false, error, data: null, numberOfComments: 0 };
  }

  if (!data?.getCommentsByArticleId) {
    return { loading: false, error: null, data: null, numberOfComments: 0 };
  }

  const numberOfComments = data.getCommentsByArticleId.length;

  return { loading: false, error: null, data, numberOfComments };
};

export default useCommentData;
