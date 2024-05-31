'use client';
import { useRouter } from 'next/navigation';
import BackArrowIcon from '../../../assets/icons/BackArrowIcon';
import { useGetArticleByIdQuery } from '../../../generated';
import Link from 'next/link';
import ArticleHeader from '../_features/article-header/ArticleHeader';
import { Loader } from '@/app/sign-up/_components';
import UserComment from '@/app/comments/_features/UsersComment';
import CreateCommentCard from '@/app/comments/_features/CreateCommentCard';

const ArtilesDetails = ({ params }: { params: { articleId: string } }) => {
  const { data, loading } = useGetArticleByIdQuery({ variables: { getArticleByIdId: params.articleId } });
  const router = useRouter();
  const routerHandler = () => {
    router.push('/');
  };

  return (
    <div className="flex  bg-[#f7f7f8]">
      {loading ? (
        <div className="flex flex-col bg-white w-[100vw] h-[100vh] items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <div data-cy="one-article-container" className="flex flex-col justify-center w-[100vw] min-h-[100vh] bg-[#f7f7f8] gap-8 pb-12 ">
          <ArticleHeader />
          <div className="flex flex-row justify-center w-[100vw] bg-[#f7f7f8] gap-8 mt-[100px]">
            <div data-cy="one-article-back-cutton" onClick={routerHandler}>
              <BackArrowIcon />
            </div>
            <div className="flex flex-col gap-9 w-[998px] md:w-[800px] sm:w-[500px]" suppressHydrationWarning>
              <div className="flex flex-col gap-3">
                <div className="font-bold text-4xl text-[#121316]">{data?.getArticleByID.title}</div>
                <div className="font-light text-base">
                  Нийтэлсэн: {data?.getArticleByID.publishedAt.slice(5, -17)} сарын {data?.getArticleByID.publishedAt.slice(8, -14)} , {data?.getArticleByID.publishedAt.slice(0, -20)}
                </div>
                <div className="p-1 px-2 bg-[#B7DDFF] rounded-full w-fit">
                  <div className="text-[#121316] font-light">#{data?.getArticleByID.category.name}</div>
                </div>
              </div>
              <div className="w-full h-[1px]  bg-[#D6D8DB]" />
              <img className="rounded-[12px] object-cover max-h-[500px]" src={data?.getArticleByID.coverPhoto} />
              <div data-cy="one-article-content" className="text-xl text-[#121316] leading-10" dangerouslySetInnerHTML={{ __html: data?.getArticleByID.content || 'description' }} />
              <Link href={'https://pinecone.mn/'}>
                <div className="text-xl text-[#121316] leading-3 underline">Бидэнтэй нэгдэх бол энд дарна уу.</div>
              </Link>
              <div className="w-full h-[1px]  bg-[#D6D8DB]" />
              <CreateCommentCard articleId={params.articleId} />
              <UserComment articleId={params.articleId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtilesDetails;
