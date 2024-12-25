'use client';

import { Button } from '@/components/ui/button';
import Logo from '../common/Logo';
import Title from '../common/Title';
import Tinder from '../common/Tinder';
import { useState } from 'react';
import { useCreateUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';

export const AllSet = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   const savedData = localStorage.getItem('signupFormData');
  //   if (savedData) {
  //   }
  // }, []);

  const [createUser] = useCreateUserMutation();

  const handleSubmit = async () => {
    const savedData = localStorage.getItem('signupFormData');

    if (!savedData) {
      setError('No saved data found');
      return;
    }

    const parsedData = JSON.parse(savedData);
    const { email, password, age, bio, hobby, job, name, profession, interested } = parsedData;

    await createUser({
      variables: {
        input: {
          email,
          password,
          age,
          bio,
          hobby,
          interest: interested,
          job,
          username: name,
          profession,
        },
      },
    });
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6">
      <main className="w-full max-w-2xl mx-auto flex flex-col justify-center items-center mt-[80px] gap-6">
        <Logo />
        <Title text="Upload your images" desc="Please choose up to 6 images that represent you." />

        {/* <div className="grid grid-cols-3 gap-6 w-[640px] h-[616px]">
          {images.map((image, index) => (
            <div key={index} className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden w-[200px] h-[300px]">
              {image ? <img src={image} alt={`Uploaded Image ${index}`} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#F4F4F5]" />}
              <input id={`image-upload-${index}`} type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={(e) => handleImageUpload(e, index)} />
            </div>
          ))}
        </div> */}

        <div className="flex items-center justify-center mb-6">
          <Button asChild className="w-[640px] border-[#E11D48E5] border" variant="ghost">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="text-red-[E11D48E5]">
                +
              </span>
              Upload images
            </span>
          </Button>
        </div>

        <div className="flex justify-between w-full">
          <Button className="bg-white border rounded-full w-16 h-9 text-black">Back</Button>
          <Button onClick={handleSubmit} data-testid="click" className="bg-[#E11D48E5] text-white rounded-full w-16 h-9">
            Next
          </Button>
        </div>
        <Tinder />
      </main>
      {error && <p className="text-red-600 text-center text-sm">{error}</p>}
    </div>
  );
};
