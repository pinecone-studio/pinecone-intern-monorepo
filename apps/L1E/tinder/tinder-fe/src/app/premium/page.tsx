'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainHeader } from '@/components/main/MainHeader';

const PremiumFeature: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (!token) {
      router.push('/');
    }

    setLoading(false);
  }, [router]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <div>Error: No user found</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-between bg-gray-50 ">
      <div className="relative w-full h-[100vh]">
        <MainHeader user={user} />
        <video src="/premium.mp4" autoPlay className={`w-full h-full object-cover shadow-md transition-opacity ${videoEnded ? 'opacity-0' : 'opacity-100'}`} onEnded={handleVideoEnd} />
        {videoEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md transition-opacity opacity-100">
            <button className="bg-red-500 text-white px-6 py-2 mt-24 rounded-md">Buy Premium Right nowwww!!!</button>
            <p className="text-sm text-black mt-4 text-center">Become a premium member to unlock exclusive features:</p>
            <ul className="list-disc list-inside text-sm text-black mt-2 text-left">
              <li>Unlimited swipes</li>
              <li>See mutual interests</li>
              <li>Priority matching</li>
              <li>Exclusive premium badges</li>
              <li>Ad-free browsing</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumFeature;
