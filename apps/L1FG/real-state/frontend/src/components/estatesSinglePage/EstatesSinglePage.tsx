import { Post } from '@/generated';

const EstateSinglePage = ({ data }: { data: Post }) => {
  return <>{data.description}</>;
};
export default EstateSinglePage;
