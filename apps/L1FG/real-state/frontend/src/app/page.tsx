'use client';

import HomePageHero from '@/components/HomePage/HomePage';
import { HomePageCategorySection } from '@/components/HomePage/HomePageCategorySection';
import { HomePageLatest } from '@/components/HomePage/HomePageLatest';
import { Loading } from '@/components/layout/Loading';
import { useGetPostsQuery } from '@/generated';
// import { HomePageSubCategorySection } from '@/components/HomePage/SubCategory';s

const Page = () => {
  const { data, loading } = useGetPostsQuery({ variables: { input: { status: 'APPROVED' } } });

  const apartment = data?.getPosts.filter((data) => data.propertyDetail.houseType === 'Apartment').length;
  const house = data?.getPosts.filter((data) => data.propertyDetail.houseType === 'House').length;
  const office = data?.getPosts.filter((data) => data.propertyDetail.houseType === 'Office').length;

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center gap-6">
      <HomePageHero />
      {/* <HomePageSubCategorySection /> */}
      <HomePageCategorySection apartment={apartment} house={house} office={office} />
      <HomePageLatest data={data?.getPosts} />
    </div>
  );
};

export default Page;
