import { MainFooter, MainHeader, Search } from '@/components/main';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <Search />
      {children}
      <MainFooter />
    </>
  );
};

export default MainLayout;
