'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <section className="relative w-full h-[500px] bg-cover bg-center flex flex-col items-center justify-center text-center" style={{ backgroundImage: `url('/listingcard.png')` }}>
      <div className="bg-black/40 absolute inset-0" />

      <div className="relative z-10 max-w-2xl mx-auto text-white">
        <h1 className="text-6xl md:text-6xl font-bold mb-6">Discover a place you’ll love to live</h1>
        <form onSubmit={handleSearch} role="form" className="flex w-[640px] h-[72px] bg-white rounded-lg overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Хот, дүүрэг, эсвэл газар хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-2 text-gray-700 focus:outline-none text-base border-none"
          />
          <button onClick={()=>{router.push(`/listing?search=${searchTerm}`)}} type="submit" className="px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-none">
            Хайх
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
