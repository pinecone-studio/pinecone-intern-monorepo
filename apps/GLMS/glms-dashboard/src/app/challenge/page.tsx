'use client';

import { useGetChallengesByStatusQuery } from '@/generated/index';
import ChoiceImage from './_components/ImageChoicePicker';
import { useState } from 'react';
import ChoiceText from './_components/TextChoicePicker';

const ChallengePage = () => {
  const { data, loading } = useGetChallengesByStatusQuery();
  const [selectedChoice, setSelectedChoice] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(event.target.value);
  };
  return (
    <div>
      <h1>Welcome to Challenge page</h1>
      <h1>{!loading && data?.getChallengesByStatus?.map((challenge) => challenge?.title)}</h1>
      <ChoiceImage
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
        choice={{ _id: '1', choice: 'https://c4.wallpaperflare.com/wallpaper/887/817/276/html-5-html-5-logo-wallpaper-thumb.jpg' }}
      />
      <ChoiceText
        selectedChoice={selectedChoice}
        handleChange={handleChange}
        choice={{ _id: '2', choice: 'https://c4.wallpaperflare.com/wallpaper/887/817/276/html-5-html-5-logo-wallpaper-thumb.jpg' }}
      />
    </div>
  );
};

export default ChallengePage;
