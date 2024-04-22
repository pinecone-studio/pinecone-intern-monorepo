'use client';
import { fileManagement } from '@/file-management';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();

  const handleProfilePageButton = () => {
    router.push('/profile');
  };

  const handleAssessmentPageButton = () => {
    router.push('/assessment');
  };

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const accessUrl = await fileManagement(fileList);

      console.log(accessUrl);
      setSelectedFiles(accessUrl || []);
    }
  };

  console.log(selectedFiles);
  return (
    <div>
      <h1>hello from GLMS dashboard</h1>
      <div>
        <input type="file" onChange={handleChange} multiple />

        {selectedFiles.map((file: any, index) => {
          console.log('isFIle:', file);
          return (
            <div key={index}>
              <img src={`${file}`} alt={`File ${index}`} width="200" />
            </div>
          );
        })}
      </div>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <button onClick={handleProfilePageButton}>Go to profile page</button>
      <button onClick={handleAssessmentPageButton}>Go to assessment page</button>
    </div>
  );
}
