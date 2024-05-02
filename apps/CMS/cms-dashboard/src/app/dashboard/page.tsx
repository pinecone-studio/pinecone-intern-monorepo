import ArticleMenuButton from './_components/ArticleMenuButton';
import { AdminNavigateLinksFeature, ArticleStatusTabsFeature } from './_features';

const Home = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-[10px]">
        <ArticleStatusTabsFeature />
        <ArticleMenuButton id="661c87fd6837efa536464d26" />
        <AdminNavigateLinksFeature />
      </div>
    </div>
  );
};
export default Home;
