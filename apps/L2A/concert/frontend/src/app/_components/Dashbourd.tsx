import HeroSection from './HeroSection';

const Dashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col" data-testid="dashboard">
      <HeroSection />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-black">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-[#141414] rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-700">
              <img src={`/event-${i + 1}.jpg`} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
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
