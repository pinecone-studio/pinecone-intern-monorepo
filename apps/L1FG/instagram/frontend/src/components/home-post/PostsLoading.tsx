export const PostsLoading = ({ hasNextPage }: { hasNextPage: boolean }) => {
  if (!hasNextPage) {
    return;
  }
  return (
    <div className="flex justify-center items-center mb-5" data-testid="posts-loading">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};
