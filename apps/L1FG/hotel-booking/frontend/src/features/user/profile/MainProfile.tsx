import { ContainerProfile } from './ContainerProfile';
import { HeaderProfile } from './HeaderProfile';

export const MainProfile = () => {
  return (
    <div className="flex container mx-auto flex-col w-full pt-10  pb-16 gap-8">
      <HeaderProfile />
      <div className="w-full  flex justify-center">
        <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
      </div>
      <ContainerProfile />
    </div>
  );
};
