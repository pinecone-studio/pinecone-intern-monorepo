import { HeroSection, MainFooter, MainHeader, Search } from '@/components/main';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <HeroSection/>
      <Search />
      {children}
      <MainFooter />
    </>
  );
};

export default MainLayout;
