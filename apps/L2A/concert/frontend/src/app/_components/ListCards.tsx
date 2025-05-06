import Image from 'next/image';

const ListCards = () => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-[#141414] rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 bg-gray-700">
            <Image src="/Placeholder.gif" alt="" className="w-full h-full object-cover" width={425} height={370} />
          </div>
          <div className="p-4 flex flex-col gap-2">
            <h3 className="font-semibold text-lg">Music of the Spheres</h3>
            <p className="text-sm text-gray-400 mb-1">Coldplay</p>
            <p className="font-semibold text-base">200,000₮</p>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>📅 10.31</span>
              <span>📍 UG ARENA</span>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};
export default ListCards;
