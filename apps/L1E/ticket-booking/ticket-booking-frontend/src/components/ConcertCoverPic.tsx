import Image from 'next/image';

export const ConcertCoverPic = () => {
  return (
    <div className="w-full h-[250px] relative overflow-hidden">
      <Image src="https://wallpapers.com/images/featured-full/funny-baby-pictures-0wuld2ho84vak3lp.jpg" className="w-full h-full object-cover object-center" width={100} height={100} alt="img" />

      {/* Gradient уусалт */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Text info */}
      <div className="absolute top-1/2 left-[121px] -translate-y-1/2 z-20">
        <div className="border py-[6px] px-3 border-[#FAFAFA33] text-white text-base font-normal rounded-2xl mb-3 w-fit">Coldplay</div>
        <h1 className="text-white text-5xl font-bold mb-6">MUSIC of the SPHERES</h1>
        <div className="flex gap-2 items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M2 6.66658H14M3.33333 2.66659H12.6667C13.403 2.66659 14 3.26354 14 3.99992V13.3333C14 14.0696 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0696 2 13.3333V3.99992C2 3.26354 2.59695 2.66659 3.33333 2.66659Z"
              stroke="#FAFAFA"
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-base font-bold">10.3</p>
          <span>|</span>
          <p className="text-base font-bold">11.1</p>
          <span>|</span>
          <p className="text-base font-bold">11.2</p>
        </div>
      </div>
    </div>
  );
};
