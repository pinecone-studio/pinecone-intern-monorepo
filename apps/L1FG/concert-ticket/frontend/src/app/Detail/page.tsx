'use client';
import HeroComponent from '@/components/providers/Detail/HeroComponent';
import InfoContainer from '@/components/providers/Detail/InfoContainer';

const page = () => {
  return (
    <div>
      <div className="Container mx-auto w-[1400px] ">
        <div
          className="w-[1330px] h-[250px] pt-[70px] "
          style={{
            backgroundImage: `url("/carousel.svg")`,
          }}
        >
          <HeroComponent />
        </div>
      </div>
      <div className="w-[1200px] h-[831px] mx-auto">
        <InfoContainer />
      </div>
      <div className="mx-auto w-[1200px] h-[930px] mt-[100px]">
        <div className="border-b-2 mb-[60px] border-white w-[1200px]"></div>
        <p className="text-[#FFFFFF]">Холбоотой эвент болон тоглолтууд :</p>
      </div>
    </div>
  );
};

export default page;
