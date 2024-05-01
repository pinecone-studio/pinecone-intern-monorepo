'use client';
import { Article, useGetArticleByIdQuery } from '../../../../../src/generated';
import { useParams } from 'next/navigation';
import { SubmitButtons, Title, ToggleButtonForCommnent, ArrowBack } from './_components/index';

const Home = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  if (loading) return <h5>Loading...</h5>;
  if (error) return <h5>Error</h5>;
  const article = data?.getArticleByID as Article | undefined;

  return (
    <div className="flex flex-col">
      <span>TITLE: {article?.title}</span>
      <span>CONTENT: {article?.content}</span>
      <span>CATEGORY: {article?.category.name}</span>
      <span>SLUG:  {article?.slug}</span>
      <ArrowBack />
      <Title title="This is brand new" />
      <ToggleButtonForCommnent isChecked={article?.commentPermission as boolean} />
      <SubmitButtons />
    </div>
  );
};

export default Home;
