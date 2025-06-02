'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

  };

  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const yImage = useTransform(scrollY, [0, 300], [0, 60]);
  const scaleScroll = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative w-full h-[500px] overflow-hidden flex flex-col items-center justify-center text-center">

      <motion.img
        src="/apt.png"
        alt="Background"
        className="absolute top-1/2 left-1/2 z-0 object-cover w-full h-auto pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          translateX: '-50%',
          translateY: '-50%',
          y: yImage,
          scale: scaleScroll,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-black/50 z-0" />

      <motion.div
        className="relative z-10 max-w-2xl w-full px-4"
        style={{ translateY: yText, opacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Discover a place you’ll love to live
        </h1>

        <motion.form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row w-full max-w-[640px] mx-auto bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Хот, дүүрэг, эсвэл газар хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-4 text-gray-700 focus:outline-none text-base"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            onClick={() => {
              router.push(`/listing?search=${encodeURIComponent(searchTerm)}`);
            }}
            className="bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 text-white px-6 py-3 rounded transition-colors duration-300 ease-in-out cursor-pointer font-semibold"
          >
            Хайх
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default HeroSection;
