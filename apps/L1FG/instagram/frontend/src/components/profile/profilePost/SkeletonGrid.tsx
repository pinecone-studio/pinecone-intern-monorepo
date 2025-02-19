import SkeletonPost from './SkeletonPost';

const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {' '}
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <SkeletonPost key={i} />
        ))}
    </div>
  );
};

export default SkeletonGrid;
