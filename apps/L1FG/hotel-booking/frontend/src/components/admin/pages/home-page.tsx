import { Header } from '../main/Header';
import { Sidebar } from '../main/Sidebar';

export const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
      </div>
    </div>
  );
};
