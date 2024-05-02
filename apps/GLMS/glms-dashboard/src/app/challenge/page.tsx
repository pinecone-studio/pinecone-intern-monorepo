'use client';

import { useGetChallengesByStatusQuery } from '@/generated/index';
import ChoiceImage from './_components/ChoiceImage';
import { useState } from 'react';

const ChallengePage = () => {
  const { data, loading } = useGetChallengesByStatusQuery();
  const [selectedChoice, setSelectedChoice] = useState('');
  return (
    <div>
      <h1>Welcome to Challenge page</h1>
      <h1>{!loading && data?.getChallengesByStatus?.map((challenge) => challenge?.title)}</h1>
      <ChoiceImage
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
        choice={{ _id: '1', choice: 'https://c4.wallpaperflare.com/wallpaper/887/817/276/html-5-html-5-logo-wallpaper-thumb.jpg' }}
      />
      <ChoiceImage
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
        choice={{ _id: '2', choice: 'https://c4.wallpaperflare.com/wallpaper/887/817/276/html-5-html-5-logo-wallpaper-thumb.jpg' }}
      />
    </div>
  );
};

export default ChallengePage;
