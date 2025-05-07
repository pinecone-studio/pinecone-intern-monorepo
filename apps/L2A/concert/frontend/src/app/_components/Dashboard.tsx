import Image from 'next/image';
import HeroSection from './HeroSection';
const Dashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col " data-testid="dashboard">
      <HeroSection />
      <main className="flex flex-wrap gap-[32px] justify-center  m-8 ml-[117px] mr-[117px] rounded-lg  ">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#141414] w-[425px] h-[360px] rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-700">
              <Image src={`/Placeholder.webp`} alt="" className="w-full h-full object-cover" width={425} height={370} />
            </div>
            <div className="p-4 flex flex-col gap-2 ">
              <h3 className="font-semibold">Music of the Spheres</h3>
              <p className="text-sm text-gray-400 mb-2">coldplay</p>
              <p className="font-semibold">200’000₮</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>📅 10.31</span>
                <span>📍 UG ARENA</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
